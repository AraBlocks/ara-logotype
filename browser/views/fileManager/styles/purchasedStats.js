'use strict'

const { colors, fonts } = require('styleUtils')
const { css } = require('css')

module.exports = {
  buttonHolder: css`
    :host {
      width: 100%;
    }

    :host button {
      text-align: right;
      width: 100%;
    }
  `,

  container: css`
    :host {
      display: flex;
      flex-direction: column;
      height: 75px;
      width: 50%;
    }
  `,

  divider: css`
    :host {
      font-size: 14px;
      font-family: ${fonts.regular};
      margin: 0 8px;
    }
  `,

  earnings(status) {
    return css`
      :host {
        color: ${status === 2 ? 'black' : colors.araGrey};
        font-family: ${fonts.regular};
        font-size: 14px;
      }
    `
  },

  peers: css`
    :host {
      font-family: ${fonts.regular};
      font-size: 14px;
    }
  `,

  stats: css`
    :host {
      display: flex;
      justify-content: flex-end;
    }
  `
}