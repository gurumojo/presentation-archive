const cool = require('cool-ascii-faces')
const express = require('express')
const { join } = require('path')
const { readdir } = require('fs')

const PORT = process.env.PORT || 8000

const files = []

readdir(join(__dirname, 'image'), { withFileTypes: true }, (error, array) => {
	files.push(...array)
})


express()
	.use(express.static(join(__dirname, 'archive')))
	.use('/image', express.static(join(__dirname, 'image')))
	.use('/chart', express.static(join(__dirname, 'node_modules/plotly.js-dist')))
	.use('/dist', express.static(join(__dirname, 'node_modules/reveal.js/dist')))
	.use('/plugin', express.static(join(__dirname, 'node_modules/reveal.js/plugin')))
	.set('etag', false)
	.set('powered-by', false)
	.set('views', join(__dirname, 'view'))
	.set('view engine', 'ejs')
	.get('/cool', (request, response) => response.send(cool()))
	.get('*', (request, response) => response.render('index', { files }))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))

