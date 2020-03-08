
import template from './bars.pug'
import styles from './bars.styl'
import mean from 'lodash/mean'

const URL = 'wraith_of_red_hill.mp3'
const FPS = 40

export class Bars extends HTMLElement {
  constructor() {
    super()
    this.PLAY_STATE = 'unstarted'
    this.styles = styles
    this.template = template()

    this.thresholds = {
      0: 250,
      1: 230,
      2: 225,
      3: 210,
      4: 180,
      5: 160,
      6: 75,
      7: 1,
    }

    this.fpsInterval = 1000 / FPS
    this.then = Date.now()
    this.startTime = this.then
    this.now = null
    this.elapsed = null
  }

  getFreqPerc(freq, max, min = 0) {
    return ((freq - min) / (max - min)) * 100
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
    this.bars = this.shadowRoot.querySelectorAll('.bars .bar')
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
    this.AUDIO_CTX.resume()

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
      this.now = Date.now()
      this.elapsed = this.now - this.then

      if(this.elapsed < this.fpsInterval) {
        return
      }

      this.then = this.now - (this.elapsed % this.fpsInterval)

      this.ANALYZER.getByteFrequencyData(this.FREQUENCY_DATA)
      const frequencies = this.getMaxFrequency(Array.from(this.FREQUENCY_DATA), 4)
      frequencies.forEach((frequency, fIndex) => {
        var perc = this.getFreqPerc(frequency, this.thresholds[fIndex])
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
