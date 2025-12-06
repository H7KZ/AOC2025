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
const operations = parseOperations(rawOperations).reverse()

let grandTotalOfMathProblems = 0

let totalOperationCut = homework[0].length
for (const op of operations) {
    const numbers = []

    for (let i = 0; i < op.length; i++) {
        const number = homework
            .map(line => line.split('')[totalOperationCut - op.length - 1 + i])
            .join('')

        numbers.push(Number(number))
    }

    const result = numbers.reduce((acc, num) => {
        switch (op.operation) {
            case '+':
                return acc + num
            case '*':
                return acc * num
        }
    })

    grandTotalOfMathProblems += result

    totalOperationCut -= (op.length + 1)
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Grand total of math problems: " + grandTotalOfMathProblems)
