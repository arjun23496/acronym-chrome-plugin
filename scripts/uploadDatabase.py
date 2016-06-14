import csv
from pymongo import MongoClient

#----------------------------------------------------------------------

def csv_dict_reader(file_obj):

    """

    Read a CSV file using csv.DictReader

    """

    reader = csv.DictReader(file_obj, delimiter=',')

    for line in reader:

        print(line["Acronym"]),

        print(line["Expansion"])

#----------------------------------------------------------------------

if __name__ == "__main__":

    with open("Acronyms.csv") as f_obj:
    	csv_dict_reader(f_obj)