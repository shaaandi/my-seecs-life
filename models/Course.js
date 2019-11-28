// class Timmings will be encoded in a specific manner and will be extracted from props;
// [key][start]-[end]+
// Mo - Monday + Tu - Tuesday + We - Wednesday + Th - Thrusday + Fr - Friday + Sa - Saturday + Su - Sunday;

export default class Course {
  constructor({ courseCode, title, instructor, classTimmings, tint }) {
    this.id = courseCode;
    this.courseCode = courseCode;
    this.title = title;
    this.instructor = instructor;
    this.tint = tint;
    // extracting class timings and then creating an object;
    let schedules = classTimmings.split("+");
    let obj = {};
    schedules.forEach(schedule => {
      let arr = schedule.split("#");
      let key = arr[0];
      let arr2 = arr[1].split("-");
      let from = arr2[0];
      let to = arr2[1];
      obj[key] = {
        from: from,
        to: to
      };
    });
    this.classTimmings = obj;
  }
}
