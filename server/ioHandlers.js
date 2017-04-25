var commandHandlers = require('./commandHandlers.js')
var Promise = require('bluebird')
var scoreUpdate = function (data) {
  var theData = commandHandlers.scoreUpdate(data)
  //emit theData
}

var answerClicked = function (data) {
  var returnData = commandHandlers.answerClick(data)
  //everybody.emit(returnData)
}

var questionClicked = function (data) {
  var returnData = commandHandlers.questionClicked(data)

  //everybody.emit(returnData)
}

var message = function (data) {
  var theMessage = commandHandlers.message(data)
  console.log(theMessage)
  //data.emit({})
}

var login = function (data) {
  var that = this
  var theData = JSON.parse(data)
//  console.log('client', this)
  commandHandlers.login(theData).then(function (loginSuccess){
    console.log(loginSuccess, 'login Success')
    that.emit('login', loginSuccess)
  }).catch(function (){
    console.log('login not successful')
    that.emit('login', null)
  })
}

var signup = function (data) {
  var theData = JSON.parse(data)
  var that = this
  commandHandlers.signup(theData).then(function (signupSuccess) {
    console.log(signupSuccess, 'signup success')
    that.emit('signup', signupSuccess)
  }).catch(function (signupSuccess){
    //do something on failure
    that.emit('signup', signupSuccess)
  })//maybe a finally statement to reduce that.emit duplication?

  //data.emit(signUpSuccess)
}

var saveGame = function (data) {
	var theData = JSON.parse(data)
	var that = this
	commandHandlers.saveGame(theData).then(function (saveSuccess) {
		console.log(saveSuccess, 'save success')
		that.emit('saveGame', saveSuccess)
	}).catch(function () {
	  //for failure
	  that.emit('saveGame', null)
	})
}

var loadGame = function (data) {
	var that = this
	var theData = JSON.parse(data)
	commandHandlers.loadGame(theData).then(function (loadSuccess){
		console.log(loadSuccess, 'load success')
		that.emit('loadGame', loadSuccess)
	}).catch(function (){
		console.log('load not successful')
		that.emit('loadGame', null)
	})
}

var connection = function (client) {
  var theData = commandHandlers.connection(client)
  client.emit('message', {message: client.id})
  //client.emit(/*clients.push(client) maybe?*/)
}

var joinTeam = function (data) {
  
  socket.broadcast.emit('joinTeam', data)
}

module.exports = {login, signup, scoreUpdate, answerClicked, message, connection, questionClicked, saveGame, loadGame, joinTeam}
