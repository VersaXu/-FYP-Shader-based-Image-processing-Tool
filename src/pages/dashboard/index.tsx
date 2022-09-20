import React from 'react'
import { Button } from 'antd'
import styles from './index.module.less'
const HomePage: React.FC = () => {
  return (
    <div className={styles['home']}>
      <div className={styles['home-title']}>Vite2+react17+react-rouer v6 + typescript + tea</div>
      <Button type='primary'>按一下加1S</Button>
    </div>
  )
}
export default HomePage
