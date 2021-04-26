let express = require('express')
// gets what index.js exports
let db = require('../models')
let Student = db.Student
// arouter matches requests with functions that can respond to them
let router = express.Router()
// a request to students will run the function
router.get('/students', function(req, res, next){
    Student.findAll( {order: ['starID']}).then(students =>{
        //converts to json
        return res.json(students)
        //if error sends to server.js to handle
    }).catch( err => next(err))
})
// creates a record on server
router.post('/students', function(req, res, next){
    // req.body contains data from vue app
    Student.create(req.body).then(data => {
       // a message so user knows it worked, code 201 means something was created
       // you have to return something 
       return res.status(201).send('ok')
    }).catch(err => {
        if (err instanceof db.Sequelize.ValidationError){
           //400 is a bad request code
           // creates an array of error messages
           let messages = err.errors.map( e => e.message)
           // returns error messages- the e.message as json
           return res.status(400).json(messages)
        }// next means route handler wont deal with problem
        // sending to server.js to process
        return next(err)
    })
})
// modifies a student-a record, :id is any student instead of id 1 or 2
router.patch('/students/:id', function(req, res, next){
    // sets studentID to the id of student requested
    let studentID = req.params.id
    // req.body is data sent with request
    let updatedStudent = req.body
    // where requests which row on table to update
    // studentID is id from /student/:id, the id requested
    Student.update(updatedStudent, { where: { id: studentID} } )
    // need this because its a promise and you have to return something
    .then( (rowsModified) => {

        let numberOfRowsModified = rowsModified[0]
        if (numberOfRowsModified == 1){
            return res.send('ok')
        }else{
            //if student not found
            return res.status(404).json(['Student with that id not found'])
        }
    }).catch(err => {
        //if validation error, bad request no name or starid
        if (err instanceof db.Sequelize.ValidationError){
            let messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        }else{// unexpected error
            return next(err)

        }

    })
})

router.delete('/students/:id', function(req, res, next){
    let studentID = req.params.id
    //destroy deletes
    Student.destroy( { where: {id: studentID} } )
    .then( (rowsDeleted) => {
        if (rowsDeleted == 1){
            return res.send('ok')
        }else{
            return res.status(404).json(['Not found'])
        }// for unexpected errors
    }).catch( err => next(err))
})

module.exports = router