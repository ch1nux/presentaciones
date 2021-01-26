const Marpit = require('@marp-team/marpit').default
const fs = require('fs')

const marpit = new Marpit()

try {
  const PRESENTATION = process.argv.slice(2)
  const FIXED_PATH = `${PRESENTATION}/${PRESENTATION}`

  const theme = fs.readFileSync(`${FIXED_PATH}.css`, 'utf8')
  marpit.themeSet.default = marpit.themeSet.add(theme)

  const markdown = fs.readFileSync(`${FIXED_PATH}.md`).toString()

  const { html, css } = marpit.render(markdown)

  const htmlFile = `
  <!DOCTYPE html>
  <html>
    <body>
    <style>${css}</style>
    ${html}
    </body>
  </html>
  `
  fs.writeFileSync(`${FIXED_PATH}.html`, htmlFile.trim(), 'utf8')

} catch(e) {
  console.error('Error:', e.stack)
}
