const express = require("express")
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body', request.body);
    console.log('----------------------------------');
    next()
}

app.use(requestLogger)


let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        important: false
    },
    {
        id: 3,
        content: "GET & POST are the most important methods of HTTP Protocols",
        important: true
    }
]

app.get('/api/notes',(request, response) =>{
    response.json(notes)
})

app.get('/api/notes/:id', (request,response)=>{
    const id = Number(request.params.id)
    //console.log(id, typeof id)
    const note = notes.find(x => x.id === id)
    //console.log(note)
    if(note){
        response.json(note)
    }
    else{
        response.status(404).end()
    }
    //response.json(note)
})

app.delete('/api/notes/:id',(request,response) =>{
    const id = Number(request.params.id)
    notes = notes.filter(x => x.id !== id)// Solo estamos simulando el borrado
    //console.log('Delete: ',id);
    response.status(204).end()
})

app.post('/api/notes',(request, response) =>{
    const note = request.body
    if(note.content){
        note.id = notes.length + 1
        notes = notes.concat(note)
        response.json(note)  
        //console.log('Adding: ',note)
    }
    else{
        //console.log("error: 'content is missing'");
        response.status(400).json({error: 'content is missing'})  
    }
})

const badPath = (request, response, next) =>{
    response.status(404).send({error: 'Ruta desconocida'})
}

app.use(badPath)

const PORT = 3001

app.listen(PORT, () =>{
    console.log(`Server running in port ${PORT}`);
})