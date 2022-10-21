const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000

express()
	.use(express.static(path.join(__dirname, 'archive')))
	.use('/image', express.static(path.join(__dirname, 'image')))
	.use('/dist', express.static(path.join(__dirname, 'node_modules/reveal.js/dist')))
	.use('/plugin', express.static(path.join(__dirname, 'node_modules/reveal.js/plugin')))
	.set('views', path.join(__dirname, 'view'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('index'))
	.get('/cool', (req, res) => res.send(cool()))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))

