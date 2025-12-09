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

for (let i = 0; i < n; i++) {
    const b1 = boxes[i]
    for (let j = i + 1; j < n; j++) {
        const b2 = boxes[j]

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

let finalPair = null

for (const p of pairs) {
    const rootA = find(p.from)
    const rootB = find(p.to)

    if (rootA !== rootB) {
        parent[rootB] = rootA
        numComponents--

        if (numComponents === 1) {
            finalPair = p
            break
        }
    }
}

console.log("Took " + (performance.now() - benchmark).toFixed(4) + " ms")

if (finalPair) {
    console.log("X multiplication: " + finalPair.b1.x * finalPair.b2.x)
}
