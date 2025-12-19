const jwt = require('jsonwebtoken');
const prisma = require('../db/prisma');


async function protect(req, res, next) {


    try{
            //luam token-ul din header request
        const tokenHeather= req.headers.authorization;

        if(!tokenHeather||!req.headers.authorization.startsWith('Bearer')){
            return res.status(401).json({error:'No token provided'});

       }
        //tokenul este pe pozitia 1
       const token = tokenHeather.split(" ")[1];//["beaer", "abc.def.ghi"]
        //verificam daca este corect tokenul
       const verifyUserToken = jwt.verify(token, process.env.JWT_SECRET)
        //cautam userul in baza de date
       const user = await prisma.user.findUnique({
        where:{id:verifyUserToken.userId}
       })

        if(!user){
            return res.status(401).json({error: 'User no longer exists.!'})
        }
            //atasam userul la request
        req.user={
            id:user.id,
            email:user.email,
        }

        next()


    }catch(err){

        console.error('Middleware error', err)
        res.status(400).json({error:'Invalid token!'})




    }

  
    
}

  module.exports= protect;