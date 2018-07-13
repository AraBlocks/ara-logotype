'use strict'

const Header = require('./header')
const Section = require('./section')
const styles = require('./styles/container')
const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

class Container extends Nanocomponent {
  constructor({
    userData,
    files
  }) {
    super()

    this.state = {
      activeTab: 0,
      files
    }

    this.children = {
      header: new Header({
        ...userData,
        parentRerender: this.rerender.bind(this),
        parentState: this.state,
       }),

      publishedSection: new Section({
        files,
        type: 'published'
      }),

      purchasedSection: new Section({
        files,
        type: 'purchased'
      })
    }
  }

  update(){
    return true
  }

  createElement() {
    const {
      children,
      props,
      state: { activeTab, files }
    } = this

    Object.assign(window, { container: this })
    return html`
      <div class="${styles.container} container-container">
        <div>
          ${children.header.render({
            activeTab
           })}
          ${renderSections().map(section => section.render({ files }))}
        </div>
      </div>
    `

    function renderSections() {
      let sections = []
      switch (activeTab) {
        case 0:
          sections.push(children.publishedSection, children.purchasedSection)
          break
        case 1:
          sections.push(children.publishedSection)
          break
        default:
          sections.push(children.purchasedSection)
      }
      return sections
    }
  }
}

module.exports = Container