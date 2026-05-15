const errorMiddleware = (err,req,res,next)=>{
    console.log(err);
    res.status(500).json({
        message:"Something went wrong",
        error:err.message
    })
}