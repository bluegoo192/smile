var connection;

module.exports = function (message, c) {
  run(message.utf8Data.toString().split(';')[0], message.utf8Data.toString().split(';')[1]);
  connection = c;
};

function run(command, data) {
  switch(command) {
    case "signup":
      //make an account
      signup(data);
      break;
    case "login":
      //login to an account
      login(data);
      break;
    case "requestVoice":
      //ask for a positive message
      requestVoice(data);
      break;
    case "sendVoice":
      //send a positive message
      sendVoice(data);
      break;
    case "sendPM":
      //send a text message to another user
      sendPM(data);
      break;
    case "check":
      //refresh account data/check notifications
      check(data);
      break;
    case "logout":
      //clear key and IP from server
      logout(data);
      break;
  }
}

function signup(data) {
  console.log("New user " + data);
}
function login(data) {

}
function requestVoice(data) {

}
function sendVoice(data) {

}
function sendPM(data) {

}
function check(data) {

}
function logout(data) {

}
