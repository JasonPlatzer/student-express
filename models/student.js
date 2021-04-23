// module.exports exports to another file
module.exports = (sequelize, DataTypes) => {
    //Student object with names of columns in table
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            // makes it so there has to be a name
            allowNull: false
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            // makes it so all starIDs are unique
            unique: true

        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    })
    // creates table in database, force = true overwrites old database tables
    Student.sync({force: false}).then( () => {
        console.log('Synced student table')
    })
    return Student
}