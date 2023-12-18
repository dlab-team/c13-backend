import mongoose from "mongoose"
import { MONGODB_URI } from "./config.js"

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("conectado")
  } catch (error) {
    console.error("Error", error.message)
    console.log("sin conexion")
  }
}

mongoose.connection.on("connected", () => {
  console.log("Mongodb is connected to", mongoose.connection.db.databaseName)
})
