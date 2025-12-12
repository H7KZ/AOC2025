const fs = require('fs')

const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_11_input', 'utf-8')

/**
 * [device: number; output: number][]
 * @type {[number, number][]}
 */
const devices = fileInput
    .trim()
    .split('\n')
    .map((line) => {
        const items = line.split(': ')
        return items[1]
            .split(' ')
            .map(out => ([
                items[0].trim(),
                out.trim()
            ]))
    })
    .flat()

const countAllPathsMemo = (nodes, startNode, endNode) => {
    const graph = {}

    for (const [from, to] of nodes) {
        if (!graph[from]) graph[from] = []
        graph[from].push(to)
    }

    const memo = new Map()

    const getPaths = (currentNode, foundDAC, foundFFT) => {
        if (currentNode === 'dac') foundDAC = true
        if (currentNode === 'fft') foundFFT = true

        const stateKey = `${currentNode}|${foundDAC ? 1 : 0}|${foundFFT ? 1 : 0}`

        if (memo.has(stateKey)) {
            return memo.get(stateKey)
        }

        if (currentNode === endNode) {
            return (foundDAC && foundFFT) ? 1 : 0
        }

        let totalPaths = 0
        const neighbors = graph[currentNode] || []

        for (const neighbor of neighbors) {
            totalPaths += getPaths(neighbor, foundDAC, foundFFT)
        }

        memo.set(stateKey, totalPaths)
        return totalPaths
    }

    return getPaths(startNode, false, false)
}

const count = countAllPathsMemo(devices, 'svr', 'out')

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log(`Total paths from 'svr' to 'out' visiting both 'dac' and 'fft': ${count}`)
