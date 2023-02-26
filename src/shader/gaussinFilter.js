/**
 * @fileoverview This is a simple API for image porcessing using webgl shaders.
 * @version 1.0.0
 * @author king Lei
 * @license MIT
 */

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
