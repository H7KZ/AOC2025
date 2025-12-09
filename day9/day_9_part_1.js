const fs = require('fs');

const benchmark = performance.now();

const fileInput = fs.readFileSync('./day_9_input', 'utf-8')
const tiles = fileInput
    .trim()
    .split('\n')
    .map((line) => {
        const [x, y] = line.split(',').map(Number)
        return { x, y }
    })

let largestRectangle = 0

for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i]
    const { x, y } = tile

    for (let j = i + 1; j < tiles.length; j++) {
        const otherTile = tiles[j]
        if (tile === otherTile) continue

        const { x: x2, y: y2 } = otherTile

        const width = Math.abs(x2 - x) + 1
        const height = Math.abs(y2 - y) + 1

        const area = width * height
        if (area > largestRectangle) {
            largestRectangle = area
        }
    }
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Largest possible rectangle: " + largestRectangle)
