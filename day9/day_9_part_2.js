const fs = require('fs')
const benchmark = performance.now()

// https://stackoverflow.com/questions/4833802/check-if-polygon-is-inside-a-polygon
// https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
// https://gist.github.com/leocb/248a635ff73bae91939aaf728ae2152c

const fileInput = fs.readFileSync('./day_9_input_test', 'utf-8')
const tiles = fileInput
    .trim()
    .split('\n')
    .map((line) => {
        const [x, y] = line.split(',').map(Number)
        return { x, y }
    })

/** @type {Array<{x1: number, y1: number, x2: number, y2: number}>} */
const polygon = []

for (let i = 0; i < tiles.length; i++) {
    const tile1 = tiles[i]
    const tile2 = tiles[(i + 1) % tiles.length]

    polygon.push({
        x1: tile1.x,
        y1: tile1.y,
        x2: tile2.x,
        y2: tile2.y
    })
}

const doLinesIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    return !(ua < 0 || ua > 1 || ub < 0 || ub > 1)
}

const isPointInPolygon = (x, y, polygon) => {
    let inside = false

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i].x1, yi = polygon[i].y1
        let xj = polygon[j].x1, yj = polygon[j].y1

        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)

        if (intersect) inside = !inside
    }

    return inside
}

const checkIfLineIntersectsPolygon = (x1, y1, x2, y2) => {
    for (let i = 0; i < polygon.length; i++) {
        const edge = polygon[i]

        if (doLinesIntersect(x1, y1, x2, y2, edge.x1, edge.y1, edge.x2, edge.y2) === true) {
            console.log(x1, y1, x2, y2, edge)
            return true
        }
    }

    return false
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

        // ->
        if (checkIfLineIntersectsPolygon(startX, startY, endX + 100_000, startY) === true) continue
        // |
        if (checkIfLineIntersectsPolygon(endX, startY, endX, endY + 100_000) === true) continue
        // <-
        if (checkIfLineIntersectsPolygon(endX, endY, 0, endY) === true) continue
        // |
        if (checkIfLineIntersectsPolygon(startX, endY, startX, 0) === true) continue

        const width = (endX - startX) + 1
        const height = (endY - startY) + 1
        const area = width * height

        if (area <= largestRectangle) continue

        const centerX = startX + (width - 1) / 2
        const centerY = startY + (height - 1) / 2

        if (!isPointInPolygon(centerX, centerY, polygon)) continue

        largestRectangle = area

        console.log(startX, startY, endX, endY)
    }
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Largest possible rectangle: " + largestRectangle)
