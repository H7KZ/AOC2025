const fs = require('fs');

const benchmark = performance.now();

const fileInput = fs.readFileSync('./day_8_input', 'utf-8');
const boxes = fileInput
    .trim()
    .split('\n')
    .map((line, index) => {
        const [x, y, z] = line.split(',').map(Number)
        return { id: index, x, y, z }
    })

const n = boxes.length
const pairs = []

// 1. Generate all pairs (Edges)
for (let i = 0; i < n; i++) {
    const b1 = boxes[i]
    for (let j = i + 1; j < n; j++) {
        const b2 = boxes[j]

        // Squared distance is sufficient for sorting
        const dx = b1.x - b2.x
        const dy = b1.y - b2.y
        const dz = b1.z - b2.z
        const distSq = (dx * dx) + (dy * dy) + (dz * dz)

        pairs.push({ from: i, to: j, distSq, b1, b2 })
    }
}

pairs.sort((a, b) => a.distSq - b.distSq)

const parent = new Int32Array(n).map((_, i) => i)
let numComponents = n

const find = (i) => {
    while (i !== parent[i]) {
        parent[i] = parent[parent[i]]
        i = parent[i];
    }
    return i
}

// 4. Kruskal's Algorithm Loop
let finalPair = null

for (const p of pairs) {
    const rootA = find(p.from)
    const rootB = find(p.to)

    // If they are in different sets, connect them
    if (rootA !== rootB) {
        parent[rootB] = rootA // Union
        numComponents--       // We just merged two islands into one

        // If we are down to 1 component, everyone is connected!
        if (numComponents === 1) {
            finalPair = p
            break // STOP immediately
        }
    }
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")

if (finalPair) {
    const result = finalPair.b1.x * finalPair.b2.x
    console.log("Final Connection between:", finalPair.b1, "and", finalPair.b2)
    console.log("Answer (Product of X coords): " + result)
} else {
    console.log("Could not fully connect all boxes.")
}
