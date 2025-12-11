const fs = require('fs')
const lp = require('javascript-lp-solver')
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

let fewestLinearVectorCombinations = 0

for (const machine of machines) {
    const { buttons, joltage } = machine

    const constraints = {}
    for (let i = 0; i < joltage.length; i++) {
        constraints[i] = { equal: joltage[i] }
    }

    const variables = {}
    for (let i = 0; i < buttons.length; i++) {
        variables["button" + i] = {}
        for (const buttonIndex of buttons[i]) {
            variables["button" + i][buttonIndex] = 1
        }

        variables["button" + i]["cost"] = 1
    }

    fewestLinearVectorCombinations += lp.Solve({
        optimize: "cost",
        opType: "min",
        constraints: constraints,
        variables: variables,
        ints: Object.fromEntries(Object.keys(variables).map((v) => [v, 1]))
    }).result
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Fewest button clicks: " + fewestLinearVectorCombinations)
