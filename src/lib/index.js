global.CACHE = {}

export function attachTemplate(klass) {
  klass.attachShadow({ mode: 'open' })

  const style = document.createElement('style')
  style.innerHTML = klass.styles
  klass.shadowRoot.appendChild(style)

  const template = document.createElement('template')
  template.innerHTML = klass.template
  klass.shadowRoot.appendChild(template.content)
  return klass
}

export function define(klass, attrs = {}) {
  const k = klass.name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  const tag = `ss-${k}`
  customElements.define(tag, klass)
  var component = document.createElement(tag)
  Object.keys(attrs).forEach(attr => {
    component.setAttribute(attr, attrs[attr])
  })
  return attachTemplate(component)
}
