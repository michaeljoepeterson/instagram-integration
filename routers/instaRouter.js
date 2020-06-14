const express = require('express');
const {Insta} = require('../models/instaData');
const {TokenHandler} = require('./tokenHandler');
const router = express.Router();

router.get('/',(req,res) => {
    let {token} = req.query;
    console.log(token);
    return Insta.find({'token':token})

    .then(instaResults => {
        
        const tokenHandler = new TokenHandler(instaResults,Insta);

        let newToken = tokenHandler.CheckResults();
              
        if(tokenHandler.err){
            throw(tokenHandler.err);
        }
        else if(newToken){
            return res.json({
                code:200,
                token:newToken
            });
        }
        else{
            const err = {
                message:'Error with handler'
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