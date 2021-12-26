
import csv
import json
from datetime import datetime


# datetime object containing current date and time
now = datetime.now()
dt_string = now.strftime("%d-%m-%Y")

def make_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    data = []
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        print(csvf)
        # Convert each row into a dictionary
        # and add it to data
        index = 0
        for rows in csvReader:
            rows['id'] = index
            data.append(rows)
            index= index+1
            # print(data[index])
            # print(rows['Exercise'])
            # print("ttest")
    	#convert python jsonArray to JSON String and write to file
        with open(jsonFilePath, 'w', encoding='utf-8') as jsonf: 
	        jsonString = json.dumps(data, indent=4);

	        # jsonf.write("ExerciseSnacks_Workouts=\'");
	        # jsonf.write("{\n\t\"DatasetName\": \"Exercise Snacks Workout Archive\",\n")
	        # jsonf.write("\t\"lastUpdated\": %s,\n" % dt_string)
	        # jsonf.write("\t\"workouts\": ")
	        jsonf.write(jsonString)
	        # jsonf.write("}")
	        # jsonf.write("\'");
 


make_json("assets/data/exercisesnacks_workout_archive.csv", "assets/data/exercisesnacks_workout_archive.json")
