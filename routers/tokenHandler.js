

class TokenHandler{
    err = null;
    token = null;
    instaResults = null;
    instaModel = null;

    constructor(instaResults,instaModel){
        this.instaResults = instaResults;
        this.instaModel = instaModel;
    }
    //check the results and return the token or set the err if err
    CheckResults = () =>{
        this.token = "123";
        
        return this.token;
    }
}
/*
function TokenHandler(instaResults,instaModel){
    this.err = null;
    this.token = null;
    this.instaResults = null;
    this.instaModel = null;
    this.constructor(instaResults,instaModel)
}

TokenHandler.prototype.constructor = function(options){
    this.instaResults = instaResults;
    this.instaModel = instaModel;
    console.log('test in constructor');
};

TokenHandler.prototype.CheckResults = function(){
    this.token = "123";
    return this.token;
};
*/
module.exports = {TokenHandler};