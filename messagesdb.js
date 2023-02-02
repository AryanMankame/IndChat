const mongoose = require('mongoose')
const express = require('express')
mongoose.set("strictQuery", false);
const bodyParser = require('body-parser');
const router = express.Router()
// router.use(express.json())
const message = mongoose.Schema({
    sender:String,
    reciever:String,
    content:String,
    timeStamp:String
})
const Message = mongoose.model('message',message)
router.post('/newmsg',(req,res) => {
    const msg = new Message(req.body)
    msg.save()
   .then(doc => {
     res.send(doc)
   })
   .catch(err => {
     res.send(err)
   })
})
router.get('/getmsg',(req,res) => {
    var ans = Message.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    });
}) 
module.exports = router 