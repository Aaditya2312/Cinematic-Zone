import express from "express"
import bcrypt from "bcryptjs"
import User from "../model/userSchema.mjs"
import Recommend from "../model/recommendationSchema.mjs"
const router = express.Router()

let log = false

router.get('/', (req,res) => {
    res.send(`hello from server router`)
})


router.post('/signin', async (req,res) => {
    const {name,city,password,cpassword} = req.body

    if(!name || !city || !password || !cpassword)
    {
        return res.status(422).json({error:"plzz fill all details"})
    }
    try{
        const userExists = await User.findOne({name:name})
            
        if(userExists){
                return res.status(422).json({error:"Name already present"})
            } else if(password != cpassword){
                    return res.status(422).json({error:"Check password again"})
                }
                else{
                const user = new User({name,city,password,cpassword})
            
                const userRegis =  await user.save()
    
                if(userRegis){
                    res.status(201).json({message:"user registered"})
                }else{
                    res.status(500).json({error:"Registration failed"})
                }
            }
        }catch(err){console.log(err)}

    //console.log(req.body)
    //res.json({message:req.body})
})

router.post('/login', async (req,res) => {
    const {name,password } = req.body
   
    if(!name || !password){
        return res.status(422).json({error:"plzz fill all details"})
    }

    try{
        const userLogin = await User.findOne({name:name})
        console.log(userLogin)
        
        if(userLogin){
            const isMatch = bcrypt.compareSync(password, userLogin.password)
            if(!isMatch){
                res.status(400).json({error:"Invalid Credentials"})
                console.log("incorrect pass")
            }else{
                log = true
                res.json({message:"User login successfull"})
            }   
        } else{
            res.status(400).json({error:"Invalid Credentials"})
        }
    }catch(err) {
        console.log(err)
    }
})

function requireLogin(req, res, next) {
    if(log) {
        console.log("permitted")
        next()
    }else{
        res.status(401).json({ error: 'Unauthorized' });
        res.redirect('/login')
    }

}

router.get('/logout', (req, res) => {
    log = false
    res.status(200).json({message:'Logout Successfull'})

})

router.post('/review', requireLogin, async(req,res) => {
    const {name,recommendation} = req.body
    if(!name || !recommendation)
    {
        return res.status(422).json({error:"plzz fill all details"})
    }

    try {
        const userExists = await User.findOne({ name });
        if (!userExists) {
            return res.status(422).json({ error: "User does not exist" });
        }
        const recommend = new Recommend({name,recommendation})
            
        const recommendRegis =  await recommend.save()

        if(recommendRegis){
            res.status(201).json({message:"done"})
        }else{
            res.status(500).json({error:"Undone"})
        }
    }catch(err) {
        console.log(err)
    }
})


router.get('/review', requireLogin, async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        let data;
        if (searchTerm) {
          data = await Recommend.find({ recommendation: { $regex: searchTerm, $options: 'i' } });
        } else {
          data = await Recommend.find();
        }
        res.json(data);
        console.log(data);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
  });

export default router