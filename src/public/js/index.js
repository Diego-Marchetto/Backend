const socket = io();

let user
let chatBox = document.getElementById("chatBox");

Swal.fire({
    title: "Por favor ingresa tu nombre",
    input: "text",
    text: "Nombre",
    inputValidator: (value) => {
        if (!value){
            return "Por favor ingresa tu nombre";
        }
    },
    allowOutsideClick: false,
}).then((result) =>{
    user = result.value;
});

chatBox.addEventListener("keyup", (e)=>{
    if (e.key === "Enter") {
        socket.emit("message", { user, message: chatBox.value});
        chatBox.value = "";
    }
})

socket.on("messageLogs", (data) =>{
    let log = document.getElementById("messageLogs");
    let messages = "";
    data.forEach((message) =>{
        messages += `<p><strong>${message.user}</strong>: ${message.message}</p>`});
        log.innerHTML = messages;
});