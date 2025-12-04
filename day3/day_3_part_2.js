const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_3_input', 'utf-8')

const banks = fileInput
    .split('\n')
    .map(line => line.trim())
    .map(line => line.split('')
        .map(Number)
        .map((v, i) => ({ battery: v, index: i })))

const findHighestJoltageInBatteries = (batteries) => {
    let highestJolt = { battery: 0, index: -1 }

    for (const { battery, index } of batteries) {
        if (battery > highestJolt.battery) {
            highestJolt = { battery, index }
        }
    }

    return highestJolt
}

let joltage = 0

for (const bank of banks) {
    let banked = [...bank]

    let highestJoltage = ''

    for (let i = 11; i >= 0; i--) {
        const highestJolt = findHighestJoltageInBatteries(banked.slice(0, banked.length - i))

        highestJoltage += String(highestJolt.battery)

        banked = banked.filter(b => b.index > highestJolt.index)
    }

    joltage += Number(highestJoltage)
}

console.log("Took " + (performance.now() - benchmark).toFixed(6) + " ms")
console.log("Total joltage: " + joltage)
