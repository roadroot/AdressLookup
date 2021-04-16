var fs = require("fs");

function getScheduleByID(tid, path = "file.json") {
    schedule = {};
    let data = fs.readFileSync(path);
    let json = JSON.parse(data)
    for (let course of json.courses) {
        if (course.teacher == tid) {
            if (schedule[course.day] == null)
                schedule[course.day] = {};
            schedule[course.day][course.hour] = { course: course.id, "duration": course.duration };
        }
    }
    return schedule;
}
console.log(getScheduleByID(0));
