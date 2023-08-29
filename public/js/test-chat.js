const socket = io();
const chatBox = document.getElementById("chatBox");
const sendButton = document.getElementById("send-button");

const userMail = prompt("Dime tu email", "");

chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      message: chatBox.value,
      user: userMail,
    });
    chatBox.value = "";
  }
});

sendButton.addEventListener("click", () => {
  socket.emit("msg_front_to_back", {
    message: chatBox.value,
    user: userMail,
  });
  chatBox.value = "";
});

//front ataja los mensajes
socket.on("new_msgs", (msgs) => {
  const msgsContainer = document.getElementById("chat-msg");
  let formato = "";
  msgs.forEach((msg) => {
    formato = formato + "<p>" + msg.user + " : " + msg.message + "</p>";
  });
  msgsContainer.innerHTML = formato;
});
