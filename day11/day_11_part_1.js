const fs = require('fs')
const benchmark = performance.now()

const fileInput = fs.readFileSync('./day_11_input_test', 'utf-8')

/**
 *       [device: number; output: number][]
 * @type {[number, number][]}
 */
const devices = fileInput
    .trim()
    .split('\n')
    .map((line) => {
        const items = line.split(': ')

        return items[1].split(' ').map(out => ([items[0].codePointAt(0), out.trim().codePointAt(0)]))
    })
    .flat()

const DFS = (node, dest, graph, visited, count) => {
    if (node === dest) {
        count++
        return
    }

    visited[node] = true

    for (let neighbor of graph[node]) {
        if (!visited[neighbor]) {
            DFS(neighbor, dest, graph, visited, count)
        }
    }

    visited[node] = false
}

const countPaths = (maxDeviceCode, devices, source, destination) => {
    let graph = Array.from({ length: devices.length + 1 }, () => [])

    for (let [u, v] of devices) {
        graph[u].push(v)
    }

    let visited = Array(devices.length + 1).fill(false)
    let count = 0

    DFS(source, destination, graph, visited, count)

    return count
}

let maxDeviceCode = Math.max(...devices.flat())
let source = 'you'
let destination = 'out'

let allPaths = countPaths(maxDeviceCode, devices, source, destination)

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("All possible paths: " + allPaths)
