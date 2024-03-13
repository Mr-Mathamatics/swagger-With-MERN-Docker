const User = require("../models/user.model.js");


const getUsers=async (req,res,next)=>{
    try {
        const users = await User.find()
        return res.send(users)
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
 
}

const getUser=async (req,res,next)=>{
    try {
        const {id}=req.params;
        let user = await User.findById(id)
        if(user){
            return res.send(user)
        }else{
            throw new Error('user dont exist please create one')
        }
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}

const createUser=async (req,res)=>{
    try {
        const {name,email}=req.body;
        const user_exist= await User.findOne({email})
        if(user_exist){
            return res.status(401).send({error:{message:"user already exist with this email"}})
        }else{
            const user = new User({
                name,
                email
            })
            const newUser = await user.save()
            res.status(201).send(newUser)
        }
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}

const deleteUser=async (req,res,next)=>{
    try {
        const {id} =req.params;
        await User.findByIdAndDelete({_id:id})
        return res.status(200).json({message: "User deleted Successfully"}) 
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}
const updateUser=async (req,res,next)=>{
    try {
        const {id} = req.params;
        const body = req.body;
        let user = await User.findById(id)
        if(user){
            for(let key in body){
                user[key] = body[key]
            }
            await user.save()
            return res.status(200).json({message: "User updated Successfully"}) 
        }else{
            throw new Error('user dont exist please create one')
        }
        
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
   
}

module.exports.getUser=getUser;
module.exports.getUsers=getUsers;
module.exports.createUser=createUser;
module.exports.deleteUser=deleteUser;
module.exports.updateUser=updateUser;
