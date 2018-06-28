'use strict'

const { colors, fonts } = require('../../lib/styles')
const { css } = require('../../lib/cssTool/css')

module.exports = {
  colors,
  fonts,

  header: css`
    :host {
      display: flex;
      font-family: ${fonts.bold};
      font-size: 20px;
      width: 90%;
    }
  `,

  description: css`
    :host {
      font-family: ${fonts.light};
      font-size: 12px;
      width: 90%;
    }
  `,

  registerForm: css`
    :host {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 120px;
      justify-content: space-between;
      width: 100%;
    }
  `
}