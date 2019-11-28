import moment from "moment";

class Todo {
  constructor({ id, createdAt, title, courseCode, dueDate, status }) {
    this.id = id.toString();
    this.title = title;
    this.courseCode = courseCode;
    this.dueDate = dueDate ? moment(new Date(dueDate)) : null;
    this.status = status;
    this.createdAt = createdAt
      ? moment(new Date(createdAt))
      : moment(new Date());
  }
}

export default Todo;
