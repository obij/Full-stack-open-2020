const { ApolloError }= require('apollo-server-errors')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author= require('./models/author')
const User= require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      //bookCount: () => books.length,
      bookCount: async() => Book.collection.countDocuments(),
      //authorCount:() => authors.length,
      authorCount: async() => Author.collection.countDocuments(),
      //allBooks: () => books,
      /*allBooks: (root, args) => {
        if(args.genre !== undefined) {
            return books.filter((book) => book.genres.includes(args.genre))
        }
        return books
        
    },*/
      /*allBooks: (root, args) => {
          if (args.author !== undefined && args.genre !== undefined){
              const filteredBooks = books.filter((book) => book.author === args.author)
              return filteredBooks.filter((book) => book.genres.includes(args.genre))
          }
          else if(args.author !== undefined ){
              const filteredBooks = books.filter((book) => book.author === args.author)
              //return filteredBooks.filter((book) => book.title) 
              return filteredBooks
          }
          else if(args.genre !== undefined) {
              return books.filter((book) => book.genres.includes(args.genre))
          }
          return books
          
      },*/
      allBooks: async (root, args) => {
        let query = {};
        if (args.genre) {
          query.genres = args.genre;
        }
        return await Book.find(query).populate('author');
      },
      /*allAuthors: ()=> authors.map((author) => ({
          ...author,
          bookCount: books.filter((book) => book.author === author.name).length
      })),*/
      allAuthors: async (root, args)=> {
        return await Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Mutation:{
      /*addBook:(root, args) => {
          const book= {...args, id: uuid()}
          books = books.concat(book)
          //add author name to authors array if author name not saved in array
          if (!authors.some((author)=> author.name === args.author)){
              const author= {name: args.author, id: uuid()}
              authors= authors.concat(author)
          }
          return book
      },*/
      /*addBook: async(root, args) => {
        const book= new Book({...args})
        //const book= new Book({})
        await book.save()
  
        const author= await Author.findOne({name: args.name})
        if (author === null){
          const newAuthor= new Author({name: args.name, bookCount: 1})
          await newAuthor.save()
        }else{
          //if author exists
          const updatedAuthor= await author.findOneAndUpdate({name: args.name}, {$inc: {bookCount: 1}})
          await updatedAuthor.save()
        }
        return book
  
      },*/
      addBook: async (root, args, context) => {
        const { author, ...bookData } = args
  
        const currentUser= context.currentUser
        //console.log("Current user is ",  currentUser)
        if (!currentUser) {
          throw new ApolloError('not authenticated', 'BAD_USER_INPUT')
        }
  
        try {
          let existingAuthor = await Author.findOne({ name: author });
    
          if (!existingAuthor) {
            existingAuthor = new Author({ name: author, bookCount: 1 });
          } else {
            existingAuthor.bookCount += 1;
          }
    
          // Check if a book with the same title exists
          let existingBook = await Book.findOne({ title: bookData.title });
    
          if (existingBook) {
            // Update the existing book with the new details
            existingBook.published = bookData.published;
            existingBook.genres = bookData.genres;
            existingBook.author = existingAuthor._id;
            await existingBook.save();
          } else {
            // If the book doesn't exist, create a new one
            const newBook = new Book({
              ...bookData,
              author: existingAuthor._id,
            });
            await newBook.save();
          }
    
          await existingAuthor.save();
    
          const populatedBook = await Book.findOne({ title: bookData.title }).populate('author');
          pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
    
          return populatedBook;
        } catch (error) {
          console.error("Error adding book:", error);
          throw new ApolloError("Error adding book", "BOOK_ADD_ERROR");
        }
    
        
      },
      editAuthor: async(root, args, context) => {
        const currentUser= context.currentUser
  
        if (!currentUser) {
          throw new ApolloError('not authenticated', 'BAD_USER_INPUT')
        }
  
        try{
          let existingAuthor= await Author.findOne({name: args.name})
          if(!existingAuthor){
             return null
          }
          existingAuthor.born = args.setBornTo
          return await existingAuthor.save()
        }catch(error){
          console.error("Error editing author:", error);
          throw new ApolloError("Error editing author", "AUTHOR_EDIT_ERROR")
        }
      },
      /*
      editAuthor:(root, args) => {
          const author= authors.find(a => a.name === args.name)
          if(!author){
              return null
          }
  
          
  
          const updatedAuthor = {...author, born: args.setBornTo}
          authors= authors.map(a => a.name === args.name ? updatedAuthor : a)
          return updatedAuthor
      }*/
      createUser: async(root, args) => {
        let existingUser= await User.findOne({username: args.username})
  
        if(existingUser){
          //update the existingUser details
          existingUser.favoriteGenre= args.favoriteGenre
          return existingUser.save()
            .catch(error => {
              throw new ApolloError('Updating the user failed')
            })
        }else{
          const user = new User({ username: args.username })
          return user.save()
          .catch(error => {
            throw new ApolloError('Creating the user failed', 'BAD_USER_INPUT' ,{
              invalidArgs: args.name,
            })
          })
        }
      },
      /*createUser: async (root, args) => {
        const user = new User({ username: args.username })
    
        return user.save()
          .catch(error => {
            throw new ApolloError('Creating the user failed', 'BAD_USER_INPUT' ,{
              invalidArgs: args.name,
            })
          })
      },*/
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new ApolloLError('wrong credentials', 'BAD_USER_INPUT')        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
   },
  /*Mutation: {
      addBook: (root, args) => {
        const { author, ...bookData } = args
        let authorId
    
        // Check if the author already exists in the authors array
        const existingAuthor = authors.find((auth) => auth.name === author)
        if (existingAuthor) {
          authorId = existingAuthor.id
        } else {
          // If the author doesn't exist, create a new one and add it to the authors array
          authorId = uuid()
          const newAuthor = { name: author, id: authorId }
          authors.push(newAuthor)
        }
    
        // Create the book object with the provided data and authorId
        const book = { ...bookData, id: uuid() }
        books.push(book)
    
        return book
      }
    }*/
    /*Mutation: {
      addBook: (root, args) => {
        const { author, ...bookData } = args
    
        // Create the book object with the provided data and a generated ID
        const book = { ...bookData, id: uuid() }
        books.push(book)
    
        return book
      }
    }*/
    Subscription: {
        bookAdded: {
            subscribe: ()=> pubsub.asyncIterator('BOOK_ADDED')
        },
    },
    
  }

  module.exports= resolvers