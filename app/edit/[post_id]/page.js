import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function Edit(props) {

  const db = (await connectDB).db('forum')
  let result = await db.collection('post').findOne({ _id : new ObjectId(props.params.post_id) })
  
  // await db.collection('post').updateOne({_id: props.params.post_id}, {$set: { title: }})

  return (
    <div className="p-20">
      <h4>수정 페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result.title}/>
        <input name="content" defaultValue={result.content}/>
        <input style={{display : 'none'}} name="_id" defaultValue={result._id.toString()}/>
        <button type="submit">수정</button>
      </form>
    </div>
  )
}