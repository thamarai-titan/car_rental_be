import jwt from 'jsonwebtoken'
import { createUser, signInUser } from '../services/auth.service.ts'
import type {Request,Response} from 'express';
import type { UsertInputType } from '../modules/types/auth.types.ts';
import bcrypt from "bcrypt"


export const signupController = async (req: Request<{},{},UsertInputType>,res: Response)=>{
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            success: true,
            data:{
                "message":"User created successfully",
                "userId" : user.id
            }
        })
    }
    catch (error: any){
        res.status(400).json({message: "Username must ne Unique"})
    }
}

export const signinController = async (req:Request,res:Response)=>{
    try{
        const {username,password} = req.body
        const user = await signInUser(req.body);
        if(!user){
            return res.status(401).json("user does not exist")
        }

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch){
            return res.status(401).json({error:'Incorret password'})
        }

        const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY!, {
            expiresIn: '24h'
        });

        res.status(200).json({
            success:true,
            data:{
                "message": "Login successful",
                "token": token
            }
        })

        }
    catch (error){
        res.status(400).json({error: "Login Failed"})
    }
}