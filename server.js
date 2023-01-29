// initialising the libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const userAuth = require('./authRouter')
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
// routing functions
app.get('/',(req,res) => {
    res.send("hello");
});
app.use('/',router);
router.get('/new',(req,res) => {
    res.send("Im sent by the router method")
})
app.use('/auth',userAuth);
//listening on a particular port
app.listen(process.env.PORT || 3001,() => {
    console.log("Listening carefully...");
})