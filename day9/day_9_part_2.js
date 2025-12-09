const fs = require('fs');

const benchmark = performance.now();

const fileInput = fs.readFileSync('./day_9_input_test', 'utf-8')
const tiles = fileInput
    .trim()
    .split('\n')
    .map((line) => {
        const [x, y] = line.split(',').map(Number)
        return { x, y }
    })

const tileBox = []

// first get the lowest most left tile
// then take the next one right, if there is no right then take the next one down
// if not then take the next one up
// if there is no right, down or up take the next one left
// repeat until all of the tiles are connected in a one large box
// take into account that there are gaps between the tiles
// and also to do not connect tiles that are not adjacent to each other by horizontal or vertical lines
// also do not connect already connected tiles except for the first tile

for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i]
    // find the lowest most left tile
    if (i === 0) {
        tileBox.push(tile)
        tiles.splice(i, 1)
        i--
        continue
    }

    const lastTile = tileBox[tileBox.length - 1]

    // check right
    if (tile.y === lastTile.y && tile.x > lastTile.x) {
        tileBox.push(tile)
        tiles.splice(i, 1)
        i--
        continue
    }

    // check down
    if (tile.x === lastTile.x && tile.y > lastTile.y) {
        tileBox.push(tile)
        tiles.splice(i, 1)
        i--
        continue
    }

    // check up
    if (tile.x === lastTile.x && tile.y < lastTile.y) {
        tileBox.push(tile)
        tiles.splice(i, 1)
        i--
        continue
    }

    // check left
    if (tile.y === lastTile.y && tile.x < lastTile.x) {
        tileBox.push(tile)
        tiles.splice(i, 1)
        i--
        continue
    }
}

console.log(tileBox)

// now we have a tileBox with all of the tiles connected in a one large box
// we can now find the largest rectangle that can be formed within the tileBox
// by finding the min and max x and y coordinates of the tiles in the tileBox

let minX = Infinity
let maxX = -Infinity
let minY = Infinity
let maxY = -Infinity

for (const tile of tileBox) {
    if (tile.x < minX) minX = tile.x
    if (tile.x > maxX) maxX = tile.x
    if (tile.y < minY) minY = tile.y
    if (tile.y > maxY) maxY = tile.y
}

const width = maxX - minX + 1
const height = maxY - minY + 1

const largestRectangle = width * height

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Largest possible rectangle: " + largestRectangle)
