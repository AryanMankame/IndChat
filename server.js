// initialising the libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const userAuth = require('./authRouter')
const mongoose = require('mongoose')
const messageRouter = require('./messagesdb')
const socketid = {}
// socket part
const server = app.listen(process.env.PORT || 3002,() => {
    console.log("Listening carefully...");
})
var virtdata = []
const socket = require('socket.io')
const io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
io.on('connection',socket => {
    console.log('connected with => ',socket.id,' ',socket.handshake.query.loggeduser)
    socketid[socket.id] = socket.handshake.query.loggeduser;
    socket.on("check",(data) => {
        virtdata.push(data)
        console.log(data)
        socket.broadcast.emit('new_inserted',data)
    })
    socket.emit("checkme",socketid)
})

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
// connecting the database
const password = encodeURIComponent("Aryan@6/7/2002")
const connection_url = `mongodb+srv://aryan672002:${password}@cluster0.tqm8j4u.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(connection_url,{ useNewUrlParser: true })
// routing functions
app.get('/',(req,res) => {
    res.send("hello");
});
app.use('/message',messageRouter);
router.get('/new',(req,res) => {
    res.send("Im sent by the router method")
})
app.use('/auth',userAuth);

//listening on a particular port

app.post('/new',(req,res) => {
    let p = new Person({
        name:req.body["name"],
        age:req.body["age"],
        hobby:req.body["hobby"]
    })
    p.save()
   .then(doc => {
     res.send(doc)
   })
   .catch(err => {
     res.send(err)
   })
})