import React, { useState } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { useNavigate } from 'react-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { validateUser } = useUserStore()

  const handleLogin = async e => {
    e.preventDefault()
    await validateUser({ identifier: email, password })
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login
