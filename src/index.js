let template = require('./templates/index.twig')
let html = template({
  title: 'Front Page'
})

document.write(html)
