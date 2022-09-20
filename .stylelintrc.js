/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// stylelint configuration
// https://stylelint.io/user-guide/configuration/
module.exports = {
  // The standard config based on a handful of CSS style guides
  // https://github.com/stylelint/stylelint-config-standard
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],

  plugins: [
    // stylelint plugin to sort CSS rules content with specified order
    // https://github.com/hudochenkov/stylelint-order
    'stylelint-order'
  ],

  rules: {
    // "color-hex-case": "lower", // 颜色值为小写字母(stylelint-config-standard)
    // "color-no-invalid-hex": true, // 颜色值不能为无效值(stylelint-config-standard)
    'font-family-name-quotes': 'always-where-recommended', // 字体系列中命名时带引号
    'function-url-quotes': 'always', // 地址一定要写引号
    // "number-leading-zero": "never", // 要求或分数低于1的数字禁止前导零
    'number-no-trailing-zeros': true, // 禁止在数量尾随零
    'string-quotes': 'single', // 指定字串，单引号
    'length-zero-no-unit': true, // 禁止单位零长度。
    // "value-list-comma-newline-after": "always-multi-line",// 在值列表的逗号后指定一个换行符或禁止留有空格
    'shorthand-property-no-redundant-values': true, // 不允许在简写属性冗余值
    // "property-case": "lower", // 为属性指定小写(stylelint-config-standard)
    'keyframe-declaration-no-important': true, // 不允许!important在关键帧声明
    // "block-closing-brace-empty-line-before": "never", // 不允许关闭括号前空一行(stylelint-config-standard)
    // "block-closing-brace-newline-after": "always", // 需要一个换行符关闭括号后的空白(stylelint-config-standard)
    // "block-opening-brace-newline-after": "always-multi-line", // 开括号的块之后需要新的一行(stylelint-config-standard)
    // "selector-class-pattern": "^[a-z]+([a-z0-9]?|[a-z0-9\\-\\_]*[a-z0-9])$", // 指定一个模式类选择符，限制选择器名称写法
    'selector-id-pattern': '^[a-z]+([a-z0-9]?|[a-z0-9\\-\\_]*[a-z0-9])$', // 指定一个模式，id选择器，限制选择器名称写法
    // "value-keyword-case": "lower", // 属性值小写
    'no-empty-source': null, // 不允许空的来源
    'alpha-value-notation': null,
    'color-function-notation': null,
    'at-rule-no-unknown': null, // 不允许at-rules不明
    // "indentation": 2, // 指定缩进(stylelint-config-standard)
    'max-nesting-depth': 5, // 允许嵌套的深度为5
    'no-duplicate-selectors': true, // 不允许重复的选择器
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'selector-class-pattern': null,
    'declaration-block-trailing-semicolon': null,
    'rule-empty-line-before': null, //不校验不同css类之间是否空一行
    // "no-eol-whitespace": true, // 不允许行尾空白(stylelint-config-standard)
    "no-invalid-double-slash-comments": null, // 不允许双斜杠注释(/ /…)不支持CSS(stylelint-config-standard)
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          // CSS Modules composition
          // https://github.com/css-modules/css-modules#composition
          'composes'
        ]
      }
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          // CSS Modules :global scope
          // https://github.com/css-modules/css-modules#exceptions
          'global',
          'local'
        ]
      }
    ],

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
    'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],

    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'content',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak'
    ]
  }
}
