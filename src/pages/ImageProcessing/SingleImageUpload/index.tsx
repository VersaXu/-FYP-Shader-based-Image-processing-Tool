import React, { useEffect, useRef, useState } from 'react'
import PageContainer from '@/components/PageContainer'
import styles from './index.module.less'
import { DownOutlined, InboxOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Card, Upload, message, Dropdown, Menu, Typography, Button, Popconfirm } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'

import { createShader, createProgram } from '../../../shader/utils'

import {
  filter,
  noFilter,
  edgeDetectFilter,
  gaussinFilter_3,
  gaussinFilter_5,
  gaussinFilter_9,
  Sobel_x,
  Sobel_y
} from '../../../shader/filters'

import recordStore from '@/store/useRecordStore'

const { Dragger } = Upload

interface Props {
  imageUrl: string
}

const SingleImageUpload: React.FC<Props> = () => {
  // 原图片url
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg']

  // 结果图片
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  // const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  // 上传图片；及其规范
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

  // 下拉列表列表选择存储
  const [selectedKey, setSelectedKey] = useState<string>('1')
  // 每个kernel对应的索引
  const filterMap = new Map([
    ['1', 'No Filter'],
    ['2', 'Gaussin Blur (3*3)'],
    ['3', 'Gaussin Blur (5*5)'],
    ['4', 'Gaussin Blur (9*9)'],
    ['5', 'Canny Edge Detection'],
    ['6', 'Sobel Edge X'],
    ['7', 'Sobel Edge Y']
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
    // 以下是所有的shader算法操作，应该在点击button时实现
    // 可以改成getElementBYID
    const canvas = canvasRef.current
    console.log('TEST 1' + canvas)
    if (canvas) {
      const gl = canvas.getContext('webgl')
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

      // const colorUniformLocation = gl.getUniformLocation(program, 'color')

      // 创建buffer
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      gl.useProgram(program)
      gl.enableVertexAttribArray(positionAttributeLocation)

      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1]), gl.STATIC_DRAW)

      // 创建 texture
      const texture = gl.createTexture() as WebGLTexture & { image: HTMLImageElement }
      console.log('TEXT original image' + imageUrl)

      texture.image = new Image()

      // 这里着重强调异步！否则会在转化的时候，纹理还没有加载到canvas上
      texture.image.onload = function () {
        handleLoadedTexture(gl, texture, function () {
          const url = canvas.toDataURL('image/png')
          console.log(url)
          setResultUrl(url)
        })
      }
      texture.image.crossOrigin = ''
      texture.image.src = imageUrl!

      // 加载texture
      function handleLoadedTexture(gl: WebGLRenderingContext, texture: WebGLTexture, callback?: () => void) {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image)
        gl.drawArrays(gl.TRIANGLES, 0, 6)

        if (callback) {
          callback()
        }
      }
    }
  }, [currentFilter, imageUrl])

  // control load the record store
  useEffect(() => {
    const fetchRecords = async () => {
      const records = await recordStore.getRecords(1, 100)
      console.log('TEST STORE: ' + JSON.stringify(records))
    }
    fetchRecords()
  }, [])

  // handle cancel
  const handleCancel = () => {
    console.log('Cancel cancel button')
  }

  //handle ok
  const handleConfirm = () => {
    setImageUrl(null)
  }
  // handle save
  const handleSave = () => {
    if (resultUrl) {
      const data = {
        id: new Date().getTime(),
        type: 'single image',
        originImage: imageUrl,
        resultImage: resultUrl,
        date: new Date().toISOString()
      }
      // 存储数据到 localStorage, 这里应该是一个结果数组
      // localStorage.setItem('imageProcess', JSON.stringify(data))
      // console.log('current local:' + localStorage.getItem('imageProcess'))

      // api POST, 上传到record database

      message.success('Successful!')
    } else {
      message.error('No Result imagme here!')
    }
  }

  //handle Download
  const handleDownload = () => {
    if (resultUrl) {
      setTimeout(() => {
        const url = resultUrl
        const link = document.createElement('a')
        link.href = url
        link.download = 'result.png'
        link.click()
      }, 1000)
    } else {
      message.error('No result image found!')
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
                <canvas className={styles['origin-img']} ref={canvasRef} width={350} height={350} />
                {/* 展示原图和结果图像的标志性文字 */}
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
                  Support for a single or bulsk upload. Strictly prohibit from uploading company data or other band
                  files.
                </p>
              </Dragger>
            )}
          </div>
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
              <Menu.Item key='4' onClick={() => setCurrentFilter(gaussinFilter_9)}>
                {filterMap.get('4')}
              </Menu.Item>
              <Menu.Item key='5' onClick={() => setCurrentFilter(edgeDetectFilter)}>
                {filterMap.get('5')}
              </Menu.Item>
              <Menu.Item key='6' onClick={() => setCurrentFilter(Sobel_x)}>
                {filterMap.get('6')}
              </Menu.Item>
              <Menu.Item key='7' onClick={() => setCurrentFilter(Sobel_y)}>
                {filterMap.get('7')}
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
        <Button type='primary' style={{ float: 'right', marginLeft: '5px' }} onClick={handleSave}>
          Save
        </Button>
        <Popconfirm
          title='Delete the current image?'
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okButtonProps={{ type: 'danger' }}
          okText='Yes'
          cancelText='No'
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        >
          <Button type='primary' danger style={{ float: 'right' }} onClick={handleCancel}>
            Cancel
          </Button>
        </Popconfirm>
      </Card>
    </PageContainer>
  )
}

export default SingleImageUpload
