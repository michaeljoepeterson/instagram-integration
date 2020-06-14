const express = require('express');
const {Insta} = require('../models/instaData');
const router = express.Router();

router.get('/:token',(req,res) => {
    let {token} = req.params;
    
    return Insta.find({token:token})

    .then(instaResults => {
        //add token
        if(instaResults.length === 0){
            
        }
        else if(instaResults.length === 1){

        }
        else{
            const err = {
                message:'Issue with results'
            };
            throw(err);
        }
    })

    .catch(err => {
        return res.json({
            code:500,
            message:'an error occured',
            error:err
        });
    });
    
});

module.exports = {router};