const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
console.log('Connecting to',url);
mongoose.connect(url)
    .then(result =>{
        console.log('Connected MongoDB');
    })
    .catch(error =>{
        console.log('error conecting to MongoDB', error.message);
    })


const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
