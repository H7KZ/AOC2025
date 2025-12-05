const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_5_input', 'utf-8')
const fileInputSplit = fileInput.split('\r\n\r\n')

const freshIngredientList = fileInputSplit[0]
    .split('\n')
    .map(line => line.trim())
    .map(line => ({ from: Number(line.split('-')[0]), to: Number(line.split('-')[1]) }))

const filterAllSubsets = (ingredientSets) => {
    return ingredientSets.filter((ingredientSet, index, self) =>
        !self.find((otherSet, otherIndex) =>
            otherIndex !== index &&
            otherSet.from <= ingredientSet.from &&
            otherSet.to >= ingredientSet.to
        )
    )
}

let ingredientSets = [freshIngredientList[0]]

for (const freshIngredient of freshIngredientList.slice(1)) {
    ingredientSets = filterAllSubsets(ingredientSets)

    // [3-5, 7-10, 12-14] & 4-13
    // -> 4 is within 3-5
    const isFromWithinAnotherSet = ingredientSets.find(ingredientSet =>
        freshIngredient.from >= ingredientSet.from && freshIngredient.from <= ingredientSet.to
    )

    // [3-5, 7-10, 12-14] & 4-13
    // -> 13 is within 12-14
    const isToWithinAnotherSet = ingredientSets.find(ingredientSet =>
        freshIngredient.to >= ingredientSet.from && freshIngredient.to <= ingredientSet.to
    )

    // Neither end is within existing sets
    if (!isFromWithinAnotherSet && !isToWithinAnotherSet) {
        ingredientSets.push(freshIngredient)
    }

    // Only 'from' is within existing sets
    if (isFromWithinAnotherSet && !isToWithinAnotherSet) {
        isFromWithinAnotherSet.to = freshIngredient.to
    }

    // Only 'to' is within existing sets
    if (!isFromWithinAnotherSet && isToWithinAnotherSet) {
        isToWithinAnotherSet.from = freshIngredient.from
    }

    // Both ends are within the same existing set
    if (isFromWithinAnotherSet === isToWithinAnotherSet) {
        continue
    }

    // Both ends are within different existing sets
    if (isFromWithinAnotherSet && isToWithinAnotherSet) {
        isFromWithinAnotherSet.to = isToWithinAnotherSet.to
        ingredientSets = ingredientSets.filter(ingredientSet => ingredientSet !== isToWithinAnotherSet)
    }
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")

const freshIngredientCount = ingredientSets.reduce((sum, ingredientSet) => sum + (ingredientSet.to - ingredientSet.from + 1), 0)
console.log("Number of fresh ingredients: " + freshIngredientCount)
