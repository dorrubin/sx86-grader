/**
 * JUnit reporter for QUnit v1.0.3-pre
 *
 * https://github.com/JamesMGreene/qunit-reporter-junit
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license/
 */
(function() {

    'use strict';

    var currentRun, currentModule, currentTest, assertCount;

    var testResults = [];

    // Gets called when a report is generated.
    QUnit.jUnitReport = function(/* data */) {
        // Override me!
    };

    QUnit.begin(function() {
        currentRun = {
            modules: [],
            total: 0,
            passed: 0,
            failed: 0,
            start: new Date(),
            time: 0
        };
    });

    QUnit.moduleStart(function(data) {
        currentModule = {
            name: data.name,
            tests: [],
            total: 0,
            passed: 0,
            failed: 0,
            start: new Date(),
            time: 0,
            stdout: [],
            stderr: []
        };

        currentRun.modules.push(currentModule);
    });

    QUnit.testStart(function(data) {
        // Setup default module if no module was specified
        if (!currentModule) {
            currentModule = {
                name: data.module || 'default',
                tests: [],
                total: 0,
                passed: 0,
                failed: 0,
                start: new Date(),
                time: 0,
                stdout: [],
                stderr: []
            };

            currentRun.modules.push(currentModule);
        }

        // Reset the assertion count
        assertCount = 0;

        currentTest = {
            name: data.name,
            failedAssertions: [],
            total: 0,
            passed: 0,
            passed_students: [],
            failed: 0,
            failed_students: [],
            start: new Date(),
            time: 0
        };

        currentModule.tests.push(currentTest);
    });

    QUnit.log(function(data) {
        assertCount++;

        // Ignore passing assertions
        if (!data.result) {
            currentTest.failedAssertions.push(data);

            // Add log message of failure to make it easier to find in Jenkins CI
            currentModule.stdout.push('[' + currentModule.name + ', ' + currentTest.name + ', ' + assertCount + '] ' + data.message);
        }
    });

    QUnit.testDone(function(data) {
        currentTest.time = (new Date()).getTime() - currentTest.start.getTime();  // ms
        currentTest.total = data.total;
        currentTest.passed = data.passed;
        currentTest.failed = data.failed;
        //push failed students by data.failed [id] and then string manipulate until get to colon
        currentTest.passed_students = getStudentsResults(data, true);
        currentTest.failed_students = getStudentsResults(data, false);
        //store module information
        currentTest.module = data.module;
        currentTest.moduleId = getModuleId(data);
        testResults.push(currentTest);
        currentTest = null;
    });

    QUnit.moduleDone(function(data) {
        currentModule.time = (new Date()).getTime() - currentModule.start.getTime();  // ms
        currentModule.total = data.total;
        currentModule.passed = data.passed;
        currentModule.failed = data.failed;

        currentModule = null;
    });

    QUnit.done(function(data) {
        currentRun.time = data.runtime || ((new Date()).getTime() - currentRun.start.getTime());  // ms
        currentRun.total = data.total;
        currentRun.passed = data.passed;
        currentRun.failed = data.failed;
        generateReport(data, currentRun);
    });

    var getModuleId = function(data) {
        var id = data.module.slice(-2)[0];
        return Number(id);
    };

    var getStudentsResults = function(data, passed) {
        var temp_passed = [];
        var temp_failed = [];
        for (var i = 0; i < data.assertions.length; i++) {
            var username = data.assertions[i].message;
            username = username.split(":")[0];
            if(data.assertions[i].result) {
                temp_passed.push(username);
            }
            else {
                temp_failed.push(username);
            }
        }
        return passed ? temp_passed :  temp_failed;
    };

    var generateReport = function(results, run) {
        var pad = function(n) {
            return n < 10 ? '0' + n : n;
        };

        // Invoke the user-defined callback
        QUnit.jUnitReport({
            overview: results,
            tests: testResults
        });
    };

})();
