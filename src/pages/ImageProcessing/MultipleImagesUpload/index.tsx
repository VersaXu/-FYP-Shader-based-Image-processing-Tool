import React, { useState } from 'react'
import PageContainer from '@/components/PageContainer'
import styles from './index.module.less'
import { InboxOutlined } from '@ant-design/icons'
import { Card, Upload, message } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'
// 这个不能导入，会导致页面的部分布局坍塌
// import 'antd/dist/antd.css' 

const { Dragger } = Upload

const MultipleImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg']

  const handleImageUpload = (file: RcFile) => {
    if (imageExtensions.includes(file.name.slice(-4))) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <PageContainer>
      <Card>
        <Card>
          {' '}
          {imageUrl ? (
            <img src={imageUrl} alt='uploaded' style={{ maxWidth: '40%', maxHeight: '80vh' }} />
          ) : (
            <Dragger
              accept='.png,.jpg,.jpeg,.svg'
              beforeUpload={file => {
                handleImageUpload(file)
                return false
              }}
            >
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>Click or drag file to this area to upload</p>
              <p className='ant-upload-hint'>
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.
              </p>
            </Dragger>
          )}
        </Card>
      </Card>
    </PageContainer>
  )
}

export default MultipleImageUpload
