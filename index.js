const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config');
const Student = require('./models/student'); // Imports your student model
const Department = require('./models/department'); // Imports your department model

// Define table relationships
Student.belongsTo(Department, {
  foreignKey: 'dept_id',
});

Department.hasMany(Student, {
  foreignKey: 'dept_id',
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Test database connection
config
  .authenticate()
  .then(function () {
    console.log('database is connected.');
  })
  .catch(function (err) {
    console.log(err);
  });

// Get all student data
app.get('/students', (req, res) => {
  Student.findAll()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Get all canadian students data --TA solution
// app.get('/students/canada', (req, res) => {
//   const data = {
//     where: { country: 'Canada', age: 25}
//   }
//   Student.findAll(data)
//     .then((results) => {
//       res.status(200).send(results)
//     })
//     .catch((err) => {
//       res.status(500).send(err)
//     })
// })

// Get all canadian students data
app.get('/students/canada', (req, res) => {
  Student.findAll({ where: { country: 'Canada', age: 28 } }) // you can filter multiple columns
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Create a dynamic filter
app.get('/students/search', (req, res) => {
  const data = {
    where: {},
    include: Department, // will include the depertment in the result table
  };

  if (req.query.country !== undefined) {
    data.where.country = req.query.country;
  }

  if (req.query.age !== undefined) {
    data.where.age = req.query.age;
  }

  Student.findAll(data)
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Find student based on their id
app.get('/students/:student_id', (req, res) => {
  const studentId = parseInt(req.params.student_id);
  // Find by primary key
  Student.findByPk(studentId)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Create a new student
app.post('/students', (req, res) => {
  const studentData = req.body;

  Student.create(studentData)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Complete update of a student record
app.put('/students/:student_id', (req, res) => {
  const studentId = parseInt(req.params.student_id);
  const studentData = req.body;
  // Find the student
  Student.findByPk(studentId)
    .then(result => {
      if (!result) {
        res.status(404).send('Student not found');
      } else {
        // Here we are doing a full update but we can do a partial update using PUT
        result.name = studentData.name;
        result.age = studentData.age;
        result.country = studentData.country;
        result.department = studentData.department;

        // Save changes to database
        result
          .save()
          .then(() => {
            res.status(200).send(result);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Delete a student record
app.delete('/students/:student_id', (req, res) => {
  const studentId = parseInt(req.params.student_id);
  // Find the student
  Student.findByPk(studentId)
    .then(result => {
      if (!result) {
        res.status(404).send('Student not found');
      } else {
        // Delete a student record from a database
        result
          .destroy()
          .then(() => {
            res.status(200).send(result);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get('/departments', (req, res) => {
  Department.findAll()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

app.listen(3000, function () {
  console.log('Server is running on port 3000..');
});
