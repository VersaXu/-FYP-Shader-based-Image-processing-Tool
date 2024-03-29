import React, { Fragment, useEffect, useRef, useState } from 'react'
import { DownOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Modal, Upload, Card, Button, message, Dropdown, Typography, Space, MenuProps, Menu } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import PageContainer from '@/components/PageContainer'
import { getImageUrl } from '@/utils'

import { createShader, createProgram, getCanvasImageUrl } from '../../../shader/utils'
import {
  filter,
  noFilter,
  edgeDetectFilter,
  gaussinFilter_3,
  gaussinFilter_5,
  Sobel_x,
  Sobel_y
} from '../../../shader/filters'

interface Props {
  imagesUrl: string[]
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

const MultipleImagesUpload: React.FC<Props> = () => {
  // In total, there are 3 types of uploading an image
  // <= 16 Only
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg']
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  // original images list
  const [imagesUrl, setImagesUrl] = useState<UploadFile[]>([
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

  // result images list
  const [resultsUrl, setResultsUrl] = useState<string[] | null>(null)

  const handleCancel = () => setPreviewOpen(false)
  // 展示图片
  const handlePreview = async (img: UploadFile) => {
    if (!img.url && !img.preview) {
      img.preview = await getBase64(img.originFileObj as RcFile)
    }

    setPreviewImage(img.url || (img.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(img.name || img.url!.substring(img.url!.lastIndexOf('/') + 1))
    console.log('Current focusing image:' + previewImage)
  }
  // 同步
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setImagesUrl(newFileList)
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

  // big size directory to limit the format of the images from the chosen directory
  // 自己手写完成上传函数
  const handleImageUpload = (img: any) => {
    if (imageExtensions.includes(img.name.slice(-4))) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const newImageList = [...imagesUrl]
        newImageList.push({
          uid: Date.now().toString(),
          name: img.name,
          status: 'done',
          url: reader.result as string
        })
        setImagesUrl(newImageList)
      })
      reader.readAsDataURL(img)
      message.success('Successfully upload the image')
    } else {
      message.error('Error')
    }
  }

  // 下拉列表列表选择存储
  const [selectedKey, setSelectedKey] = useState<string>('1')
  // 每个kernel对应的索引
  const filterMap = new Map([
    ['1', 'No Filter'],
    ['2', 'Gaussin Blur (3*3)'],
    ['3', 'Gaussin Blur (5*5)'],
    ['4', 'Canny Edge Detection'],
    ['5', 'Sobel Edge X'],
    ['6', 'Sobel Edge Y']
  ])

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    console.log('Current Item: ' + e.key + ', ' + filterMap.get(e.key))

    setSelectedKey(e.key)
    // console.log('Selected Successfully! The previous selected key is: ' + selectedKey)
  }

  // current canvas
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // current filter used
  const [currentFilter, setCurrentFilter] = useState<filter>(noFilter)

  useEffect(() => {
    if (canvasRef.current) {
      const gl = canvasRef.current.getContext('webgl')
      if (!gl) {
        console.log('WebGL not supported')
        return
      }

      gl.clearColor(1, 1, 1, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      // 在这选择使用哪一个filter
      const vertexShaderSource = currentFilter.vs

      const fragmentShaderSource = currentFilter.fs

      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

      // 创建shader program, 目的是连接两个shader的作用。
      const program = createProgram(gl, vertexShader, fragmentShader)
      const positionAttributeLocation = gl.getAttribLocation(program, 'position')
      const colorUniformLocation = gl.getUniformLocation(program, 'color')

      // 创建buffer
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      gl.useProgram(program)
      gl.enableVertexAttribArray(positionAttributeLocation)

      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1]), gl.STATIC_DRAW)

      // The ! after gl.createTexture() tells TypeScript that you are certain that
      // the return value will not be null.

      // 创建 texture
      const texture = gl.createTexture() as WebGLTexture & { image: HTMLImageElement }
      texture.image = new Image()
      texture.image.onload = function () {
        handleLoadedTexture(gl, texture)
      }
      texture.image.crossOrigin = ''
      texture.image.src = imageUrl!

      // 这边要对每一个gl进行一个纹理的展示
      // 然后将把所有的结果url储存到
      function handleLoadedTexture(gl: WebGLRenderingContext, texture: WebGLTexture, callback?: () => void) {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }

      setResultsUrl(getCanvasImageUrl(canvasRef.current))
    }
  }, [currentFilter])

  // handle save a list of the images
  const handleSave = () => {
    if (resultsUrl) {
      const data = {
        id: new Date().getTime(),
        type: 'single image',
        originImage: imagesUrl,
        resultImage: resultsUrl,
        timestamp: new Date().toISOString()
      }
      // 存储数据到 localStorage
      localStorage.setItem('imageProcess', JSON.stringify(data))
      console.log('current local:' + localStorage.getItem('imageProcess'))

      message.success('Successfuyl!')
    } else {
      message.error('No Result imagme here!')
    }
  }

  // handle save
  // const handleSave = () => {
  //   if (resultUrl) {
  //     const data = {
  //       id: new Date().getTime(),
  //       type: 'single image',
  //       originImage: imageUrl,
  //       resultImage: resultUrl,
  //       timestamp: new Date().toISOString()
  //     }
  //     // 存储数据到 localStorage, 这里应该是一个结果数组
  //     localStorage.setItem('imageProcess', JSON.stringify(data))
  //     console.log('current local:' + localStorage.getItem('imageProcess'))

  //     message.success('Successfuyl!')
  //   } else {
  //     message.error('No Result imagme here!')
  //   }
  // }
  //handle Download
  const handleDownload = () => {}

  return (
    <>
      <PageContainer>
        <Card>
          <Card>
            <h1>Upload Images One by One</h1>
            <br />
            <Upload
              listType='picture-card'
              fileList={imagesUrl}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={file => {
                handleImageUpload(file)
                return false
              }}
            >
              {imagesUrl.length >= 16 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt='example'
                style={{ width: '100%', height: '100%', maxWidth: '430px', maxHeight: '460px' }}
                src={previewImage}
              />
            </Modal>
          </Card>
          <br />
          {/* 下拉列表选择算法 */}
          <Dropdown
            overlay={
              <Menu onClick={handleMenuClick} itemID={selectedKey} selectable defaultSelectedKeys={['1']}>
                <Menu.Item key='1' onClick={() => setCurrentFilter(noFilter)}>
                  {filterMap.get('1')}
                </Menu.Item>
                <Menu.Item key='2' onClick={() => setCurrentFilter(gaussinFilter_3)}>
                  {filterMap.get('2')}
                </Menu.Item>
                <Menu.Item key='3' onClick={() => setCurrentFilter(gaussinFilter_5)}>
                  {filterMap.get('3')}
                </Menu.Item>
                <Menu.Item key='4' onClick={() => setCurrentFilter(edgeDetectFilter)}>
                  {filterMap.get('4')}
                </Menu.Item>
                <Menu.Item key='5' onClick={() => setCurrentFilter(Sobel_x)}>
                  {filterMap.get('5')}
                </Menu.Item>
                <Menu.Item key='6' onClick={() => setCurrentFilter(Sobel_y)}>
                  {filterMap.get('6')}
                </Menu.Item>
              </Menu>
            }
          >
            <Typography.Link>
              Hover me to select algorithm <DownOutlined />
            </Typography.Link>
          </Dropdown>
          <Button style={{ float: 'right', marginLeft: '5px' }} onClick={handleDownload}>
            Download
          </Button>
          <Button
            type='primary'
            style={{ float: 'right', marginLeft: '5px' }}
            // onClick={handleSave}
          >
            Save
          </Button>
          <Button type='primary' danger style={{ float: 'right' }} onClick={() => setImagesUrl([])}>
            Cancel
          </Button>
        </Card>
      </PageContainer>
    </>
  )
}

export default MultipleImagesUpload
