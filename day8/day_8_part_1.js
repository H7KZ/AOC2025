const fs = require('fs');

const benchmark = performance.now();

const fileInput = fs.readFileSync('./day_8_input', 'utf-8')
const boxes = fileInput
    .trim()
    .split('\n')
    .map((line, index) => {
        const [x, y, z] = line.split(',').map(Number)
        return { id: index, x, y, z }
    })

const pairs = []
const n = boxes.length

for (let i = 0; i < n; i++) {
    const b1 = boxes[i]
    for (let j = i + 1; j < n; j++) {
        const b2 = boxes[j]

        const dx = b1.x - b2.x
        const dy = b1.y - b2.y
        const dz = b1.z - b2.z
        const distSq = (dx * dx) + (dy * dy) + (dz * dz)

        pairs.push({ from: i, to: j, distSq })
    }
}

pairs.sort((a, b) => a.distSq - b.distSq)

const topPairs = pairs.slice(0, 1000)

const parent = new Int32Array(n).map((_, i) => i)

const find = (i) => {
    while (i !== parent[i]) {
        parent[i] = parent[parent[i]]
        i = parent[i]
    }
    return i
}

const union = (i, j) => {
    const rootI = find(i)
    const rootJ = find(j)
    if (rootI !== rootJ) {
        parent[rootJ] = rootI;
    }
}

for (const p of topPairs) {
    union(p.from, p.to)
}

const groupCounts = new Map()

const activeNodes = new Set()
topPairs.forEach(p => {
    activeNodes.add(p.from)
    activeNodes.add(p.to)
})

for (const id of activeNodes) {
    const root = find(id)
    groupCounts.set(root, (groupCounts.get(root) || 0) + 1)
}

const topThreeCircuits = Array.from(groupCounts.values())
    .sort((a, b) => b - a)
    .slice(0, 3)

const result = topThreeCircuits.reduce((acc, num) => acc * num, 1)

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")
console.log("Total circuits value: " + result)
