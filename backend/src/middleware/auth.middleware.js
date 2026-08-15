import jwt from "jsonwebtoken";
import config from "../config/env.js";

export const protect = async(req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({success: false, message: "Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token,config.jwt.secret)
        console.log("JWT verification success:", decoded);
        req.user = decoded
        next()
    }catch(error){
        console.log("JWT verification failed:", error);
        return res.status(401).json({success: false, message: "Invalid token"})
    }
}   