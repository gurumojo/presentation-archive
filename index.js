const { exec } = require('child_process')
const { cp } = require('fs')
const { resolve } = require('path')

let img = resolve(__dirname, 'images')
let igx = resolve(__dirname, 'node_modules/reveal.js/images')
let src = resolve(__dirname, 'archive')
let dst = resolve(__dirname, 'node_modules/reveal.js')

function copy() {
	cp(img, igx, { recursive: true }, (error, ...args) => {
		console.log({ args, error, img, igx })
	})
	cp(src, dst, { recursive: true }, (error, ...args) => {
		console.log({ args, error, dst, src })
	})
}

exec('npm ci', (error, stdout, stderr) => {
  if (error) {
    console.error(error)
    return
  }
  console.error(stderr)
  console.log(stdout)
  console.log()
  console.log('...')

  copy()

  process.chdir(dst)
  console.log(process.cwd())

  exec('npm i', (error, stdout, stderr) => {
    if (error) {
      console.error(error)
      return
    }
    console.error(stderr)
    console.log(stdout)

    // npm start -- --port=8001
    exec('npm start', (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        return
      }
      console.error(stderr)
      console.log(stdout)
    })
  })
})

