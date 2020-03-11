import * as vdom from 'virtual-dom'
import { bootstrap } from '@scoutgg/widgets/esm/index.js'
import { vdom as renderer } from '@scoutgg/widgets/esm/renderers/vdom.js'
import styles from './styles.json'
import { json2CSS } from './services/json-to-css.js'
import './components/frequencies/frequencies'
import './components/frequencies-css/frequencies-css'

bootstrap([
  renderer(vdom),
])

const css = json2CSS(styles)
var style = document.createElement('style')
style.type = 'text/css'
style.appendChild(document.createTextNode(css))
document.body.appendChild(style)
