const { Octokit } = require("octokit");
const octokit = new Octokit({
    auth: process.env.TOKEN,
    baseUrl:"https://api.github.com"
});


const homeRoute = async (req,res) => {
await octokit.request("GET /users") .then (
    users => {

        try {
            let page = 0;
        if(!req.query.page){
            page = 1;
        } else {
            page = parseInt(req.query.page);
        }
        
        const limit = 5;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {}

        if(endIndex < users.data.length){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
       

        if(startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }         
     
        results.users = users.data.slice(startIndex,endIndex);

        res.send({
            users: results.users,
            nextPage: page + 1,
            previousPage: page -1
        });

        }
        catch(error) {
            res.send({error: error.message})
        }        
    }
)    
}

module.exports = homeRoute;