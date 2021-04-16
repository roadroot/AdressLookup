const fs = require("fs");

function getScheduleByID({tid, startHourRange: shr = 8, endHourRangeIncluded: ehr = 19, startDayRange = "monday", endDayRangeIncluded = "sunday", path = "file.json"}) {
    if(shr == null) shr = 8;
    if(ehr == null) ehr = 19;
    if(startDayRange == null) startDayRange = "monday";
    if(endDayRangeIncluded == null) endDayRangeIncluded = "sunday";
    schedule = {};
    let data = fs.readFileSync(path);
    let json = JSON.parse(data);
    let week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    for (let course of json.courses) {
        let day = week.indexOf(course.day);
        let sdr = week.indexOf(startDayRange);
        let edr = week.indexOf(endDayRangeIncluded);
        if (course.teacher == tid && sdr <= day && day <= edr && !(edr == day && course.hour > ehr || sdr == day && course.hour < shr)) {
            if (schedule[course.day] == null)
                schedule[course.day] = {};
            schedule[course.day][course.hour] = { course: course.id, "duration": course.duration };
        }
    }
    return schedule;
}
console.log(getScheduleByID({tid: 1, startHourRange: 12, endHourRangeIncluded: 13, startDayRange: "saturday", endDayRangeIncluded: "saturday"}));
