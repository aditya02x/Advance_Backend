

const errorMiddleware = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    console.log(err);
    res.status(statusCode).json({
        message:"Something went wrong",
        error:err.message,
        success:false
    })
}

export default errorMiddleware;