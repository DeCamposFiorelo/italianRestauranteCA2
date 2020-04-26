const express = require('express')
const router = express.Router()
const Pizzas = require('../model/pizza')

//get all  pizza
router.get('/',async(req,res)=>{
    let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')  
  }
    try{
        const pizzas = await Pizzas.find(searchOptions)
         res.render('pizzas/index',
         {pizza:pizzas, 
            searchOptions:req.query
        })
    }catch{
        res.redirect('/')
    }   
});

//new pizza router
router.get('/new',(req,res)=>{
    res.render('pizzas/new',{ pizzas :new Pizzas()})
})

//creaate pizza router
router.post('/', async(req,res)=>{
    const pizza = new Pizzas({
        name: req.body.name,
        price: req.body.price,
        description:req.body.description
    })
    try{
        const newPizza = await pizza.save()
        res.redirect('pizzas')
    }catch{
        res.render('pizzas/new',{
            pizzas:pizza,
            errorMessage:'Error creating a pizza'
        })
    }  
})
// show by ID router
router.get('/:id',async (req,res)=>{
    try{
        const pizza = await Pizzas.findById(req.params.id)
        res.render('pizzas/show',{
            pizzas:pizza,
        })     
    }catch{
   
        res.redirect('/')
    }  
})

// find the specefic ID to update after
router.get('/:id/edit',async(req,res)=>{
    try{
        const pizzas = await Pizzas.findById(req.params.id)
        res.render('pizzas/edit',{ pizzas :pizzas})
    }catch{
        res.redirect('/pizzas')
    }
   
})
//update router
router.put('/:id',async (req,res)=>{
   let pizza
    try{
        pizza = await Pizzas.findById(req.params.id)
        pizza.name = req.body.name,
        pizza.price=req.body.price
        pizza.description=req.body.description
        await pizza.save()//save in the db
        res.redirect(`/pizzas/${pizza.id}`)
       
    }catch{
        if( pizza ==null){
            res.redirect('/')
        }else{
            res.render('pizzas/new',{
            pizzas:pizza,
            errorMessage:'Error updating'
        })
    }       
        }   
})
//delete router
router.delete('/:id',async (req,res)=>{
  let pizza
    try{
        pizza = await Pizzas.findById(req.params.id)
         await pizza.remove()
        res.redirect(`/pizzas`)
       
    }catch{
        if( pizza ==null){
            res.redirect('/')
        }else{
            res.redirect(`/pizzas/${pizza.id}`)
        }
    }
        
        
})

module.exports = router 