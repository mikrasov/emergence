import pandas as pd
import numpy as np
import pymongo


def pushToMongo(data, name):
	db = pymongo.MongoClient().emergence

	layer = {
		"name": name,
		"type": "heatmap",
		"max": 8,
		"radius": 0.0005,
		"latField": 'Lat',
		"lngField": 'Lon',
		"valueField": 'Plot1' ,
		"data": data.to_dict('records')
	}


	db.layers.update_one({"name": name}, {'$set':layer}, upsert=True)

	
SAMPLE_DATA = [
	("sample1.csv", "Prado Brige", 32.731307, -117.157887),
	("sample2.csv", "Botanical Garden", 32.732266, -117.149008),
	("sample3.csv", "Horton Plaza", 32.712877, -117.162014),
]

def main():

	data = pd.DataFrame()
	for file,name,lat,lng in SAMPLE_DATA:
		df = pd.read_csv("logs/"+file, parse_dates=["time0"])
		
		df["Location"] = name
		df['epoch'] = df['time0'].astype(np.int64) // 10**6 #convert to epoch
		df["Lat"] = lat
		df["Lon"] = lng
		df.drop(df.columns[ [0,1]], inplace=True, axis=1)
		data = data.append(df)
		print("Adding %s '%s' to DB"%(file,name))
	pushToMongo(data, "LTE Congestion")

if __name__ == "__main__":
    main()
