import React, { useState } from 'react'
import PageContainer from '@/components/PageContainer'
import styles from './index.module.less'
import { InboxOutlined } from '@ant-design/icons'
import { Card, Upload, message } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'

const { Dragger } = Upload

const SingleImageUpload: React.FC = () => {
  // 原图片url
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg']

  // 上床图片；及其规范
  const handleImageUpload = (file: RcFile) => {
    if (imageExtensions.includes(file.name.slice(-4))) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageUrl(reader.result as string)
        console.log('TEST url1' + reader.result)
      }
      reader.readAsDataURL(file)

      console.log('TEST url2:' + reader)

      message.success('Successfully upload the image')
    } else {
      message.error('Error')
    }
  }

  return (
    <PageContainer>
      <Card>
        <Card>
          {' '}
          <div className={styles['img-holder']}>
            {imageUrl ? (
              <>
                <div className={styles['origin-img']}>
                  <img
                    src={imageUrl}
                    alt='uploaded'
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                </div>
                <div className={styles['origin-img']}>
                  <img
                    src={imageUrl}
                    alt='uploaded'
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                </div>
                {/* 之后再继续kaifa,展示原图和结果图像的标志性文字 */}
                {/* <div className={styles['image-name-boxes']}>
                  <div>Origin</div>
                  <div>Result</div>
                </div> */}
              </>
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
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other band
                  files.
                </p>
              </Dragger>
            )}
          </div>
          {/* <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p> */}
        </Card>
      </Card>
    </PageContainer>
  )
}

export default SingleImageUpload
