// imports sequelize model and makes it available to rest of app

let { Sequelize, DataTypes} = require('sequelize')
// figures out which database to connect to sqlite or postgres from config.json
// process.env looks for evironmental variables on computer running code this one or heroku
// development is from local computer process.env is from heroku
let env = process.env.NODE_ENV || 'development'
// reads settings from config.json
let config = require(__dirname + '/../config.json')[env]
// database object
let db = {}

let sequelize

// if at heroku do this
if (config.use_env_variable){
    // sets up a new Sequelize object
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
}else{
    // if running locally
    sequelize = new Sequelize(config)    

}
// gets what is returned from student.js the () calls function
let studentModel = require('./student')(sequelize, DataTypes)
// sets up db object
db[studentModel.name] = studentModel
// info on how to connect the db
db.sequelize = sequelize
// gets sequelize library
db.Sequelize = Sequelize
module.exports = db