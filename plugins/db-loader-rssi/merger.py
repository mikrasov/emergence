import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import pymongo
from configure import *

def plotSource(sourceNum):

    source= configure.SOURCES[sourceNum]

    print("Plotting %s" % source["name"])
    fig, ax = plt.subplots()
    fig.canvas.set_window_title(source["name"])
    plt.title(source["name"])

    fig.set_size_inches(20, 15)
    plt.xlabel('Time')
    plt.ylabel('Distance (meters)')

    df = merger.RTL_DATA[merger.RTL_DATA.Source == sourceNum]
    droneLog = merger.DRONE_LOGS[merger.DRONE_LOGS.Source == sourceNum]

    xs = [time for time, row in df.iterrows()]


    # Plot Altitude
    df.plot(ax=ax, use_index=True, y="Altitude",  color="blue", label='Drone Altitude')

    ax.hlines(7.62, min(xs), max(xs), colors='k', linestyles='dashed' )
    ax.text(x=min(xs), y=8, s="25ft", fontsize=20)


    def onclick(event):
        print('DATA Time:%i, Dist:%fm or %fft' %(mdates.num2epoch(event.xdata), event.ydata, event.ydata * 3.28084))

    fig.canvas.mpl_connect('button_press_event', onclick)

    plt.legend()

    graphbounds = min(0,df["Altitude"].min()), max(df["Altitude"].max(),60)

    print("Sugested offset min:%f"%(-(df["Altitude"].min()+source["altitude-adjust"])))
    plt.ylim(graphbounds)
    plt.xlim(droneLog.iloc[0].name,droneLog.iloc[-1].name)
    plt.show()

    print()
    #plt.savefig("CAL_"+sourceName+".png")
    fig.clf()


def loadDroneLog(file):
    print("Reading Drone Log %s"%file)

    data = pd.read_csv(file)

    #Remove missing data on location
    listOfCols = ['Lat', 'Lon', 'Altitude']
    data[listOfCols] = data[listOfCols].replace(0, np.nan)
    data.dropna(subset=listOfCols, inplace=True)

    if len(data) == 0:
        print("Error: No drone data")
        exit()

    #Set time as index
    data['Time'] = pd.to_datetime(data['Time']/1000.0, unit='s')
    data.set_index('Time', inplace=True)

    #Convert radians to degrees
    data["Lat"] = np.degrees(data["Lat"])
    data["Lon"] = np.degrees(data["Lon"])

    return data


def loadRtlLog(file):
    print("Reading RTL Log %s"%file)

    data = pd.read_csv(file)

    #Remove missing data on location
    listOfCols = ['Frequency','Signal_Strength']
    data[listOfCols] = data[listOfCols].replace(0, np.nan)
    data.dropna(subset=listOfCols, inplace=True)

    if len(data) == 0:
        print("Error: No RTL data")
        exit()

    #Set time as index
    data['Time'] = pd.to_datetime(data['Time'], unit='s')
    data.set_index('Time', inplace=True)

    return data

def merge():
    global RTL_DATA, DRONE_LOGS
    print("* Reading & Merging")
    for index,source in enumerate(SOURCES):

        print("\n[ %s ]"%source['name'])

        folder = "data/%s/"%source["name"]
        if not os.path.exists(folder):
            print(">< Folder '%s' does not exist"%folder)
            continue

        #Load Drone Log
        droneLog = loadDroneLog(folder+"drone.log")

        # Offset Altitude to real
        altOffset = droneLog["Altitude"].min()
        print("Altitude Offset %f" % altOffset)
        droneLog["Altitude"] -= altOffset


        #Load RTL-SDR Data
        rtlLog = loadRtlLog(folder +"channels.csv")


        # Label Source
        droneLog["Source"] = index
        droneLog["Location"] = source["location"]
        droneLog["Vehicle"] = source["vehicle"]
        droneLog["Device"] = source["device"]

        #Merge Logs
        dlCopy = droneLog.reindex(rtlLog.index, method='nearest')
        trialData = pd.concat([dlCopy, rtlLog], axis=1)


        #Set Global constants
        RTL_DATA = RTL_DATA.append(trialData)
        DRONE_LOGS = DRONE_LOGS.append(droneLog)



    print("\nSorting")
    RTL_DATA.sort_index(inplace=True)
    DRONE_LOGS.sort_index(inplace=True)

    print("* Merge Complete!")

def save():
    print("Saving Result...")
    merger.RTL_DATA.to_csv("results.csv")