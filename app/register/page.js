export default function Register() {
  return (
    <div>
      <form method="POST" action="/api/auth/signup">
        <input type="text" name="username" placeholder="이름" />
        <input type="email" name="email" placeholder="이메일" />
        <input type="password" name="password" placeholder="비밀번호" />
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}