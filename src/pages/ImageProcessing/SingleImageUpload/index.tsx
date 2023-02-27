import React, { useEffect, useRef, useState } from 'react'
import PageContainer from '@/components/PageContainer'
import styles from './index.module.less'
import { DownOutlined, InboxOutlined } from '@ant-design/icons'
import { Card, Upload, message, Dropdown, Menu, Typography, Button } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'

// 老师提供的例子
// import {
//   createProgram,
//   createShader,
//   setRectangle,
//   setBuffer,
//   set2DTexture,
//   getAttrib
// } from '../../../shader/shaderUtil'
import { createShader, createProgram } from '../../../shader/utils'

import { filter, noFilter, edgeDetectFilter, gaussinFilter_3, gaussinFilter_5 } from '../../../shader/filters'

const { Dragger } = Upload

interface Props {
  imageUrl: string
}

const SingleImageUpload: React.FC<Props> = () => {
  // 原图片url
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg']

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
    ['4', 'Edge Detection'],
    ['5', 'others: undefined']
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
    // 以下是所有的shader算法操作，在点击button时实现
    if (canvasRef.current) {
      const gl = canvasRef.current.getContext('webgl')
      if (!gl) {
        console.log('WebGL not supported')
        return
      }

      gl.clearColor(1, 1, 1, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      // 在这林选择使用哪一个filter
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

      function handleLoadedTexture(gl: WebGLRenderingContext, texture: WebGLTexture, callback?: () => void) {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
    }
  }, [])

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
              <Menu.Item key='4' onClick={() => setCurrentFilter(edgeDetectFilter)}>
                {filterMap.get('4')}
              </Menu.Item>
              <Menu.Item key='5' onClick={() => setCurrentFilter()}>
                {filterMap.get('5')}
              </Menu.Item>
            </Menu>
          }
        >
          <Typography.Link>
            Hover me to select algorithm <DownOutlined />
          </Typography.Link>
        </Dropdown>
        <Button style={{ float: 'right', marginLeft: '5px' }}>Save</Button>
        <Button type='primary' style={{ float: 'right' }}>
          Apply
        </Button>
      </Card>
    </PageContainer>
  )
}

export default SingleImageUpload
