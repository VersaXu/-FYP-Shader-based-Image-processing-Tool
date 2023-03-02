import { type } from 'os'

export type filter = {
  vs: string
  fs: string
}
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
export const noFilter: filter = {
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
export const edgeDetectFilter: filter = {
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
export const gaussinFilter_3: filter = {
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

/**
 * The image filters that use WebGL shader implement.
 * @modu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   type {object}
 */
export const gaussinFilter_5: filter = {
  // vertex shader
  vs: `
        attribute vec2 position;
        varying vec2 texCoord;
  
        void main() {
                gl_Position = vec4(position, 0, 1);
                texCoord = vec2(position.x * 0.5 + 0.5, 1.0 - (position.y * 0.5 + 0.5));
        }
  
          `,

  // fragment shader 里面做kernel，矩阵点乘
  fs: `
        
  precision highp float;

  uniform sampler2D texture;
  uniform vec2 texelSize;
  
  varying vec2 texCoord;
  
  void main() {
    vec2 offset = texelSize * 2.0;
    vec4 color = vec4(0.0);
  
    for (int i = -2; i <= 2; i++) {
      for (int j = -2; j <= 2; j++) {
        vec2 sampleCoord = texCoord + vec2(float(i), float(j)) * texelSize;
        vec4 sampleColor = texture2D(texture, sampleCoord);
  
        float weight = 0.0;
  
        if (i == 0 && j == 0) {
          weight = 0.2195;
        } else if (i == 0 || j == 0) {
          weight = 0.1125;
        } else {
          weight = 0.0540;
        }
  
        color += sampleColor * weight;
      }
    }
  
    gl_FragColor = color;
  }
  

        `
}
/**
 * The image filter find the horizontal edge.
 * @modu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   type {object}
 */
export const Sobel_x: filter = {
  // vertex shader
  vs: `
  attribute vec4 a_Position;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  
  void main() {
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
  }
  
          `,

  // fragment shader 里面做kernel，矩阵点乘
  fs: `
        
  precision mediump float;

uniform sampler2D u_Texture;
varying vec2 v_TexCoord;
uniform vec2 u_TextureSize;

void main() {
    float kernel[9];
    kernel[0] = -1.0; kernel[1] = -2.0; kernel[2] = -1.0;
    kernel[3] = 0.0; kernel[4] = 0.0; kernel[5] = 0.0;
    kernel[6] = -1.0; kernel[7] = -2.0; kernel[8] = -1.0;

    vec2 texelSize = vec2(1.0 / u_TextureSize.x, 1.0 / u_TextureSize.y);
    vec3 pixel = vec3(0.0);

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            vec2 offset = vec2(float(i - 1), float(j - 1)) * texelSize;
            pixel += texture2D(u_Texture, v_TexCoord + offset).rgb * kernel[i * 3 + j];
        }
    }

    gl_FragColor = vec4(vec3(length(pixel)), 1.0);
}

        `
}

/**
 * The image filter find the vertical edge.
 * @modu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   type {object}
 */
export const Sobel_y: filter = {
  // vertex shader
  vs: `
  attribute vec4 a_Position;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  
  void main() {
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
  }
  
          `,

  // fragment shader 里面做kernel，矩阵点乘
  fs: `
        
  precision mediump float;

uniform sampler2D u_Texture;
varying vec2 v_TexCoord;
uniform vec2 u_TextureSize;

void main() {
    float kernel[9];
    kernel[0] = -1.0; kernel[1] = 0.0; kernel[2] = 1.0;
    kernel[3] = -2.0; kernel[4] = 0.0; kernel[5] = 2.0;
    kernel[6] = -1.0; kernel[7] = 0.0; kernel[8] = 1.0;

    vec2 texelSize = vec2(1.0 / u_TextureSize.x, 1.0 / u_TextureSize.y);
    vec3 pixel = vec3(0.0);

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            vec2 offset = vec2(float(i - 1), float(j - 1)) * texelSize;
            pixel += texture2D(u_Texture, v_TexCoord + offset).rgb * kernel[i * 3 + j];
        }
    }

    gl_FragColor = vec4(vec3(length(pixel)), 1.0);
}

        `
}
