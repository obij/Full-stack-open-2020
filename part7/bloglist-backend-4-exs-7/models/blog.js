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
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: String,
    },
  ]
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




module.exports = mongoose.model('Blog', blogSchema)