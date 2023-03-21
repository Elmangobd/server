const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
// 
require('dotenv').config();
// 
router.post('/signup', (req, res) => {
    console.log('sent by client -', req.body);
   const { name,namep, namem, email, password } = req.body;
   if(!email || !password || !namem || !namep || !name ){
      return res.status(422).json({ error: "rellena todos los campos" });
   }
   User.findOne({ email: email })
   .then(async(savedUser) =>{
            if(savedUser){
                return res.status(422).json({ error: "credenciales invalidas" });
            }
            const user = new User({
                name,
                namep,
                namem,
                email,
                password
            })
            try {
                await user.save();
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                res.send({ token });
            }
            catch (err) {
                console.log(err);
            }
        
        }
   )

})
module.exports = router;