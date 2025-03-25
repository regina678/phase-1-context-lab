/* Your Code Here */
// Function to create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to create a time-in event
function createTimeInEvent(employee, dateTime) {
    if (!dateTime || typeof dateTime !== "string" || !dateTime.includes(' ')) {
        throw new Error(`Invalid dateTime format: ${dateTime}`);
    }
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({ type: "TimeIn", date: date, hour: parseInt(hour, 10) });
    return employee;
}

// Function to create a time-out event
function createTimeOutEvent(employee, dateTime) {
    if (!dateTime || typeof dateTime !== "string" || !dateTime.includes(' ')) {
        throw new Error(`Invalid dateTime format: ${dateTime}`);
    }
    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({ type: "TimeOut", date: date, hour: parseInt(hour, 10) });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    let timeInEvent = employee.timeInEvents.find(e => e.date === date);
    let timeOutEvent = employee.timeOutEvents.find(e => e.date === date);

    if (!timeInEvent || !timeOutEvent) {
        throw new Error("Missing time-in or time-out event");
    }

    let timeIn = timeInEvent.hour;
    let timeOut = timeOutEvent.hour;

    return (timeOut - timeIn) / 100;
}


// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// Function to find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, emp) => total + allWagesFor.call(emp), 0);
}
