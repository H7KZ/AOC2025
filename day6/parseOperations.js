const parseOperations = (rawOps) => {
    const ops = []

    let currentOperation = ''
    for (const char of rawOps) {
        if (char !== ' ') {
            if (currentOperation.length > 0) {
                currentOperation = currentOperation.substring(0, currentOperation.length - 1)
                ops.push({ operation: currentOperation.trim(), length: currentOperation.length })
            }

            currentOperation = char
            continue
        }

        currentOperation += char
    }

    if (currentOperation.length > 0) {
        ops.push({ operation: currentOperation.trim(), length: currentOperation.length })
    }

    return ops
}

module.exports = { parseOperations }
