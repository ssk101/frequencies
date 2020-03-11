import * as PIXI from 'pixi.js'
import AudioService from '../../services/audio.js'
import emitter from '../../services/emitter'
import { Component, Template, Attribute } from '@scoutgg/widgets/esm/index.js'
import template from './frequencies.pug'

const THRESHOLDS = {
  0: 250,
  1: 230,
  2: 225,
  3: 210,
  4: 180,
  5: 160,
  6: 75,
  7: 1,
}

@Component('ss')
@Template(template)
@Attribute('url', String)
@Attribute('state', String)
export class Frequencies extends HTMLElement {
  connectedCallback() {
    this.then = Date.now()
    this.startTime = this.then
    this.now = null
    this.elapsed = null
    this.audioService = new AudioService(this.url)

    emitter.subscribe('audio:state', (state) => {
      this.state = state
      this.playButton.classList.add('clicked')
      setTimeout(() => this.playButton.classList.remove('clicked'), 1000)
    })
  }

  get playButton() {
    return this.shadowRoot.querySelector('button.play')
  }
}
