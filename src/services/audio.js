import mean from 'lodash/mean'
import emitter from './emitter'

window.AudioContext = window.AudioContext || window.webkitAudioContext

export default class AudioService {
  constructor(url) {
    this.audio = new Audio(url)
    this.audioCtx = new AudioContext()
    this.analyzer = this.audioCtx.createAnalyser()
    this.analyzer.fftSize = 64
    this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount)
    this.addListeners()
  }

  addListeners() {
    this.audio.addEventListener('canplay', () => {
      this.source = this.audioCtx.createMediaElementSource(this.audio)
      this.source.connect(this.analyzer)
      this.analyzer.connect(this.audioCtx.destination)
    })

    this.audio.addEventListener('play', (e) => {
      this.state = 'playing'
      emitter.emit('audio:state', this.state)
    })

    this.audio.addEventListener('pause', () => {
      this.state = 'paused'
      emitter.emit('audio:state', this.state)
    })

    this.audio.addEventListener('ended', () => {
      this.state = null
      emitter.emit('audio:state', this.state)
    })
  }

  togglePlay() {
    this.audioCtx.resume()

    if(this.state !== 'playing') {
      this.audio.play()
    } else {
      this.audio.pause()
    }
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
}
