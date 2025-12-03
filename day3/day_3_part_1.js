const fs = require('fs')

const fileInput = fs.readFileSync('./day_3_input', 'utf-8')

const banks = fileInput
    .split('\n')
    .map(line => line.trim())
    .map(line => line.split('')
                            .map(Number)
                            .map((v, i) => ({ battery: v, index: i })))

let joltage = 0

for (const bank of banks) {
    let highestJoltage = 0

    for (const { battery: battery1, index } of bank) {

        for (const { battery: battery2 } of bank.slice(index + 1)) {
            const newJoltage = Number(`${battery1}${battery2}`)

            if (newJoltage > highestJoltage) {
                highestJoltage = newJoltage
            }
        }
    }

    joltage += highestJoltage
}

console.log("Total joltage: " + joltage)
