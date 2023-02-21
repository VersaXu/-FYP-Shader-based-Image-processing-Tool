import React, { Fragment, useState } from 'react'
import { DownOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Modal, Upload, Card, Button, message, Dropdown, Typography, Space, MenuProps, Menu } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import PageContainer from '@/components/PageContainer'
import fs from 'fs'
import { getImageUrl } from '@/utils'

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

const MultipleImagesUpload: React.FC = () => {
  // In total, there are 3 types of uploading an image
  // <= 16 Only
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg']
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  // Both
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    // uploading, with a specific percentage and a status: 'uploading'
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // error
    {
      uid: '-5',
      name: 'image.png',
      status: 'error'
    },
    {
      uid: '-6',
      name: 'image.png',
      status: 'done',
      url: getImageUrl('banner.png')
    }
  ])

  // 算法列表选择
  // const items: any[] = [
  //   {
  //     key: 1,
  //     label: 'Item 1',
  //     handleClick: () => {
  //       // Function to invoke when Item 1 is clicked
  //     }
  //   },
  //   {
  //     id: 2,
  //     label: 'Item 2',
  //     handleClick: () => {
  //       // Function to invoke when Item 2 is clicked
  //     }
  //   }
  //   // Add additional items as needed
  // ]

  const handleCancel = () => setPreviewOpen(false)
  // 展示图片
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    console.log('Current focusing image:' + previewImage)
  }
  // 同步
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    // 等一会儿改一下数据结构，创建一个专门用于表示图片object的type
    const details: any[] = []
    newFileList.map(img => {
      const { uid, name, status } = img
      details.push({ uid, name, status })
    })
    console.log('Current image list:' + details.map(obj => JSON.stringify(obj)).join(','))
  }

  // <= 16 Only(Upper one)
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 24 }}>Upload</div>
    </div>
  )

  // big size directory or multiple image set upload, to limit the format of the images from the chosen directory
  // 自己手写完成上传函数
  const handleImageUpload = (file: any) => {
    if (imageExtensions.includes(file.name.slice(-4))) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const newFileList = [...fileList]
        newFileList.push({
          uid: Date.now().toString(),
          name: file.name,
          status: 'done',
          url: reader.result as string
        })
        setFileList(newFileList)
      })
      reader.readAsDataURL(file)
      message.success('Successfully upload the image')
    } else {
      message.error('Error')
    }
  }
  // 下拉列表列表选择存储
  const [selectedKey, setSelectedKey] = useState('1')

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    console.log(e.key)

    setSelectedKey(e.key)
    console.log('Selected Successfully! The previous selected key is: ' + selectedKey)
  }

  return (
    <>
      <PageContainer>
        <Card>
          <Card>
            <h1>Upload Images One by One</h1>
            <br />
            <Upload
              // accept='.png,.jpg,.jpeg,.svg'
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={file => {
                handleImageUpload(file)
                return false
              }}
            >
              {fileList.length >= 16 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt='example'
                style={{ width: '100%', height: '100%', maxWidth: '430px', maxHeight: '460px' }}
                src={previewImage}
              />
            </Modal>
            <br />
            <br />
            {/* 下拉列表选择算法 */}
            <Dropdown
              overlay={
                <Menu onClick={handleMenuClick} itemID={selectedKey} selectable>
                  <Menu.Item
                    key='1'
                    // onClick={handleClick}
                  >
                    Item 1
                  </Menu.Item>
                  <Menu.Item
                    key='2'
                    // onClick={handleClick}
                  >
                    Item 2
                  </Menu.Item>
                  <Menu.Item
                    key='3'
                    // onClick={handleClick}
                  >
                    Item 3
                  </Menu.Item>
                </Menu>
              }
            >
              <Typography.Link>
                Hover me to select algorithm <DownOutlined />
              </Typography.Link>
            </Dropdown>
          </Card>
        </Card>
      </PageContainer>
    </>
  )
}

export default MultipleImagesUpload
