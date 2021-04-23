let express = require('express')
// gets what is returned from api.js
let api_routes = require('./routes/api.js')
let app = express()

//makes sure app can process json from body
// allows express app to use json requests and convert to javascript
app.use(express.json())
app.use('/api', api_routes)
// this code will run if other code doesn't used to handle request if an error
// if request is made to wrong url
app.use(function(req, res, next){
    //error message
    res.status(404).send('Not found')
})
// error handling route
app.use(function(err, req, res, next){
  //err.stack displays a stack trace
  console.error(err.stack)
  //500 is a general server error code, you have too return something 
  res.status(500).send('Server error')
})

// tells which port to listen to, starts server running
let server = app.listen(process.env.PORT || 3000, function(){
    console.log('Express server running on port', server.address().port)
})