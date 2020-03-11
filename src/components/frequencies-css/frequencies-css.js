import AudioService from '../../services/audio.js'
import emitter from '../../services/emitter'
import { Component, Template, Attribute } from '@scoutgg/widgets/esm/index.js'
import template from './frequencies-css.pug'

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
const FPS = 40
const FPS_INTERVAL = 1000 / FPS

@Component('ss')
@Template(template)
@Attribute('url', String)
@Attribute('state', String)
export class FrequenciesCss extends HTMLElement {
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
      this.drawBars()
    })
  }

  drawBars() {
    if(this.state === 'playing') {
      requestAnimationFrame(() => this.drawBars())
      this.now = Date.now()
      this.elapsed = this.now - this.then

      if(this.elapsed < FPS_INTERVAL) {
        return
      }

      this.then = this.now - (this.elapsed % FPS_INTERVAL)

      this.audioService.analyzer
        .getByteFrequencyData(this.audioService.frequencyData)
      const frequencies = this.audioService
        .getMaxFreq(Array.from(this.audioService.frequencyData), 4)
      frequencies.forEach((frequency, fIndex) => {
        const perc = this.audioService
          .getFreqPerc(frequency, THRESHOLDS[fIndex])
        const blocks = this.bars[fIndex].querySelectorAll('span')
        blocks.forEach((block, bIndex) => {
          const hit = (bIndex + 1) * (100 / blocks.length)
          if(hit <= perc) {
            block.style.opacity = 1
          } else {
            block.style.opacity = 0
          }
        })
      })
    }
  }

  get bars() {
    return this.shadowRoot.querySelectorAll('.bars .bar')
  }

  get playButton() {
    return this.shadowRoot.querySelector('button.play')
  }
}
