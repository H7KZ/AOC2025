const fs = require('fs')

const fileInput = fs.readFileSync('./day_1_input', 'utf-8')

const instructions = fileInput
    .split('\n')
    .map(line => line.trim())
    .map(line => ({
        direction: line[0],
        distance: Number(line.slice(1))
    }))

let zeros = 0
let position = 50

for (const instruction of instructions) {
    if (instruction.direction === 'R') {
        position += instruction.distance
    } else if (instruction.direction === 'L') {
        position -= instruction.distance
    }

    let distance = Math.abs(position)

    if (position === 0 || distance % 100 === 0) {
        zeros += 1
    }

    position = ((position % 100) + 100) % 100
}

console.log("Number of zeros encountered:", zeros)
