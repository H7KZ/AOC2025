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
    console.log("----")
    let newRotation = Object.assign({}, rotation)

    console.log(instruction.direction + instruction.distance)

    if (instruction.direction === 'R') newRotation.number += instruction.distance
    else newRotation.number -= instruction.distance

    console.log("nw " + newRotation.number)

    if (newRotation.number <= 99 && newRotation.number >= 0) {
        if (newRotation.number === 0) rotation.zeros++
        rotation.number = newRotation.number
        console.log("zr " + rotation.zeros)
        continue
    }

    const overflow = newRotation.number % 100

    console.log("ov " + overflow)

    let numOfRotations = newRotation.number

    if (overflow === 0) {
        rotation.zeros++
        numOfRotations -= 100
    }

    if (newRotation.number < 0) {
        rotation.zeros++
    }

    rotation.zeros += Math.floor(Math.abs(numOfRotations / 100))

    if (rotation.number === 0) {
        rotation.zeros--
    }

    console.log("zr " + rotation.zeros)

    if (overflow === 0) {
        rotation.number = 0
        continue
    }

    if (newRotation.number < 0) rotation.number = 100 + overflow
    else rotation.number = overflow

    console.log("fn " + rotation.number)
}

console.log("Final rotation number:", rotation.number)
console.log("Number of zeros encountered:", rotation.zeros)
