import mongoose from "mongoose"

export const connectDB = async () =>{

    try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected at ${conn.connection.host}`)
    }
    catch(err){
        console.error('Connection failed !',err.message);
        process.exit(1)
    }
}