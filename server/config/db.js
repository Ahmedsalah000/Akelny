import mongoose from 'mongoose'
import 'colors' 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`❌ Error: ${error.message}`.red.underline)
        process.exit(1) 
    }
}

export default connectDB
