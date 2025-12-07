const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_7_input', 'utf-8')

const manifold = fileInput.trim().split('\n').map(line => line.trim().split(''))

let splittersUsed = 0

for (let row = 1; row < manifold.length; row++) {
    for (let col = 0; col < manifold[0].length; col++) {
        let column = manifold[row][col]
        const columnAbove = manifold[row - 1][col]

        if (columnAbove === 'S') {
            manifold[row][col] = '|'
            continue
        }

        if (column === '^' && columnAbove === '|') {
            manifold[row][col - 1] = '|'
            manifold[row][col + 1] = '|'

            splittersUsed++

            continue
        }

        if (columnAbove === '|') {
            manifold[row][col] = '|'
        }
    }
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Number of splitters used: " + splittersUsed)
