const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_7_input', 'utf-8')

let manifold = fileInput.trim().split('\n').map(line => line.trim().split(''))

/**
 * @returns {{row: number; col: number} | null}
 */
const getBelowSplitter = (manifold, startRow, col) => {
    for (let row = startRow + 1; row < manifold.length; row++) {
        if (manifold[row][col] === '^') {
            return { row, col: col }
        }
    }
}

/**
 * @returns {{row: number; col: number; value: number}[]}
 */
const getAllUpperSplitters = (manifold, startRow, col) => {
    if (col < 0 || col >= manifold[0].length) {
        return []
    }

    const splitters = []

    for (let row = startRow - 1; row > 1; row--) {
        if (manifold[row][col] !== '.') {
            splitters.push({ row, col: col, value: Number(manifold[row][col]) })
        }
    }

    return splitters
}

/**
 * @returns {{row: number; col: number} | null}
 */
const getFirstUpperSplitter = (manifold, startRow, col) => {
    if (col < 0 || col >= manifold[0].length) {
        return null
    }

    for (let row = startRow - 1; row > 1; row--) {
        if (manifold[row][col] !== '.') {
            return { row, col: col }
        }
    }

    return null
}

for (let row = 0; row < manifold.length; row++) {
    for (let col = 0; col < manifold[0].length; col++) {
        let column = manifold[row][col]

        if (column === 'S') {
            const splitterBelow = getBelowSplitter(manifold, row, col)

            if (splitterBelow) {
                manifold[splitterBelow.row][col] = '1'
            }

            continue
        }

        if (column !== '^') continue

        const upperSplitter = getFirstUpperSplitter(manifold, row, col)

        const belowSplitterLeft = getAllUpperSplitters(manifold, row, col - 1).filter(s => s.row > (upperSplitter ? upperSplitter.row : -1))
        const belowSplitterRight = getAllUpperSplitters(manifold, row, col + 1).filter(s => s.row > (upperSplitter ? upperSplitter.row : -1))

        let possibleTimelines = 0

        if (belowSplitterLeft.length > 0) {
            possibleTimelines += belowSplitterLeft.reduce((sum, splitter) => sum + splitter.value, 0)
        }

        if (belowSplitterRight.length > 0) {
            possibleTimelines += belowSplitterRight.reduce((sum, splitter) => sum + splitter.value, 0)
        }

        manifold[row][col] = possibleTimelines.toString()
    }
}
let timelines = 0

const row = manifold.length - 1
for (let col = 0; col < manifold[0].length; col++) {
    const upperSplitter = getFirstUpperSplitter(manifold, row, col)

    const belowSplitterLeft = getAllUpperSplitters(manifold, row, col - 1).filter(s => s.row > (upperSplitter ? upperSplitter.row : -1))
    const belowSplitterRight = getAllUpperSplitters(manifold, row, col + 1).filter(s => s.row > (upperSplitter ? upperSplitter.row : -1))

    let possibleTimelines = 0

    if (belowSplitterLeft.length > 0) {
        possibleTimelines += belowSplitterLeft.reduce((sum, splitter) => sum + splitter.value, 0)
    }

    if (belowSplitterRight.length > 0) {
        possibleTimelines += belowSplitterRight.reduce((sum, splitter) => sum + splitter.value, 0)
    }

    timelines += possibleTimelines
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Number of different timelines: " + timelines)
