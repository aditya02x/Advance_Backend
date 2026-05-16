import redisClient from "../config/redis.js";
import asynchandeler from "./asynchandler";

const ratelimiter = asynchandeler(
    async (req, res, next) => {

        const userIp = req.ip;

        //incriment 
        const requestCount = await redisClient.incr(userIp);

        //ip expirt 
        if (requestCount === 1){
            await redisClient.expire(userIp,60)
        }

        if(requestCount > 100){
            return res.status(429).json({message:"Too many requests. Please try again later."})
        }
    }
)