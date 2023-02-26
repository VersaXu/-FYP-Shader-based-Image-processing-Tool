/**
 * @fileoverview This is a simple API for image porcessing using webgl shaders.
 * @version 1.0.0
 * @author king Lei
 * @license MIT
 */

/**
 * The image filters that use WebGL shader implement.
 * @module noFilter
 */

/**
 * This filter just draw a origen image again and do nothing.
 * @constant
 * @type {object}
 */
export const noFilter = {
  // vertex shader
  vs: `
          attribute vec2 a_position;
          attribute vec2 a_texCoord;
          uniform vec2 u_resolution;
      
          varying vec2 v_texCoord;
  
  
          void main() {
              vec2 zeroToOne = a_position / u_resolution;
              vec2 zeroToTwo = zeroToOne * 2.0;
              vec2 clipSpace = zeroToTwo -1.0;
              gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
              v_texCoord = a_texCoord;
          }`,

  // fragment shader 里面做kernel，矩阵点乘
  fs: `
          precision mediump float;
      
          uniform sampler2D u_image;
          varying vec2 v_texCoord;
          
          void main(){
              gl_FragColor = texture2D(u_image, v_texCoord);
      }`
}

/**
 * The image filters that use WebGL shader implement.
 * @module edgeDetectFilter
 */

/**
 * This filter detect the edges of the image.
 * @constant
 * @type {object}
 */
export const edgeDetectFilter = {
  // vertex shader
  vs: `
          attribute vec2 position;
          varying vec2 v_coord;
  
          void main() {
                  gl_Position = vec4(position, 0, 1);
                  v_coord = gl_Position.xy * 0.5 + 0.5;
          }`,

  // fragment shader 里面做kernel，矩阵点乘
  fs: `
          precision mediump float;
          varying vec2 v_coord;
          uniform vec2 imageResolution;
          uniform sampler2D u_texture;
    
          void main() {
          vec2 pos = vec2(v_coord.x, 1.0 - v_coord.y);
          vec2 onePixel = vec2(1, 1) / imageResolution;
          vec4 color = vec4(0);
          mat3 edgeDetectionKernel = mat3(
                  -1, -1, -1,
                  -1, 8, -1,
                  -1, -1, -1
          );
          for(int i = 0; i < 3; i++) {
                  for(int j = 0; j < 3; j++) {
                          vec2 samplePos = pos + vec2(i - 1 , j - 1) * onePixel;
                          vec4 sampleColor = texture2D(u_texture, samplePos);
  
                          sampleColor *= edgeDetectionKernel[i][j];
                          color += sampleColor;
                  }
          }
          color.a = 1.0;
          gl_FragColor = color;
          }`
}

/**
 * The image filters that use WebGL shader implement.
 * @module gaussinFilter
 */

/**
 * This filter apply 3*3 Gaussin blur on the image.
 * @constant
 * @type {object}
 */
export const gaussinFilter = {
  // vertex shader
  vs: `
          attribute vec2 position;
          varying vec2 texCoord;
    
          void main() {
              gl_Position = vec4(position, 0.0, 1.0);
              texCoord = position * 0.5 + 0.5;
          }
    `,

  // fragment shader 里面做kernel，矩阵点乘
  fs: `
      precision mediump float;
  
      varying vec2 texCoord;
      uniform sampler2D texture;
      uniform vec2 texelSize;
    
      void main() {
          vec4 color =
          texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y) + vec2(-1.0, -1.0) * texelSize) * 0.077847
          + texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y) + vec2(0.0, -1.0) * texelSize) * 0.123317
          + texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y) + vec2(1.0, -1.0) * texelSize) * 0.077847
          + texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y) + vec2(-1.0, 0.0) * texelSize) * 0.123317
          + texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y)) * 0.195346
          + texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y) + vec2(1.0, 0.0) * texelSize) * 0.123317
          + texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y) + vec2(-1.0, 1.0) * texelSize) * 0.077847
          + texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y) + vec2(0.0, 1.0) * texelSize) * 0.123317
          + texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y) + vec2(1.0, 1.0) * texelSize) * 0.077847;
      
          gl_FragColor = color;
      }
    
      `
}
