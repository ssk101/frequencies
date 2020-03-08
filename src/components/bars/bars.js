
import template from './bars.pug'
import styles from './bars.styl'
import mean from 'lodash/mean'

const URL = '/wraith_of_red_hill.mp3'

export class Bars extends HTMLElement {
  constructor() {
    super()
    this.PLAY_STATE = 'unstarted'
    this.styles = styles
    this.template = template()

    this.barThresholds = {
      7: 32,
      6: 64,
      5: 96,
      4: 128,
      3: 160,
      2: 192,
      1: 224,
      0: 256,
    }
  }

  getMaxFrequency(arr) {
    var res = []
    while(arr.length) {
      res.push(mean(arr.splice(0, 4)))
    }
    return res
  }

  attributeChangedCallback(attr, newVal) {
    this[attr] = newVal
  }

  connectedCallback() {
    this.setAttribute('data-state', this.PLAY_STATE)
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.AUDIO_CTX = new AudioContext()
    this.BARS = this.shadowRoot.querySelectorAll('.bars .bar')
    this.AUDIO = new Audio(URL)
    this.ANALYZER = this.AUDIO_CTX.createAnalyser()
    this.ANALYZER.fftSize = 64
    this.FREQUENCY_DATA = new Uint8Array(this.ANALYZER.frequencyBinCount)
    this.PLAY_BUTTON = this.shadowRoot.querySelector('button.play')
    this.PLAY_BUTTON.addEventListener('click', () => this.startOrPause())

    this.AUDIO.addEventListener('canplay', () => {
      this.SOURCE = this.AUDIO_CTX.createMediaElementSource(this.AUDIO)
      this.SOURCE.connect(this.ANALYZER)
      this.ANALYZER.connect(this.AUDIO_CTX.destination)
    })
    this.AUDIO.addEventListener('play', (e) => {
      this.PLAY_STATE = 'playing'
      this.setAttribute('data-state', 'playing')
      this.drawBars()
    })
    this.AUDIO.addEventListener('pause', () => {
      this.PLAY_STATE = 'paused'
      this.setAttribute('data-state', 'paused')
    })
    this.AUDIO.addEventListener('ended', () => {
      this.PLAY_STATE = 'unstarted'
      this.setAttribute('data-state', 'unstarted')
    })
  }
  async startOrPause() {
    await this.AUDIO_CTX.resume()

    if(this.PLAY_STATE !== 'playing') {
      this.AUDIO.play()
    } else {
      this.AUDIO.pause()
    }
    this.PLAY_BUTTON.classList.add('clicked')
    setTimeout(() => this.PLAY_BUTTON.classList.remove('clicked'), 1000)
  }

  drawBars() {
    if(this.PLAY_STATE === 'playing') {
      requestAnimationFrame(() => this.drawBars())
      this.ANALYZER.getByteFrequencyData(this.FREQUENCY_DATA)
      const frequencies = this.getMaxFrequency(Array.from(this.FREQUENCY_DATA), 4)
      console.log(frequencies)
      const bars = this.shadowRoot
        .querySelector('.bars')
        .querySelectorAll('.bar')
      frequencies.forEach((frequency, fIndex) => {
        if(frequency <= this.barThresholds[fIndex]) {
          bars[fIndex].querySelectorAll('.block').forEach((block, bIndex) => {
            if(this.barThresholds[bIndex] <= frequency) {
              block.style.opacity = 1
            } else {
              block.style.opacity = 0
            }
          })
        }
      })
    }
  }
}
