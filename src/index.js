
const Executor = require('./Executor');
const {
    PriorityTable,
    OperationHandler
} = require('./config');

function expressionCalculator(expr) {
    const re = /([\(\)])|([0-9]+)|([\+\-\*\/])/g;
    const executor = new Executor(OperationHandler, PriorityTable);
    let bracketCounter = 0;

    executor.createNewStorage();
    while (match = (re.exec(expr) || [])[0]) {
        if (match === '(') {
            executor.createNewStorage();
            bracketCounter++;
            continue;
        }

        if (match === ')') {
            executor.execute();
            bracketCounter--;
            continue;
        }

        //closing unopened bracket causes error
        try {
            executor.push(match);
        } catch (err) {
            throw new Error('ExpressionError: Brackets must be paired');
        }
    }

    if (bracketCounter !== 0) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    return Number(executor.execute().toFixed(4));
}

module.exports = {
    expressionCalculator
}