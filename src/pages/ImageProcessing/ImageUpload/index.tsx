import React, { useState, useEffect } from 'react'
import PageContainer from '@/components/PageContainer'
import styles from './index.module.less'
import './style.css'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, message, Upload } from 'antd'

import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'

const { Dragger } = Upload

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

  onChange(info: any) {
    const { status } = info.file

    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },

  onDrop(e: any) {
    console.log('Dropped files', e.dataTransfer.files)
  }
}

const TotalPackage: React.FC = () => {
  // 引入外部main.js
  const initScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = './TotalPackage/main.js' // 不起作用？？？
    document.body.appendChild(script)
    console.log('TEST', script.src)
  }

  useEffect(() => {
    initScript()
  }, [])

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  return (
    <PageContainer>
      <Card>
        <Card>
          {' '}
          {/* <Dragger {...props}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
            </p>
          </Dragger> */}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Upload action='https://www.mocky.io/v2/5cc8019d300000980a055e76' listType='picture' maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
          </Upload>
          {/* <ImgCrop rotate>
            <Upload
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              listType='picture-card'
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
          <br />
          <br />
          <div>
            <canvas id='sourceImg' className='column'></canvas>
            <canvas id='resultImg' className='column'></canvas>
          </div>
          <div>
            <input type='file' id='imgFile' />
          </div> */}
        </Card>
      </Card>
    </PageContainer>
  )
}

export default TotalPackage
