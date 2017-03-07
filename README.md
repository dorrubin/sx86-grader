# About the sx86-grader


## Steps to collect results

1. Un-zip multiple .zip files into separate folders:

    ```bash
    for zipfile in *.zip; do
        exdir="${zipfile%.zip}"
        mkdir "$exdir"
        unzip -d "$exdir" "$zipfile"
    done
    ```  
    *The result should be each student has a studentID_HW1 folder containing Q1.xlsx, Q2.xlsx, Q3.xlsx and Q4.xlsx.*  


2. In main.py, update the rootdir variable to be the top folder containing the unzipped folders of student submission

3. run in terminal:
    ```bash
    python extractInstructions.py
    ```
    This will create a data.json file with the students' instructions in a json. Unfortunately, more than a handful of students will do strange things with the template such as adding or removing columns. This will either break the script or extract the wrong cell. See note for possible improvements. 

4. Reformat data.json by setting equal to var data, adding a single quote and removing trailing whitespace. See example below.
    ```json
    var data = '[{"studentID": "sample1", "Q1": "903F50005000500050005000B0000000", "Q2": "900A904F908490C3B002B043900A904F9100C080C0C15082510351035103B002B0440000", "Q3": "90049043908690C29101B1001004B1011004B1021004B10390019042908390C4C000C041C082C0C3A10091418045403A50041005203560835002905EB0400000", "Q4": "901B9043B0409003C000904790808002403C90818002403C90828002403C90828002403C90848002403C90858002403C90868002403C6001202590D6B0C00000"}, {"studentID": "sample2", "Q1": "9000904090a090ff5003100180423023b0000000", "Q2": "90019042908a90cfb080b0c1c002c043910091425000b080500110048105302bb0c00000", "Q3": "90019042b00190029045b00190039047b00190049041b0019101c0049142c045908090c050c01002808130319103c0049144c045600150c0901eb0030000", "Q4": "900b9043b0409043c001908790d690408040403d90418040403d90428040403d90438040403d90448040403d90458040403d90468040403d60022026b0c10000"}]'
    ```

5. Update the testQuestionX.js files in the js/tests/ folder
    * For each, test file update the expected answers for the assert.equal statements. Example:  
      ```javascript
      assert.equal( result[2000], 2017, submissions[c].studentID + ": the 2000th memory address should contain the value 2017" );
      ```
     * There are additional tests for program length that should be updated depending on the what the program needs to do. Example:
        ```javascript
            // answer can be done in 100-- give 20% buffer
            assert.ok( original.length <= 120, submissions[i].studentID + ": there should be less than 120 instruction characters to complete this program" );
        ```
     * To change the inputs to a program like in Question 2 update the testInputs variable. Example:
        ```javascript
        // testInputs loads the values 6 and 7 into memory from different registers
        var testInputs = "904a90c6b043910f9087b102";
        // testProgram concatentates those instructions with the students
        var testProgram = testInputs + userProgram;
        // result and run method load run the sx86 emulator
        var result = LoadProgram(testProgram);
        sx86_display.run(0);
        // result[10], 12 looks in the 10th memory address for value 12
        assert.equal( result[10], 12, submissions[i].studentID + ": the 10th memory address should contain 12" );
        // result[15], 21 looks in the 15th memory address for value 21
        assert.equal( result[15], 21, submissions[i].studentID + ": the 15th memory address should contain 21" );
        ```

7. Open index.html in a browser

6. Open the Inspect browswer tool, open up the console and type: finalResults

7. Copy finalResults and paste into the online conversion tool: https://json-csv.com/
8. Save the CSV and convert to points 
9. Check the plagarism flags

## Possible improvements to the grader
1. Convert JSON to CSV within app so that it calculates grades immediately.
2. Auto-format the data.json file and set equal to var data.
3. Launch index.html with a webserver immediately after running extractInstructions.py
4. Ensure that you get the correct file format by creating a form for students to fill out with only the final answers.
