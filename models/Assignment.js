class Assignment {
  constructor({ id, title, dueDate, courseCode, dateGiven }) {
    this.id = id;
    this.title = title;

    this.courseCode = courseCode;
    let arr1 = dateGiven.split("/");
    let arr2 = dueDate.split("/");
    console.log(arr2);
    this.dueDate = new Date(
      parseInt(arr2[2]),
      parseInt(arr2[1]) - 1,
      parseInt(arr2[0])
    );
    this.dateGiven = new Date(
      parseInt(arr1[2]),
      parseInt(arr1[1]) - 1,
      parseInt(arr1[0])
    );
  }
}

export default Assignment;
