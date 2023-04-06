import { MongoClient } from "mongodb";

export async function connectToDB(){
   const client = await MongoClient.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clusterName}.b3tjvwe.mongodb.net/${process.env.mongodb_database}`)
   return client
}