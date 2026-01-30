import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyToken = (req: Request,res:Response,next:NextFunction)=>{
    const authHeader = req.header("Authorization")
    if(!authHeader){
        return res.status(401).json({
            error: "NO token"
        })
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({error: 'Access Denied'})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {userId: string}
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({
            error: "Invalid Token"
        })
    }
}