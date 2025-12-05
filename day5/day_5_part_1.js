const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_5_input', 'utf-8')
const fileInputSplit = fileInput.split('\r\n\r\n')

const freshIngredientList = fileInputSplit[0]
    .split('\n')
    .map(line => line.trim())
    .map(line => ({ from: Number(line.split('-')[0]), to: Number(line.split('-')[1]) }))

const availableIngredients = fileInputSplit[1]
    .split('\n')
    .map(line => line.trim())
    .map(Number)

let freshIngredientsCount = 0

for (const availableIngredient of availableIngredients) {
    for (const freshIngredient of freshIngredientList) {
        if (availableIngredient >= freshIngredient.from &&
            availableIngredient <= freshIngredient.to) {
            freshIngredientsCount++
            break
        }
    }
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Number of fresh ingredients: " + freshIngredientsCount)
