const express = require('express')
const router = express.Router()
const Sides = require('../model/side')

//get all the sides
router.get('/',async(req,res)=>{
  try{
      const sides = await Sides.find({})
      res.render('sides/index',{
          side:Sides,
          searchOptions1:req.query
      })
    }catch{
          res.redirect('/')
      }
  

});

//new sides router
router.get('/new',async(req,res)=>{
     

    try{
        const side = new Sides()
        res.render('sides/new',{
            side:Sides
        })
    }catch{
        res.redirect('sides')
    }
})
//creaate sides router

router.post('/', async(req,res)=>{
    const side = new Sides({
        name:req.body.name1,
        price:req.body.price,
        description:req.body.description
    })
    try{
        const newSide = await side.save()
        res.redirect('sides')
    }catch{
        res.render('sides/new',{
            side:sides,
            errorMessage:'Error creating '
        })

    }

    res.send('create sides')
})

module.exports = router 