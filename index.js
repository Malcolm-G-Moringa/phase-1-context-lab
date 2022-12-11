/* Your Code Here */

function createEmployeeRecord(person){
    const record = {
        firstName:person[0],
        familyName:person[1],
        title:person[2],
        payPerHour:person[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
    return record;
}

function createEmployeeRecords(employees){
    const newRecords=[];
   employees.forEach(employee=>{
    const record = createEmployeeRecord(employee)
    newRecords.push(record);
   })
    return newRecords;
}

function createTimeInEvent(timeStamp){
    const dateTime = timeStamp.split(" ");
    const dateObject = {
        type: "TimeIn",
        hour: +dateTime[1],
        date: dateTime[0]
    };
    this.timeInEvents.push(dateObject);
    return this;
}

function createTimeOutEvent(timeStamp){
    const dateTime = timeStamp.split(" ");
    const dateObject = {
        type: "TimeOut",
        hour: +dateTime[1],
        date: dateTime[0]
    };
    this.timeOutEvents.push(dateObject);
    return this;
}

function hoursWorkedOnDate(date){
    let clockOut = this.timeOutEvents.find(item=>item.date==date);
    let clockIn = this.timeInEvents.find(item=>item.date==date);
    return ((clockOut.hour - clockIn.hour)/100);
}

function wagesEarnedOnDate(date){
    const hours = hoursWorkedOnDate.call(this,date);
    const payRate = this.payPerHour;
    return hours*payRate;
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


function findEmployeeByFirstName(srcArray,firstName){
    return srcArray.find(item=>item.firstName==firstName)
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((accumulator,item)=>accumulator+allWagesFor.call(item),0);
}
