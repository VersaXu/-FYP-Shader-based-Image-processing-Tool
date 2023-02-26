import {
  createProgram,
  createShader,
  setRectangle,
  setBuffer,
  set2DTexture,
  getAttrib
} from '../../../utils/shaderUtils'
import { noFilter } from '../../../utils/shaderFilter'

/*-------------  create canva's context  -------------------------*/

// get  2d canva's context.
const imgContainer = document.getElementById('sourceImg')
const ctx = imgContainer.getContext('2d')
const image = new Image()
// 这个地方应该使用react state hooks 来取代
image.src = '../../../assets/images/logo.png'

// get WebGL canvas context
const canvas = document.getElementById('resultImg')
const gl = canvas.getContext('webgl')

console.log('TEST 0', image)

/*----------------  drawing image to canvas  ----------------------*/

// when image is loaded draw image and set image as texture of an retangle
image.onload = function () {
  /*  2D canvas context  */
  // draws image in the sourseImg canvas
  imgContainer.width = image.width
  imgContainer.height = image.height
  ctx.drawImage(image, 0, 0)

  // add mouse click event to show a pixel color
  imgContainer.addEventListener('click', function (e) {
    let mouseX, mouseY

    mouseX = e.clientX - imgContainer.offsetLeft
    mouseY = e.clientY - imgContainer.offsetTop
    let color = ctx.getImageData(mouseX, mouseY, 1, 1).data
    console.log(`${mouseX},${mouseY}: ${color}`)
  })

  /*  WebGL canvas context  */

  // create shader from source SOURCE!!
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, noFilter.vs)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, noFilter.fs)

  // create shading program PROGRAM!!
  const program = createProgram(gl, vertexShader, fragmentShader)
  gl.useProgram(program)

  /* create buffers and send data into buffers */

  // set up vertex position buffer
  const positionCoord = setRectangle(0, 0, image.width, image.height)
  const positionBuffer = setBuffer(gl, positionCoord)
  // set up texture coordinate buffer
  const textureCoord = setRectangle(0, 0, 1, 1)
  const texcoordBuffer = setBuffer(gl, textureCoord)
  // set up texture buffer
  set2DTexture(gl, image)

  /* draw textured retangle to WebGL canvas */
  if (image.width != gl.canvas.width || image.height != gl.canvas.height) {
    gl.canvas.width = image.width
    gl.canvas.height = image.height
  }

  // init WebGL
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(1.0, 1.0, 1.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // enable all atributes and uniform that program used
  const Layout = {
    size: 2,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offsetPointer: 0
  }
  // get vertex attributes
  getAttrib(gl, program, 'a_position', positionBuffer, Layout)
  getAttrib(gl, program, 'a_texCoord', texcoordBuffer, Layout)

  // get uniform UNIFORM!!!
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)

  // draw image
  const primitiveType = gl.TRIANGLES
  const offset = 0
  const count = 6
  gl.drawArrays(primitiveType, offset, count)
}

// select input image
const imgFile = document.getElementById('imgFile')
console.log('TEST 1', imgFile)
imgFile.onchange = function () {
  let reader = new FileReader()
  reader.addEventListener(
    'load',
    function () {
      image.src = reader.result
    },
    false
  )

  if (imgFile) {
    reader.readAsDataURL(imgFile.files[0])
  }
}
