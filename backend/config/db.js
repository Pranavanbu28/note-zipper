const mongoose = require('mongoose')

const dbConnection = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser: true,
        })
        mongoose.set('strictQuery', true);
        console.log("Successfully connected mamae: ")
        console.log(conn.connection.host)
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnection