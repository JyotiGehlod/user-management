import mongoose from 'mongoose';
import express from'express'

const mongoURI = "mongodb://localhost:27017/userManagement";

   const connectToMongo = () => {
        mongoose.connect(mongoURI, () => {
            console.log("Connected to Mongo successfully")
        })
    }

export default connectToMongo;