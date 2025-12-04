const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_2_input', 'utf-8')

const ranges = fileInput
    .split(',')
    .map(line => line.trim())
    .map(line => ({
        from: Number(line.split('-')[0]),
        to: Number(line.split('-')[1])
    }))

const isIdInvalid = (id) => {
    let repeatId = ''

    for (const i of id.slice(0, id.length / 2).split('')) {
        repeatId += i

        if (id.length % repeatId.length !== 0) {
            continue
        }

        if ("".padStart(id.length, repeatId) === id) {
            return true
        }
    }

    return false
}

let sumOfInvalidIds = 0

for (const range of ranges) {
    for (let id = range.from; id <= range.to; id++) {
        if (isIdInvalid(String(id))) {
            sumOfInvalidIds += id
        }
    }
}

console.log("Took " + (performance.now() - benchmark).toFixed(6) + " ms")
console.log("Final sum of all invalid Ids: " + sumOfInvalidIds)
