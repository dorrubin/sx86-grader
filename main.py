import xlrd
from collections import OrderedDict
import simplejson as json
import os
from pyexcel_ods import get_data

# List to hold dictionaries
answer_list = []
# Open the workbook and select the first worksheet
rootdir = ('../HW1/partial')
for subdir, dirs, files in os.walk(rootdir):
    files = [f for f in files if not f[0] == '.']
    dirs[:] = [d for d in dirs if not d[0] == '.' or str(d) == rootdirstr]
    # not root
    path = str(subdir)
    if len(path) > 14:
        username = path.split("/")[3].split("_")[0]
        print(username)
        answer = OrderedDict()
        answer['studentID'] = username
        for file in files:
            filestr = str(file)
            fullpath = path + "/" + filestr
            question = filestr.split(".")[0]
            # wb = get_data(fullpath)
            print(path)
            print(question)
            wb = xlrd.open_workbook(fullpath)
            sh = wb.sheet_by_index(0)
            row_values = sh.row_values(1)
            length = len(row_values)
            # print(length)
            answer[question] = row_values[length - 1].rstrip()
        # END FILE LOOP
        answer_list.append(answer)
# END DIRECTORY LOOP
# Serialize the list of dicts to JSON
j = json.dumps(answer_list)

# Write to file
with open('output.json', 'w') as f:
    f.write(j)
