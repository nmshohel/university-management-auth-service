import mongoose from "mongoose";
import app from "./app";
import config from "./config";




async function boostrap() {
    try{
        await mongoose.connect(config.database_url as string);
        console.log('Database Connection Successfully');
        app.listen(config.port, () => {
            console.log(`Application app listening on port ${config.port}`)
          })

    }
    catch(err)
    {
        console.log("Database connection failed", err)

    }
    
  }

  boostrap();