//const express = require('express')

import express from 'express'
import routerViews from './routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname  from './utils.js'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

/*
app.use('/', (req,res) => {
    res.send('Este es mi chat')
})
*/

const PORT = process.env.PORT || 8080

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/',routerViews)

const httpServer = app.listen(PORT, () => {
    console.log('Running...')
})

//se acostumbra a llamar como io
const io = new Server(httpServer)

const messages = []

io.on('connection', socket => {
    console.log('new socket connection')

    socket.on('message', data => {
        console.log(data)
        messages.push(data)
        io.emit('logs', messages )
    })
})
