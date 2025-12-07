const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_7_input_test', 'utf-8')

const manifold = fileInput.trim().split('\n').map(line => line.trim().split(''))

/**
 * @returns {{row: number; col: number} | null}
 */
const getSplitterBelow = (manifold, startRow, col) => {
    for (let row = startRow + 1; row < manifold.length; row++) {
        if (manifold[row][col] === '^') {
            return {row, col: col}
        }
    }
}

/**
 * @type {{[key: string]: string[]}}
 */
const tachyons = {}

for (let row = 0; row < manifold.length; row++) {
    for (let col = 0; col < manifold[0].length; col++) {
        let column = manifold[row][col]

        if (column === 'S') {
            const splitterBelow = getSplitterBelow(manifold, row, col)

            if (splitterBelow) {
                tachyons[`${row},${col}`] = [
                    `${splitterBelow.row},${splitterBelow.col - 1}`,
                    `${splitterBelow.row},${splitterBelow.col + 1}`
                ]
            }
        }

        if (column !== '^') continue

        const splitterBelowLeft = getSplitterBelow(manifold, row, col - 1)
        const splitterBelowRight = getSplitterBelow(manifold, row, col + 1)

        const isLeftInTachyons = Object.values(tachyons).flat().includes(`${row},${col - 1}`)
        const isRightInTachyons = Object.values(tachyons).flat().includes(`${row},${col + 1}`)

        if (splitterBelowLeft && isLeftInTachyons) {
            tachyons[`${row},${col - 1}`] = [
                `${splitterBelowLeft.row},${splitterBelowLeft.col - 1}`,
                `${splitterBelowLeft.row},${splitterBelowLeft.col + 1}`
            ]
        } else {
            tachyons[`${row},${col - 1}`] = []
        }

        if (splitterBelowRight && isRightInTachyons) {
            tachyons[`${row},${col + 1}`] = [
                `${splitterBelowRight.row},${splitterBelowRight.col - 1}`,
                `${splitterBelowRight.row},${splitterBelowRight.col + 1}`
            ]
        } else {
            tachyons[`${row},${col + 1}`] = []
        }
    }
}

const countAllTimelinesDFS = (tachyons, start, end) => {
    let allTimelines = 0

    const DFS = (currentTachyon, currentTimeline) => {
        currentTimeline.push(currentTachyon)

        if (currentTachyon === end) {
            allTimelines += 1
        } else {
            const neighbors = tachyons[currentTachyon]

            if (neighbors && neighbors.length > 0) {
                for (let neighbor of neighbors) {
                    if (!currentTimeline.includes(neighbor)) {
                        DFS(neighbor, currentTimeline)
                    }
                }
            }
        }

        currentTimeline.pop()
    }

    DFS(start, [])

    console.log(`From ${start} to ${end}: ` + allTimelines + " timelines")

    return allTimelines
}

const startingTachyon = Object.keys(tachyons)[0]
const endingTachyons = Object.keys(tachyons).filter(key => tachyons[key].length === 0)

let timelines = 0

for (const end of endingTachyons) {
    timelines += countAllTimelinesDFS(tachyons, startingTachyon, end)
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Number of different timelines: " + timelines)
