const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_10_input', 'utf-8')

/**
 * @type {{lights: string[], buttons: number[][], joltage: number[]}[]}
 */
const machines = fileInput
    .trim()
    .split('\n')
    .map((line) => {
        const items = line.split(' ')

        return {
            lights: items[0].replace('[', '').replace(']', '').split(''),
            buttons: items.slice(1, items.length - 1).map((btn) => {
                return btn.replace('(', '').replace(')', '').split(',').map(Number)
            }),
            joltage: items[items.length - 1].replace('{', '').replace('}', '').split(',').map(Number)
        }
    })

/** @type { (buttons: number[][]) => number[][][] } */
const allPossibleNonRepeatingButtonCombinations = (buttons) => {
    const results = []

    const helper = (start, combo) => {
        for (let i = start; i < buttons.length; i++) {
            const newCombo = combo.concat([buttons[i]])
            results.push(newCombo)
            helper(i + 1, newCombo)
        }
    }

    helper(0, [])
    return results
}

let fewestButtonClicks = 0

for (const machine of machines) {
    const { lights, buttons } = machine

    let buttonClicks = 0
    let lightStates = lights.slice().map(l => l = '.')

    const buttonCombinations = allPossibleNonRepeatingButtonCombinations(buttons)
        .filter(c => c.length > 0)
        .sort((a, b) => a.length - b.length)

    for (const buttonCombination of buttonCombinations) {
        lightStates = lights.slice().map(l => l = '.')

        for (const button of buttonCombination) {
            for (const index of button) {
                lightStates[index] = lightStates[index] === '.' ? '#' : '.'
            }
        }

        if (lightStates.join('') === lights.join('')) {
            buttonClicks = buttonCombination.length
            break
        }
    }

    fewestButtonClicks += buttonClicks
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Fewest button clicks: " + fewestButtonClicks)
