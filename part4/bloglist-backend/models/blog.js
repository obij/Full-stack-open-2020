const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  url:{
    type: String,
    required: true
  },
  likes:{
    type: Number,
    required: true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//const Blog = mongoose.model('Blog', blogSchema)
//onsole.log(process.env.MONGODB_URI)

const  mongoUrl = process.env.MONGODB_URI

console.log('connecting to',  mongoUrl)

mongoose.connect( mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('result for mongoose connect is ', result)
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


module.exports = mongoose.model('Blog', blogSchema)