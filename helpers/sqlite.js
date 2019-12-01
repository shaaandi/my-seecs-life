import { openDatabase } from "expo-sqlite";

export const TODAY = "TODAY";

export const db = openDatabase("mySeecsLife.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS courses 
            (
                id TEXT PRIMARY KEY NOT NULL,
                courseCode TEXT NOT NULL UNIQUE,
                title TEXT NOT NULL,
                instructor TEXT NOT NULL,
                classTimmings TEXT NOT NULL
            );`,
        [],
        () => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS assignments
            (
                id TEXT PRIMARY KEY NOT NULL ,
                courseCode TEXT NOT NULL,
                title TEXT NOT NULL,
                dueDate DATE NOT NULL,
                dateGiven DATE NOT NULL
            );`,
            [],
            () => {
              tx.executeSql(
                `CREATE TABLE IF NOT EXISTS todos
                  (
                      id INTEGER PRIMARY KEY NOT NULL ,
                      courseCode TEXT ,
                      title TEXT NOT NULL,
                      dueDate DATE,
                      createdAt DATE NOT NULL,
                      status BOOLEAN NOT NULL
                  );`,
                [],
                () => {
                  resolve();
                },
                (_, err) => {
                  console.log("Failed");
                  reject(err);
                }
              );
            },
            (_, err) => {
              console.log("Failed");
              reject(err);
            }
          );
        },
        (_, err) => {
          console.log("Failed");
          reject(err);
        }
      );
    });
  });
  return promise;
};

// FETCH queries;

export const fetchCourses = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * from courses",
        [],
        (_, result) => {
          console.log(result, "result SELECT * from courses");
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const fetchAssignments = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * from assignments",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const fetchTodos = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * from todos",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

// INSERT queries;

export const insertCourses = courses => {
  let query = `INSERT INTO courses (
                    id,
                    courseCode, 
                    title, 
                    instructor,
                    classTimmings
                ) VALUES  `;
  courses.forEach(course => {
    let { id, title, courseCode, instructor, classTimmings } = course;
    query += ` ("${id}", "${courseCode}", "${title}", "${instructor}", "${classTimmings}") ,`;
  });
  query = query.slice(0, query.length - 1);
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          console.log(result, "query result in the sqlite : insert courses");
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertCourse = course => {
  let { id, courseCode, title, instructor, classTimmings } = course;
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO courses (id, courseCode, title, instructor, classTimmings) VALUES (? , ? ,? ,? , ?) ",
        [id, courseCode, title, instructor, classTimmings],
        (_, result) => {
          console.log(result, "query result in the sqlite : insert course");
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertAssignment = assignment => {
  let { id, title, courseCode, dueDate, dateGiven } = assignment;
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO assignments (id, courseCode, title, dueDate, dateGiven) VALUES (? , ? ,? ,? , ?) ",
        [id, courseCode, title, dueDate, dateGiven],
        (_, result) => {
          console.log(result, "query result in the sqlite : insert assignment");
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const deleteAll = tableName => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM ${tableName}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
// bulk insert in the begining of the app when, use want to start new ;

export const insertAssignments = assignments => {
  let query = `INSERT INTO assignments (
                    courseCode, 
                    title, 
                    dueDate,
                    dateGiven
                ) VALUES  `;
  assignments.forEach(assignment => {
    let { title, courseCode, dueDate, dateGiven } = assignment;
    query += ` (${courseCode}, ${title}, ${dueDate}, ${dateGiven}) ,`;
  });
  query = query.slice(0, query.length - 1);
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

// todos are now just saved on the mobile so no, bulk insert is needed for now;

export const insertTodo = todo => {
  let { courseCode, title, dueDate, createdAt } = todo;
  createdAt = createdAt.toISOString();
  let dueDateString = dueDate ? new Date(dueDate).toISOString() : null;
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO todos (courseCode, title, dueDate, createdAt, status) VALUES (?, ?, ?, ?, ?)",
        [courseCode, title, dueDateString, createdAt, false],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });

  return promise;
};





// updating queries ;

export const updateCourse = (id, data) => {
  let query = `
        UPDATE courses SET `;
  for (attr in data) {
    if (attr !== "courseCode") {
      query += ` ${attr} = ${data[attr]}  `;
    }
  }

  query += ` WHERE id = ${id} `;

  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

// deleting todos;
export const deleteTodo = id => {
  // first converting id to integer;
  id = parseInt(id);
  let query = `
        DELETE FROM todos `;
  query += ` WHERE id = ${id} `;
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const deleteMultipleTodos = todoIds => {
  let ids = todoIds.map(id => parseInt(id));
  let query = `
        DELETE FROM todos `;
  query += ` WHERE id IN (${ids}) `;
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const deleteCompletedTodos = type => {
  let query = `
        DELETE FROM todos `;

  if (type === "TODAY") {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();

    let start = new Date(`${year}`, `${month}`, `${date}`, `00`, `00`, `00`);
    let end = new Date(`${year}`, `${month}`, `${date}`, `23`, `59`, `59`);
    let startString = start.toString();
    let endString = end.toString();

    query += `WHERE status = 0 and  dateTIME(dueDate) BETWEEN DATETIME('${year}-${month +
      1}-${date}T00:00:00.000Z') and DATETIME('${year}-${month +
      1}-${date}T23:59:59.000Z')`;
    // status - 0;
    // dueDate - DATE ;  now()
  } else if (type !== "") {
    query += ` WHERE status = 0 and  courseCode = '${type}'`;
  } else {
    // so the type is of the tasks, because their courseCode is empty;
    query += `WHERE status = 0 and courseCode = '' `;
  }
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const updateAssignment = (id, data) => {
  let query = `
        UPDATE assignments SET `;
  for (attr in data) {
    if (attr !== "courseCode") {
      query += ` ${attr} = ${data[attr]}  `;
    }
  }

  query += ` WHERE id = ${id} `;

  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const updateTodo = (id, data) => {
  // converting the id from string to integer;
  let parsedId = parseInt(id);
  let query = `
        UPDATE todos SET `;
  for (attr in data) {
    if (attr !== "courseCode") {
      // checking if the attr is status , then we need to convert it into different form;
      if (attr === "status") {
        let status = data[attr] ? 0 : 1;
        query += ` ${attr} = ${status}  `;
      } else {
        query += ` ${attr} = ${data[attr]}  `;
      }
    }
  }

  query += ` WHERE id = ${parsedId} `;

  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};
