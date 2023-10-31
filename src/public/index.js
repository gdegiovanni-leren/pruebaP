console.log('init my chat')

let user = ''

Swal.fire({
    title: 'Auth',
    input: 'text',
    text:'Set username for the chat',
    inputValidator: value => {
        return !value.trim() && 'Por favor escribe un nombre'
    },
    allowOutsideClick : false
}).then( result => {
    user = result.value
    document.querySelector('#username').innerHTML = user
    initIo()

})


//const user = prompt('Ingrese nombre')

const socket = io()
const input = document.querySelector('#chatimput');
document.querySelector('#chatinput').addEventListener('keyup', (event) => {
    if(event.key === 'Enter') sendMessage(event.currentTarget.value)

})

document.querySelector('#send').addEventListener('click', (event) => {
    sendMessage(input.value)
})

function sendMessage(message){
    if(message.trim().length > 0){
   socket.emit('message', {
    user,
    message
   })
  }
}

function initIo(){
    socket.on('logs', messages => {
        const box = document.querySelector('#chatbox')

        let html = ''
        messages.reverse().forEach( message => {
            html += '<p><i>'+message.user+'</i>: '+message.message+'</p>'
        })

        box.innerHTML = html
    })
}
