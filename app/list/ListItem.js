'use client'

import Link from 'next/link'

export default async function ListItem(props) {
  return (
    <div>
      {
        props.result.map((v, i) =>
          <div className="list-item" key={i}>
            <Link href={`../detail/${v._id}`} >
              <h4>{v.title}</h4>
            </Link>
            <Link href={`/edit/${v._id}`}>수정</Link>
            <button onClick={()=>{
              fetch('/api/post/delete', { method : "POST", body : v._id })  // ajax로 fetch를 쓰면 에러 처리가 길어져서 axios를 써도 된다.
              .then(res => {
                if(res.status === 200) {
                  return res.json()
                }else{  // 서버에서 에러를 보냈을 시
                  throw new Error('error')
                }
              })
              .then(res => {
                console.log('삭제완료')
              }).catch(err => { // 인터넷 문제로 에러 났을 경우
                console.log(err)
              })
            }}>삭제</button>
            <p>{v.content}</p>
          </div>
        )
      }
    </div>
  )
}