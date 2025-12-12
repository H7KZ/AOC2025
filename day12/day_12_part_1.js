const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_12_input_test', 'utf-8')
const fileInputs = fileInput.trim().split('\r\n\r\n')

/**
 * @type {Record<number, string[][]>}
 */
const shapes = fileInputs
    .slice(0, fileInputs.length - 1)
    .map((line) => {
        const shape = line.split('\n').map(l => l.trim())

        return {
            index: Number(shape[0].split(':')[0].trim()),
            shape: shape.slice(1).map(l => l.split(''))
        }
    })
    .reduce((acc, curr) => {
        acc[curr.index] = curr.shape
        return acc
    }, {})

/**
 * @type {{width: number; height: number; shapes: number[]}[]}
 */
const regions = fileInputs
    .slice(fileInputs.length - 1)[0]
    .split('\n')
    .map((line) => {
        const [width, height] = line.split(':')[0].trim().split('x')
        const shapes = line.split(':')[1].trim().split(' ').map(Number)

        return {
            width: Number(width),
            height: Number(height),
            shapes: shapes
        }
    })

console.log(shapes)
console.log(regions)

let validRegions = 0

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Valid size regions: " + validRegions)
