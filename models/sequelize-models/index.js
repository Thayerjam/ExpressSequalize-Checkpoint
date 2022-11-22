const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});


Task.clearCompleted = function () {
  return this.destroy({
    where: {
      complete: true
    }
  })  
}


Task.completeAll = function () {
  return this.update({
    complete: true
  }, {
    where: {
      complete: false
    }
  })
}


Task.prototype.getTimeRemaining = function () {
  if (!this.due) {
    return Infinity
  } else {
    const today = new Date();
    const dueDate = this.due;
    return dueDate - today;
  }
}


Task.prototype.isOverdue = function () {
  const today = new Date ();
  const dueDate = this.due;
  const timeDifference = dueDate - today;
  if (this.complete || timeDifference > 0) {
    return false
  } else {
    return true
  }
}


Task.prototype.assignOwner = function (owner) {
  return this.setOwner(owner);
}

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});


Owner.getOwnersAndTasks = function () {
  return Owner.findAll({ include: Task })
}


Owner.prototype.getIncompleteTasks = function () {
  return Task.findAll({ 
    where: {
      complete: false
    }
  })
}

Owner.beforeDestroy(owner => {
  if (owner.name === 'Grace Hopper') {
    throw new Error();
  }
})

Task.belongsTo(Owner);
Owner.hasMany(Task);


//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
