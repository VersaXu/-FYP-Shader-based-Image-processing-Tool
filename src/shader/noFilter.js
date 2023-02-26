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
