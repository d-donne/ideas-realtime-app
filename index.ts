import { feathers, type RealTimeConnection } from "@feathersjs/feathers";
import express, { json, rest } from "@feathersjs/express";
import socketio from "@feathersjs/socketio";
import { channels } from "@feathersjs/transport-commons";
import { IdeaService } from "./idea-service";

const PORT = 3030;

const app = express(feathers())

// parse JSON
app.use(json())

// enable Socket.io support
app.configure(socketio())

// enable REST services
app.configure(rest())

// register services
const ideaService = new IdeaService()
app.use('/ideas', ideaService)

// configure channels
app.configure(channels())

// connection to stream channel
app.on('connection', (connection: RealTimeConnection) => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('stream').join(connection)
  })

app.publish(data => app.channel('stream'))


app.listen(PORT).then((server) => {
  server.on('listening', () => {
    console.log(`Realtime server listening on http://localhost:${PORT}`)
  })
})

app.service('ideas').create({
    text: 'Build a realtime app',
    tech: 'NodeJS',
    viewer: 'Jane Stephenson',
})