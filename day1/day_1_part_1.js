const fs = require('fs')

const fileInput = fs.readFileSync('./day_1_input_test', 'utf-8')

const instructions = fileInput
    .split('\n')
    .map(line => line.trim())
    .map(line => ({
        direction: line[0],
        distance: Number(line.slice(1))
    }))

const rotation = {
    zeros: 0,
    right: 50,
    left: 0
}

for (const instruction of instructions) {
    if (instruction.direction === 'R') rotation.right += instruction.distance
    else rotation.left += instruction.distance

    console.log(rotation)

    if (rotation.right - rotation.left === 0) {
        rotation.zeros++
    }
}

console.log("Number of zeros encountered:", rotation.zeros)
