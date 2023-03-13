import React, { useEffect, useState } from 'react'
import { useUserStore } from '@/store/useUserStore'

const UserProfile = () => {
  const { user, changePwd, recoverUser } = useUserStore()
  const [newPwd, setNewPwd] = useState('')
  const [code, setCode] = useState('')
  const [pwdMessage, setPwdMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      await recoverUser()
    }
    fetchData()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const message = await changePwd(newPwd, code)
    setPwdMessage(message)
    setNewPwd('')
    setCode('')
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <form onSubmit={handleSubmit}>
        <h3>Change Password</h3>
        {pwdMessage && <p>{pwdMessage}</p>}
        <label>
          New Password:
          <input type='password' value={newPwd} onChange={e => setNewPwd(e.target.value)} />
        </label>
        <br />
        <label>
          Code:
          <input type='text' value={code} onChange={e => setCode(e.target.value)} />
        </label>
        <br />
        <button type='submit'>Change Password</button>
      </form>
    </div>
  )
}

export default UserProfile
