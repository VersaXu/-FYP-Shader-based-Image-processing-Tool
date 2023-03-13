import axios from 'axios'
import { useState, useEffect } from 'react'

type User = {
  id: number
  email: string
  name: string
}

type UserStore = {
  isSignedIn: boolean
  user: User | null
  registerUser: (user: { username: string; email: string; password: string }) => Promise<string>
  validateUser: (user: { identifier: string; password: string }) => Promise<string>
  recoverUser: () => void
  removeUser: () => void
  changePwd: (newPwd: string, code: string) => Promise<string>
}

export const useUserStore = (): UserStore => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    recoverUser()
  }, [])

  const registerUser = async (user: { username: string; email: string; password: string }): Promise<string> => {
    try {
      const resp = await axios.post('/auth/local/register', user)
      await validateUser({
        identifier: user.email,
        password: user.password
      })
      return ''
    } catch (error) {
      return 'fail to register! email already exists.'
    }
  }

  const validateUser = async (user: { identifier: string; password: string }): Promise<string> => {
    try {
      const resp = await axios.post('/auth/local', user)
      setIsSignedIn(true)
      setUser(resp.data.user)
      localStorage.setItem('token', resp.data.jwt)
      axios.defaults.headers.common.Authorization = `Bearer ${resp.data.jwt}`
      return ''
    } catch (error) {
      return 'Fail to sign in, wrong email or password!'
    }
  }

  const recoverUser = async () => {
    const token = localStorage.getItem('token')
    if (token && !isSignedIn) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      try {
        const resp = await axios.get(`/users/me`)
        setIsSignedIn(true)
        setUser(resp.data)
        console.log('test:' + user)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const removeUser = () => {
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
    setIsSignedIn(false)
    setUser(null)
  }

  const changePwd = async (newPwd: string, code: string): Promise<string> => {
    try {
      await axios.post('auth/reset-password', {
        code: code,
        password: newPwd,
        passwordConfirmation: newPwd
      })
      return ''
    } catch (error) {
      console.error(error)
      return 'Failed to change password.'
    }
  }

  return {
    isSignedIn,
    user,
    registerUser,
    validateUser,
    recoverUser,
    removeUser,
    changePwd
  }
}
