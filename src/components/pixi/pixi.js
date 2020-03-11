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
    this.initKeys()
    this.pixi.ticker.add(delta => this.gameLoop(delta))
  }

  gameLoop(delta) {
    this.state(delta)
  }

  play(delta) {
    if(!this.ssky) return
    this.ssky.x += this.ssky.vx
    this.ssky.y += this.ssky.vy
  }

  initKeys() {
    const dirs = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    }
    const [ w, a, s, d ] = Object.keys(dirs)
      .map(d => {
        var key = this.keyboard(dirs[d])
        key.press = () => {
          switch(d) {
            case 'up':
              console.log(this.ssky)
              this.ssky.vy = -5
              this.ssky.vx = 0
              break
            case 'down':
              this.ssky.vy = 5
              this.ssky.vx = 0
              break
            case 'left':
              this.ssky.vx = -5
              this.ssky.vy = 0
              break
            case 'right':
              this.ssky.vx = 5
              this.ssky.vy = 0
              break
          }
        }
        key.release = () => {

        }
        return key
      })
    this.state = this.play
  }

  keyboard(value) {
    // TODO: unsubscribe
    const key = {}
    key.value = value
    key.isDown = false
    key.isUp = true
    key.press = undefined
    key.release = undefined
    key.downHandler = event => {
      if(event.key === key.value) {
        if(key.isUp && key.press) key.press()
        key.isDown = true
        key.isUp = false
        event.preventDefault()
      }
    }

    key.upHandler = event => {
      if(event.key === key.value) {
        if(key.isDown && key.release) key.release()
        key.isDown = false
        key.isUp = true
        event.preventDefault()
      }
    }

    const downListener = key.downHandler.bind(key)
    const upListener = key.upHandler.bind(key)

    window.addEventListener(
      'keydown', downListener, false
    )
    window.addEventListener(
      'keyup', upListener, false
    )

    key.unsubscribe = () => {
      window.removeEventListener('keydown', downListener)
      window.removeEventListener('keyup', upListener)
    }

    return key
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
        this.ssky = new PIXI.Sprite(
          this.pixi.loader.resources['ssky_static.png'].texture
        )
        this.ssky.x = 500
        this.ssky.y = 500
        this.ssky.vx = 0
        this.ssky.vy = 0
        this.pixi.stage.addChild(grid)
        this.pixi.stage.addChild(this.ssky)
      })
  }

  resize() {
    this.pixi.renderer.resize(this.clientWidth, this.clientHeight)
  }
}
