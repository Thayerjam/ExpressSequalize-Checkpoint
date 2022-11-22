let tasks = {}; //
let completedTasks = {};

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====

  listPeople: function () {
    const output = [];
    for (person in tasks) {
      if (person?.length > 0) {
        output.push(person);
      }
    }
    return output;
  },

      // saves a task for a given person
  add: function (name, task) {
      // default to false when a task is added
    if (!task.complete) {
      task.complete = false;
    }

    if (!tasks[name]?.length) {
      tasks[name] = [task];
    } else {
      tasks[name]?.push(task);
    }
  },


    // returns tasks for specified person
  list: function (name) {
    return tasks[name];
  },


    // marks a task complete
  complete: function (name, idx) {
    if (tasks[name]?.length > idx) {
      tasks[name][idx].complete = true;
    }
  },


    // lists completed tasks by a given person
  listCompleted: function (name) {
    return tasks[name].filter(task => task.complete)
  },

  listActive: function (name) {
    return tasks[name].filter(task => !task.complete)
  },


    // removes a tasks
  remove: function (name, idx) {
    if (tasks[name]?.length > idx) {
      tasks[name].splice(idx, 1);
    }
  },
};
