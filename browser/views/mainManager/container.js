'use strict'

const FileSection = require('./fileSection')
const HamburgerMenu = require('../../components/hamburgerMenu/menu')
const styles = require('./styles/container')
const UtilityButton = require('../../components/utilityButton')
const WalletInfo = require('./walletInfo')
const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

class Container extends Nanocomponent {
	constructor({
		files,
		walletInfo
	}) {
		super()

		this.state = {
			files,
			walletInfo
		}

		this.children = {
			closeButton: new UtilityButton({ children: '✕' }),
			menuButton: new HamburgerMenu({ items: [
        { children: 'File Manager' },
        { children: 'Publish File' },
        { children: 'Log Out' },
        { children: 'Quit' }
			]}),
			wallet: new WalletInfo(walletInfo),
			fileSection: new FileSection({ files })
		}
	}

	update() {
		return true
	}

	createElement() {
		const { children, state } = this
		return html`
			<div class="${styles.container} MainManagerView-container">
        <div class="${styles.horizontalContainer} MainManagerView-horizontalContainer">
          ${children.menuButton.render({})}
					<div class="${styles.header} MainManagerView-header">
						LTLSTR
					</div>
          ${children.closeButton.render({})}
				</div>

				<div class="${styles.subHeader} ${styles.bottomAlign} MainManagerView-subHeader,bottomAlign">
					Wallet
				</div>
				${children.wallet.render(state.walletInfo)}
				${children.fileSection.render({ files: state.files })}
			</div>
		`
	}
}

module.exports = Container