import * as vdom from 'virtual-dom'
import { bootstrap } from '@scoutgg/widgets/esm/index.js'
import { vdom as renderer } from '@scoutgg/widgets/esm/renderers/vdom.js'
import './components/frequencies/frequencies'

bootstrap([
  renderer(vdom),
])
