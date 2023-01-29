const express = require('express')
const router = express.Router()
router.get('/login',(req,res) => {
  res.send("you are logged in....")  
})
router.get('/register',(req,res) => {
    res.send("you are registered....")
})
module.exports = router
