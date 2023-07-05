import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(req, res){
  if(req.method === 'POST'){
    let db = (await connectDB).db('forum')
    let changed = {
      title : req.body.title,
      content : req.body.content
    }

    let result = db.collection('post').updateOne(
      { _id : new ObjectId(req.body._id) }, 
      { $set: changed })
    res.redirect(302, '/list')
  }
}