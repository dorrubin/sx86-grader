import xlrd
from collections import OrderedDict
import simplejson as json
import os

# Open the workbook and select the first worksheet
rootdir = ('submissions')
for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        username = str(subdir)
        username = username.split("/")
        if(len(username) > 1):
            username = username[1].split("_")[0]
        print(username)
        print(file)

wb = xlrd.open_workbook('submissions/sample1_HW1/Q1.xlsx')
sh = wb.sheet_by_index(0)

# List to hold dictionaries
answers_list = []

# Iterate through each row in worksheet and fetch values into dict

answers = OrderedDict()
row_values = sh.row_values(1)
answers['Q1'] = row_values[6]
answers['Q2'] = row_values[6]
answers['Q3'] = row_values[6]
answers['Q4'] = row_values[6]

answers_list.append(answers)

# Serialize the list of dicts to JSON
j = json.dumps(answers_list)

# Write to file
with open('data.json', 'w') as f:
    f.write(j)
