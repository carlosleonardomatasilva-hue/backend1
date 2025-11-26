const mongoose = require('mongoose')

if (process.argv.length < 5) {
  console.log('Te falta parametros')
  console.log('node mongo1.js <password> [contenido] [importante]')
  process.exit(1)
}

const password = process.argv[2]

// OJO: agrega el @
const url = `mongodb+srv://user2004:${password}@cluster0.qzkhs2b.mongodb.net/appNote?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: process.argv[3],
  // mongoose sabe convertir 'true'/'false' a Boolean
  important: process.argv[4],
})

note.save().then(result => { 
    console.log('Nota guardada') 
    mongoose.connection.close() 
}) 


