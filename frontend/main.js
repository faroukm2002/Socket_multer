// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var socket_io_client_1 = require("socket.io-client"); // Import io from socket.io-client
// var socket = (0, socket_io_client_1.io)("http://localhost:3000");
// var myInp = document.getElementById("chatMsg");
// function sendMsg() {
//     var message = document.getElementById("chatMsg");
//     if (message) {
//         console.log(message.value);
//         socket.emit("newMessage", message.value);
//         message.value = "";
//     }
// }
// socket.on("replay", function (data) {
//     console.log(data);
//     document.querySelector("#test").innerHTML +=
//         "<div class=\"message_content\">".concat(data, "</div>");
// });
// if (myInp) {
//     myInp.addEventListener("input", function (e) {
//         var target = e.target;
//         if (target) {
//             socket.emit("userTyping", target.value);
//         }
//     });
//     myInp.addEventListener("keyup", function (e) {
//         var target = e.target;
//         if (target) {
//             socket.emit("stopTyping", target.value);
//         }
//     });
// }
// socket.on("typing", function (data) {
//     document.getElementById("typingMsg").classList.replace("d-none", "d-block");
// });
// socket.on("stopUserTyping", function (data) {
//     setTimeout(function () {
//         document
//             .getElementById("typingMsg")
//             .classList.replace("d-block", "d-none");
//     }, 1000);
// });

const socket = io("http://localhost:3000");

const myInp = document.getElementById("chatMsg");

function sendMsg() {
  let message = document.getElementById("chatMsg");
  console.log(message.value);
  socket.emit("newMessage", message.value);
  message.value = "";
}

socket.on("replay", (data) => {
  console.log(data);
  document.querySelector("#test").innerHTML +=
    `<div class="message_content">${data}</div>`;
});

myInp.addEventListener("input", function (e) {
  // console.log(e.target.value)
  socket.emit("userTyping", e.target.value);
});

socket.on("typing", (data) => {
  document.getElementById("typingMsg").classList.replace("d-none", "d-block");
});

myInp.addEventListener("keyup", function (e) {
  socket.emit("stopTyping", e.target.value);
});

socket.on("stopUserTyping", (data) => {
  setTimeout(() => {
    document.getElementById("typingMsg").classList.replace("d-block", "d-none");
  }, 1000);
});
