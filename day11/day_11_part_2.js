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

const countAllPathsDFS = (nodes, startNode, endNode) => {
    const graph = {}

    for (const [from, to] of nodes) {
        if (!graph[from]) graph[from] = []
        graph[from].push(to)
    }

    let countPaths = 0

    const DFS = (currentNode, visited, foundDAC, foundFFT) => {
        if (currentNode === 'dac') foundDAC = true
        if (currentNode === 'fft') foundFFT = true

        if (currentNode === endNode) {
            if (foundDAC && foundFFT) {
                countPaths++
            }
            return
        }

        const neighbors = graph[currentNode] || []

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor)
                DFS(neighbor, visited, foundDAC, foundFFT)
                visited.delete(neighbor)
            }
        }
    }

    DFS(startNode, new Set([startNode]), false, false)

    return countPaths
}

const count = countAllPathsDFS(devices, 'svr', 'out')

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log(`Total paths from 'svr' to 'out' visiting both 'dac' and 'fft': ${count}`)
