import { createContext } from 'react'

interface IAction {
  type: string
  data?: any
}
interface IState {
  userinfo: any
  isShow: boolean
  sidebarSelectedKey: string
  sidebarOpenKeys: string[]
  sidebarCollapsed: boolean
}
interface IContextProps {
  state: IState
  dispatch: ({ type }: IAction) => void
}

// 全局状态入口
export const AppContext = createContext({} as IContextProps)

export const UPDATE_USERINFO = 'UPDATE_USERINFO'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SETSHOW = 'SETSHOW'
export const UPDATE_SIDEBAR_DATA = 'UPDATE_SIDEBAR_DATA'

export const DEFAULT_STORE_STATE: IState = {
  userinfo: {},
  sidebarCollapsed: false,
  sidebarOpenKeys: [],
  sidebarSelectedKey: '/dashboard',
  isShow: false
}

export const appReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case UPDATE_USERINFO:
      return { ...state, userinfo: action.data }
    case LOGIN:
      return { ...state, userinfo: action.data }
    case UPDATE_SIDEBAR_DATA:
      return { ...state, ...action.data }
    case LOGOUT:
      return { ...state, userinfo: {} }
    default:
      return { ...state }
  }
}
