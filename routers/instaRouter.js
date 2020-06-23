const express = require('express');
const {Insta} = require('../models/instaData');
const {TokenHandler} = require('./tokenHandler');
const {checkAdmin} = require('../tools/checkKey');
const router = express.Router();

router.get('/',checkAdmin,(req,res) => {
    let {token} = req.query;
    return Insta.find({})

    .then(instaResults => {
        
        const tokenHandler = new TokenHandler(instaResults,Insta,token);

        return tokenHandler.CheckResults();

       
    })

    .then(tokenData => {
        console.log('final token data: ',tokenData);
        if(tokenData.err){
            throw(tokenHandler.err);
        }
        else if(tokenData.token && !tokenData.err){
            return res.json({
                code:200,
                token:tokenData.token
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