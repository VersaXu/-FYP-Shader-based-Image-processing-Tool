/**
 * @fileoverview This is a simple API for image porcessing using webgl shaders.
 * @version 1.0.0
 * @author king Lei
 * @license MIT
 */

/**
 * WebGL shader utility module.
 * @module shaderUtil
 */

/**
 * Creates and compiles a WebGL shader.
 * @param {WebGLRenderingContext} gl - The webGL rendering context object.
 * @param {number} type - Type of shader that you want to create, can be gl.VERTEX_SHADER or gl.FRAGMENT_SHADER.
 * @param {string} source - Shader source code using GLSL shading language.
 * @returns {WebGLShader} shader - Return a WebGL shader object.
 */
export function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  let isSuccess = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (isSuccess) {
    return shader
  }

  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

/**
 * Links vertex shader and fragment shader and creates a hading program.
 * @param {WebGLRenderingContext} gl - The webGL rendering context object.
 * @param {WebGLShader} vertexShader - webGL vertexshader obj.
 * @param {WebGLShader} fragmentShader - WebGL fragmentshader obj.
 * @returns {WebGLProgram} program - a shading program.
 */
export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  let isSuccess = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (isSuccess) {
    return program
  }

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

/**
 * setup  a WebGL buffer using custom data.
 * @param {WebGLRenderingContext} gl - The webGL rendering context object.
 * @param {TypedArray} attribData - The source data array that will be copied into buffer.
 * @param {GLenum} [usage=gl.STATIC_DRAW] - specifying the usage pattern of the data store.
 * @returns {WebGLBuffer} attribBuffer- a WebGLBuffer that will be used to draw the scene.
 */
export function setBuffer(gl, attribData, usage = gl.STATIC_DRAW) {
  const attribBuffer = gl.createBuffer()
  if (attribBuffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, attribData, usage)
    return attribBuffer
  }
  console.log('EER: fail to create buffer !')
}

/**
 *  <h2>Set up a 2D WebGL texture.<h2>
 * @param {WebGLRenderingContext} gl - The webGL rendering context object.
 * @param {HTMLImageElement} image -  The texture image.
 */
export function set2DTexture(gl, image) {
  const texture = gl.createTexture()
  if (texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  }
}

/**
 *
 * @param {WebGLRenderingContext} gl - The webGL rendering context object.
 * @param {WebGLProgram} program- The WebGL program object that will be used to draw a scene.
 * @param {string} attribName - The attrib variable name in the shader source string.
 * @param {WebGLBuffer} attribBuffer - The WebGL buffer object that you want to bind to this attribute variable.
 * @param {object} attribuLayout - The layout that the data store into the attribute buffer.<br>
 *
 */
export function getAttrib(gl, program, attribName, attribBuffer, attribuLayout) {
  const attribuLocation = gl.getAttribLocation(program, attribName)
  gl.enableVertexAttribArray(attribuLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer)
  gl.vertexAttribPointer(
    attribuLocation,
    attribuLayout.size,
    attribuLayout.type,
    attribuLayout.normalize,
    attribuLayout.stride,
    attribuLayout.offsetPointer
  )
}

/**
 * create a rectangle and sent the vertex  into vertex buffeer
 * @param {number} x - The minima x coordinate of the retangle.
 * @param {number} y - The minima y coordinate of the retangle.
 * @param {number} width - The width of the retangle.
 * @param {number} height - The height of the retangle.
 */
export function setRectangle(x = 0, y = 0, width = 128, height = 128) {
  let x1 = x
  let x2 = x + width
  let y1 = y
  let y2 = y + height
  const vertexCoord = new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2])
  return vertexCoord
}
