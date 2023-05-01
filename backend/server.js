const express = require('express');
const app = express();
const notes = require('./data/notes');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnection = require('./config/db')
const userRouter = require('./routes/userRoutes');
const notesRouter = require('./routes/notesRoute')
const { notFound, errorhandler } = require('./middlewares/errorHandler');
const path = require('path');
// const { log } = require('console');
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST"
  }
app.use(cors(corsOptions));
dotenv.config();
app.use(express.json())
// console.log(process.env);
dbConnection()

app.get('/notes',(req,res)=>{
    res.json(notes);    
})

    app.use('/api/users',userRouter)
    app.use('/api/notes',notesRouter)
    
    //-----deployment------
    
    
    __dirname = path.resolve();
    
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join(__dirname,'/frontend/build')))
        app.get('*',(req,res)=>{
            res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
        })
    }
    else{
        app.get("/",(req,res)=>{
            res.send("Believe it!");
        })
    }
    //-----deployment------
    
    app.use(notFound)
    app.use(errorhandler)
    const port = process.env.port;
    app.listen(port,()=>{
        console.log(`server listening at port ${port}...`);
        console.log(path.resolve(__dirname,'frontend','build','index.html'))
})