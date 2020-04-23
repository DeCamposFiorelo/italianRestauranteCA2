const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('index')//it will send to the index page when the web start
});

module.exports = router 