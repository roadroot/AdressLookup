function range(length) {
    return Array.from({length: length}, (x, i) => i);
}

function generate() {
    let json = {};
    json.courses = [];
    json.teachers = [];
    let langs = ["french", "english", "german"];
    for(let i = 0; i < 32 + Math.random()*32; i++) {
        let teacher = {};
        teacher.id = i;
        teacher.name = "n"+i;
        teacher.familyName = "f"+i;
        teacher.lang = langs[Math.floor(Math.random() * langs.length)];
        json.teachers.push(teacher);
    }
    let cid = 0;
    for(let i = 0; i < 7; i++) {
        let number_of_teachers = i>=0&&i<5?17:i==5?32:27;
        let available_teachers = range(json.teachers.length);
        while(--number_of_teachers >= 0) {
            let tid = available_teachers[Math.floor(Math.random() * available_teachers.length)];
            available_teachers.splice(available_teachers.indexOf(tid), 1);
            let teacher = json.teachers[tid];

            let number_of_hours = Math.floor(Math.random() * 8);
            let available_hours = range(8);
            while(number_of_hours>0) {
                let course = {}
                course.id = cid++;
                course.teacher = teacher.id;
                course.format = number_of_hours==1?1:Math.floor(Math.random() * 2 + 1);
                course.level = "level " + Math.floor(Math.random() * 7);
                hour = available_hours[Math.floor(Math.random() * available_hours.length)];
                course.hour = hour + 8;
                course.day = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"][i];
                if(available_hours.includes(hour + course.format - 1)) {
                    available_hours.splice(available_hours.indexOf(hour), 1);
                    if(course.format == 2) available_hours.splice(available_hours.indexOf(hour+1), 1);
                    number_of_hours -= course.format;
                    json.courses.push(course);
                } else {
                    cid--;
                }
            }
        }
    }
    for(let teacher in json.teachers) {
        let course = {}
        course.id = cid++;
        course.teacher = teacher.id;
        course.format = Math.floor(Math.random() * 2 + 1);
        course.level = "level " + Math.floor(Math.random() * 7);
        course.hour = Math.floor(Math.random() * 12 + 8);
    }

    var fs = require('fs');
    fs.writeFile('file.json', JSON.stringify(json), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      }
generate();