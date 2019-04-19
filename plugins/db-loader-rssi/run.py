import merger
import pymongo

def pushToMongo(data):
    db = pymongo.MongoClient().emergence

    data["Frequency"] = data["Frequency"].astype(int)

    def createLayer(data):
        layer = {
            "name": "RSSI - %i MHz"%data.iloc[0]["Frequency"],
            "type": "heatmap",
            "max": 8,
            "radius": 0.0005,
            "latField": 'Lat',    
            "lngField": 'Lon',   
            "valueField": 'Signal_Strength' ,
            "data": data[["Lat","Lon","Altitude","Signal_Strength"]].to_dict('records')
        }
        db.layers.insert_one(layer).inserted_id
    data.groupby(["Frequency"]).apply(createLayer)

def main():
    merger.merge()
    pushToMongo(merger.RTL_DATA)
	
    print(merger.RTL_DATA.dtypes)
    print("Added to DB")
    merger.save()

if __name__ == "__main__":
    main()