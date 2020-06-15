class TokenHandler{
    err = null;
    token = null;
    instaResults = null;
    instaModel = null;

    constructor(instaResults,instaModel,token){
        this.instaResults = instaResults;
        this.instaModel = instaModel;
        this.token = token;
    }
    //check the results and return the token or set the err if err
    CheckResults = () =>{
        this.token = "123";
        //add token
        if(this.instaResults.length === 0){

        }
        else if(this.instaResults === 1){

        }
        else{
            this.err = {
                message:'Issue with data'
            };
            return null;
        }
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