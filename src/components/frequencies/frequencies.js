import { Component, Template, Attribute } from '@scoutgg/widgets/esm/index.js'
import template from './frequencies.pug'
import mean from 'lodash/mean'

window.AudioContext = window.AudioContext || window.webkitAudioContext
const FPS = 40
const FPS_INTERVAL = 1000 / FPS
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
@Attribute('state', String)
@Attribute('url', String)
export class Frequencies extends HTMLElement {
  attributeChangedCallback(attr, newVal) { }

  connectedCallback() {
    this.then = Date.now()
    this.startTime = this.then
    this.now = null
    this.elapsed = null
    this.createAudio()
    this.setListeners()
  }

  createAudio() {
    this.audio = new Audio(this.url)
    this.audioCtx = new AudioContext()
    this.analyzer = this.audioCtx.createAnalyser()
    this.analyzer.fftSize = 64
    this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount)
  }

  get bars() {
    return this.shadowRoot.querySelectorAll('.bars .bar')
  }

  get playButton() {
    return this.shadowRoot.querySelector('button.play')
  }

  setListeners() {
    this.audio.addEventListener('canplay', () => {
      this.source = this.audioCtx.createMediaElementSource(this.audio)
      this.source.connect(this.analyzer)
      this.analyzer.connect(this.audioCtx.destination)
    })

    this.audio.addEventListener('play', (e) => {
      this.state = 'playing'
      this.drawBars()
    })

    this.audio.addEventListener('pause', () => {
      this.state = 'paused'
    })

    this.audio.addEventListener('ended', () => {
      this.state = 'unstarted'
    })
  }

  getFreqPerc(freq, max, min = 0) {
    return ((freq - min) / (max - min)) * 100
  }

  getMaxFreq(arr) {
    var res = []
    while(arr.length) {
      res.push(mean(arr.splice(0, 4)))
    }
    return res
  }

  startOrPause() {
    this.audioCtx.resume()

    if(this.state !== 'playing') {
      this.audio.play()
    } else {
      this.audio.pause()
    }
    this.playButton.classList.add('clicked')
    setTimeout(() => this.playButton.classList.remove('clicked'), 1000)
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

      this.analyzer.getByteFrequencyData(this.frequencyData)
      const frequencies = this.getMaxFreq(Array.from(this.frequencyData), 4)
      frequencies.forEach((frequency, fIndex) => {
        const perc = this.getFreqPerc(frequency, THRESHOLDS[fIndex])
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
}
