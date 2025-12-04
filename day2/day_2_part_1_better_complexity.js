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
    return id.length % 2 === 0 &&
        id.slice(0, id.length / 2) === id.slice(id.length / 2)
}

const getNextRepeatableId = (id) => {
    const isEvenId = id.length % 2 === 0

    const nextRepeatableIdPart = isEvenId ? Number(id.slice(0, id.length / 2)) + 1 : Math.pow(10, id.slice(0, id.length / 2).length)

    return Number(`${nextRepeatableIdPart}${nextRepeatableIdPart}`)
}

let sumOfInvalidIds = 0

for (const range of ranges) {
    if (String(range.from).length % 2 === 0) {
        const firstDigits = String(range.from).slice(0, String(range.from).length / 2)
        const newRange = Number(`${firstDigits}${firstDigits}`)

        if (newRange > range.from) {
            range.from = newRange
        }
    }

    for (let id = range.from; id <= range.to; id) {
        if (isIdInvalid(String(id)) && id >= range.from) {
            sumOfInvalidIds += id
        }

        id = getNextRepeatableId(String(id))
    }
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Final sum of all invalid Ids: " + sumOfInvalidIds)
