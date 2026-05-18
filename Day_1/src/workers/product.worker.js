import { Worker } from "bullmq";

const productWorker = new Worker("newproduction" ,
     async (job)=>{
         console.log("Job received" , job.name);
        console.log("Processing job" , job.data);

        console.log(`processing product :`$(job.data.title));
     } ,
     {
        connection:{
            host:"localhost",
            port:6379
        }
     }

)

export default productWorker;