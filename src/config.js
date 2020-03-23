const OPERATIONS_TABLE = {
    '+': (a, b) => Number(a) + Number(b),
    '-': (a, b) => Number(a) - Number(b),
    '*': (a, b) => Number(a) * Number(b),
    '/': (a, b) => {
        if (Number(b) === 0) {
            throw new TypeError('TypeError: Division by zero.')
        }
        return Number(a) / Number(b)
    },
}

const PRIORITY_TABLE = {
    '+': 10,
    '-': 10,
    '*': 100,
    '/': 100,
}

const PRIORITY_SCALE = [10, 100]

module.exports = {
    OperationHandler: OPERATIONS_TABLE,
    PriorityTable: PRIORITY_TABLE
}