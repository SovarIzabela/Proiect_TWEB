
const prisma = require('../db/prisma');
const validator = require('validator');
const { getPlaylists } = require('./playlistController');
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')



function signToken(userId){
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN||'7d'},
    )
}

//POST http://localhost:3000/api/auth/register

async function createUser(req, res) {
    try{

        const{email, password,passwordConfirm, picture} = req.body||{}

        if(!email||!password||!passwordConfirm){
            return res.status(400).json({
                error:"Campurile Email, Password si Confirmare password sunt obligatorii!"
            });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
            error: "Invalid email format!Please enter a valid email adress"
        });
        }
        if(password.length < 8){
            return res.status(400).json({ 
            error: "Parola trebui sa contina cel putin 8 caractere!!"})

        }


          if(password!==passwordConfirm){
            return res.status(400).json({ 
            error: "Parolele nu sunt identice! "})

        }


        const existingUser = await prisma.user.findUnique({
            where:{email:email.trim()},

        });

       if (existingUser) {
             return res.status(400).json({
            error: 'Adresa de email este deja utilizată!'
        });
        }

        const encryptedPass = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
        data:{
            email:email.trim(),
            password:encryptedPass,
            picture : picture? picture.trim(): null,
        }



    })
       
  
    res.status(201).json({//returnam obiectul catre frontend
        message:"User created with succes!",
        id: newUser.id,
        email: newUser.email,
        picture :newUser.picture,
        createdAt: newUser.createdAt,
    
      
    });
    }catch(err){
          console.error('Error creating user:', err);
            res.status(500).json({ error: 'Server error' });
    }

    
}


//POST http://localhost:3000/api/auth/login
async function loginUser(req, res){
    try{
        const {email, password} =req.body||{}
        //verificam daca emailul si parola exista
        if(!email||!password){
            return res.status(400).json({
            error:'Email-ul si parola sunt obligatorii'
        });
        }
        //verificam daca userul si parola sunt corecte
        const user= await prisma.user.findUnique({
            where:{email:email.trim()},
        })

        if(!user){
            return res.status(400).json({
            error:'Email-ul si parola sunt obligatorii'
            })
        }


        const passwordOk = await bcrypt.compare(password,user.password);
        if(!passwordOk){
            return res.status(400).json({
            error:'Parola nu este corecta!'
            })
        }


        //daca este ok trimiem tokenul

        const token=signToken(user.id)
        res.status(200).json({
            status:'succes',
            token
        })


    }catch(err){

        console.error('Error loginUser', err);
        res.status(500).json({ error: 'Server error' });

        }

}



module.exports = {
    createUser,
    loginUser,
}

