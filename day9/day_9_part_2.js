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

const isPointInPolygon = (x, y, vertices) => {
    let inside = false

    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x, yi = vertices[i].y
        const xj = vertices[j].x, yj = vertices[j].y

        const isCollinear = (x - xi) * (yj - yi) === (xj - xi) * (y - yi)

        if (isCollinear) {
            if (x >= Math.min(xi, xj) && x <= Math.max(xi, xj) && y >= Math.min(yi, yj) && y <= Math.max(yi, yj)) {
                return true
            }
        }

        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) inside = !inside
    }

    return inside
}

const perimeter = new Set()
const outside = new Set()

const checkPoint = (x, y) => {
    if (perimeter.has(`${x},${y}`)) return true
    if (outside.has(`${x},${y}`)) return false

    if (isPointInPolygon(x, y, tiles)) {
        perimeter.add(`${x},${y}`)
        return true
    } else {
        outside.add(`${x},${y}`)
        return false
    }
}

let largestRectangle = 0

for (let i = 0; i < tiles.length; i++) {
    const tile1 = tiles[i]
    const { x, y } = tile1

    for (let j = i + 1; j < tiles.length; j++) {
        const tile2 = tiles[j]
        const { x: x2, y: y2 } = tile2

        const startX = Math.min(x, x2)
        const endX = Math.max(x, x2)
        const startY = Math.min(y, y2)
        const endY = Math.max(y, y2)

        if (checkPoint(startX, startY) === false) continue
        if (checkPoint(startX, endY) === false) continue
        if (checkPoint(endX, startY) === false) continue
        if (checkPoint(endX, endY) === false) continue

        const width = (endX - startX) + 1
        const height = (endY - startY) + 1
        const area = width * height

        if (area <= largestRectangle) continue

        let isValidRectangle = true

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (checkPoint(x, y) === false) {
                    isValidRectangle = false
                    break
                }
            }

            if (!isValidRectangle) break
        }

        if (isValidRectangle) {
            largestRectangle = area
        }
    }

    console.log(`Took ${(performance.now() - benchmark).toFixed(4)} ms after checking tile ${i + 1} of ${tiles.length}`)
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Largest possible rectangle: " + largestRectangle)
