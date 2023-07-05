import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(req, res){
  if(req.method === 'POST'){
    let db = (await connectDB).db('forum')

    let result = db.collection('post').deleteOne({ _id : new ObjectId(req.body) })

    res.status(200).json('삭제완료')
    // res.redirect(302, '/list')
  }
}