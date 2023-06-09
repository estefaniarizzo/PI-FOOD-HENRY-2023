const { Router } = require('express'); 
const{Recipe,TypeDiet} = require('../db') 
const router = Router(); 
 
router.post('/', async (req,res,next) => { 
    let { 
        title, 
        summary, 
        spoonacularScore, 
        healthScore, 
        analyzedInstructions,     
        createdInDb,        
        typeDiets          
    } = req.body;        
    if(!title || !summary) { 
        return res.status(400).send('porfavor, ingrese el nombre!'); 
    }       
    console.log(title);     
try{let createRecipe = await Recipe.create({     
       // id,           
        title,      
        summary,      
        spoonacularScore ,        
        healthScore,  
        analyzedInstructions,     
       // typeDiet,  
        createdInDb     
})  
let dietTypeDb = await TypeDiet.findAll({ where:{ name:typeDiets } })  
    createRecipe.addTypeDiet(dietTypeDb)  
    res.status(200).send('receta creada')     
 
}catch(e){ 
    next(e) 
} 
}); 
 
module.exports= router; 