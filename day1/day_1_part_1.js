const fs = require('fs')

const fileInput = fs.readFileSync('./day_1_input', 'utf-8')

const instructions = fileInput
    .split('\n')
    .map(line => line.trim())
    .map(line => ({
        direction: line[0],
        distance: Number(line.slice(1))
    }))

const rotation = {
    zeros: 0,
    number: 50
}

for (const instruction of instructions) {
    let newRotation = Object.assign({}, rotation)

    if (instruction.direction === 'R') newRotation.number += instruction.distance
    else newRotation.number -= instruction.distance

    if (newRotation.number <= 99 && newRotation.number >= 0) {
        if (newRotation.number === 0) rotation.zeros++
        rotation.number = newRotation.number
        continue
    }

    const overflow = newRotation.number % 100

    if (overflow === 0) {
        rotation.zeros++
        rotation.number = 0
        continue
    }

    if (newRotation.number < 0) rotation.number = 100 + overflow
    else rotation.number = overflow
}

console.log("Final rotation number:", rotation.number)
console.log("Number of zeros encountered:", rotation.zeros)
