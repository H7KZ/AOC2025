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
    const prevPosition = position

    if (instruction.direction === 'R') {
        position += instruction.distance
    } else if (instruction.direction === 'L') {
        position -= instruction.distance
    }

    let rotations = 0
    let distance = Math.abs(position)

    while (distance >= 100) {
        rotations += 1
        distance -= 100
    }

    if (position === 0) {
        rotations += 1
    }

    if (position < 0 && prevPosition > 0) {
        rotations += 1
    } else if (position > 0 && prevPosition < 0) {
        rotations += 1
    }

    zeros += rotations

    position = ((position % 100) + 100) % 100
}

console.log("Number of zeros encountered:", zeros)
