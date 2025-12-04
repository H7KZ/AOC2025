const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_4_input', 'utf-8')

/**
 * @type {{value: string, rowIndex: number, colIndex: number}[][]}
 */
let diagram = fileInput
    .split('\n')
    .map(line => line.trim())
    .map((line, lineIndex) =>
        line.split('')
            .map((char, charIndex) => ({ value: char, rowIndex: lineIndex, colIndex: charIndex }))
    )

/**
 * @returns {string[]}
 */
const getEightAdjacentCells = (diagram, rowIndex, columnIndex) => {
    const directions = [
        [ -1 , -1 ], [ -1 , 0 ], [ -1 , 1 ],
        [  0 , -1 ], /*  @@  */  [  0 , 1 ],
        [  1 , -1 ], [  1 , 0 ], [  1 , 1 ]
    ]

    const adjacentCells = []

    for (const [dRow, dCol] of directions) {
        const newRow = rowIndex + dRow
        const newCol = columnIndex + dCol

        if (newRow >= 0 && newRow < diagram.length &&
            newCol >= 0 && newCol < diagram[0].length) {
            adjacentCells.push(diagram[newRow][newCol].value)
        }
    }

    return adjacentCells
}

let forkliftAccessible = 0
let changesMade = false

do {
    changesMade = false

    let newDiagram = [...diagram]

    for (const row of diagram) {
        for (const cell of row) {
            if (cell.value !== '@') {
                continue
            }

            const adjacentCells = getEightAdjacentCells(diagram, cell.rowIndex, cell.colIndex)

            const paperRollsCount = adjacentCells.filter(c => c === '@').length

            if (paperRollsCount < 4) {
                newDiagram[cell.rowIndex][cell.colIndex].value = '.'
                changesMade = true
                forkliftAccessible++
            }
        }
    }

    diagram = newDiagram

} while (changesMade)

console.log("Took " + (performance.now() - benchmark).toFixed(6) + " ms")
console.log("Number of paper rolls accessible: " + forkliftAccessible)
