const {parseOperations} = require("./parseOperations")
const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_6_input', 'utf-8')

/**
 * @type {string[]}
 */
const homework = fileInput.split('\n').slice(0, fileInput.split('\n').length - 1)
const rawOperations = fileInput.split('\n')[fileInput.split('\n').length - 1]

/**
 * @type {{operation: string; length: number}[]}
 */
const operations = parseOperations(rawOperations)

let grandTotalOfMathProblems = 0

let totalOperationCut = 0
for (const op of operations) {
    const numbers = homework
        .map(line => line.split('').slice(totalOperationCut, totalOperationCut + op.length).join(''))
        .map(line => Number(line))

    const result = numbers.reduce((acc, num) => {
        switch (op.operation) {
            case '+':
                return acc + num
            case '*':
                return acc * num
        }
    })

    grandTotalOfMathProblems += result

    totalOperationCut += op.length + 1
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Grand total of math problems: " + grandTotalOfMathProblems)
