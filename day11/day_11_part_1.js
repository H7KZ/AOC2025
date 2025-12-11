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

const countAllPathsBFS = (nodes, startNode, endNode) => {
    const graph = {}

    for (const [from, to] of nodes) {
        if (!graph[from]) graph[from] = []
        graph[from].push(to)
    }

    const queue = [
        { node: startNode, path: [startNode] }
    ]

    let countPaths = 0

    while (queue.length > 0) {
        const { node, path } = queue.shift()

        if (node === endNode) {
            countPaths++
            continue
        }

        const neighbors = graph[node] || []

        for (const neighbor of neighbors) {
            if (!path.includes(neighbor)) {
                queue.push({
                    node: neighbor,
                    path: [...path, neighbor]
                })
            }
        }
    }

    return countPaths
}

const countedPaths = countAllPathsBFS(devices, 'you', 'out')

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("All possible paths: " + countedPaths)
