import { define } from './lib'
import { Frequencies } from './components/frequencies/frequencies'

document.body.querySelector('main')
  .appendChild(define(Frequencies, {
    state: 'unstarted',
    url: 'wraith_of_red_hill.mp3',
  }))
