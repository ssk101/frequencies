import * as PIXI from 'pixi.js'
import { Component, Template, Attribute } from '@scoutgg/widgets/esm/index.js'
import template from './pixi.pug'

@Component('ss')
@Attribute('colors', Object)
@Template(template)
export class Pixi extends HTMLElement {
  connectedCallback() {
    this.pixi = new PIXI.Application({
      autoResize: true,
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio,
    })

    this.parsedColors = JSON.parse(this.colors)

    const observer = new MutationObserver((list, o) => {
      const frame = list.map(mr => Array.from(mr.addedNodes))
        ?.flat()
        ?.find(n => n.id === 'frame')
      if(!Array.from(frame?.childNodes || [])
        .find(n => n.tagName === 'CANVAS')) {
        frame.appendChild(this.pixi.view)
        this.resize()
      }
    })

    observer.observe(this.shadowRoot, { childList: true })
    window.addEventListener('resize', () => this.resize())

    this.drawScene()
  }

  drawScene() {
    const colors = JSON.parse(this.colors)
    this.pixi.renderer.backgroundColor = colors.background

    this.pixi.loader
      .add('bg_grid_static.png')
      .add('ssky_static.png')
      .load(() => {
        const grid = new PIXI.Sprite(
          this.pixi.loader.resources['bg_grid_static.png'].texture
        )
        const ssky = new PIXI.Sprite(
          this.pixi.loader.resources['ssky_static.png'].texture
        )
        ssky.x = this.clientWidth / 2
        ssky.y = this.clientHeight / 2
        this.pixi.stage.addChild(grid)
        this.pixi.stage.addChild(ssky)
      })
  }

  resize() {
    this.pixi.renderer.resize(this.clientWidth, this.clientHeight)
  }
}
