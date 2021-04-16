const fs = require("fs");

function getScheduleByID({tid, startHourRange = 8, endHourRange = 19, startDayRange = 0, endDayRangeIncluded = 6, path = "file.json"}) {
    if(startHourRange == null) startHourRange = 8;
    if(endHourRange == null) endHourRange = 19;
    if(startDayRange == null) startHourRange = 0;
    if(endDayRangeIncluded == null) endDayRangeIncluded = 6;
    schedule = {};
    let data = fs.readFileSync(path);
    let json = JSON.parse(data)
    for (let course of json.courses) {
        if (course.teacher == tid && course.hour >= startHourRange && course.hour <= endHourRange) {
            if (schedule[course.day] == null)
                schedule[course.day] = {};
            schedule[course.day][course.hour] = { course: course.id, "duration": course.duration };
        }
    }
    return schedule;
}
console.log(getScheduleByID({tid: 0, startHourRange: 13, endHourRange: 13}));
