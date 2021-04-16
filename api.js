const fs = require("fs");

function getScheduleByID({tid, startHourRange: shr = 8, endHourRangeIncluded: ehr = 19, startDayRange, endDayRangeIncluded, path = "file.json"}) {
    let week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let schedule = {};
    if(startDayRange == null && endDayRangeIncluded == null) {
        for(let day of week) {
            let sch = getScheduleByID({tid: tid, startHourRange: shr, endHourRangeIncluded: ehr, startDayRange: day, endDayRangeIncluded: day, path: path});
            if(sch[day])
                schedule[day] = sch[day]
        }
        return schedule
    }
    if(shr == null) shr = 8;
    if(ehr == null) ehr = 19;
    if(startDayRange == null) startDayRange = "monday";
    if(endDayRangeIncluded == null) endDayRangeIncluded = "sunday";
    let data = fs.readFileSync(path);
    let json = JSON.parse(data);
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
console.log(getScheduleByID({tid: 2, endHourRangeIncluded: 12}));
