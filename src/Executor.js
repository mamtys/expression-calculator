class Executor {
    constructor(OperationHandler, PriorityTable) {
        this._storageContainer = [];
        this._OperationHandler = OperationHandler;
        this._PriorityTable = PriorityTable;
    }

    createNewStorage() {
        this._storageContainer.push([]);
    }

    destroyLastStorage() {
        this._storageContainer.pop();
    }

    isEmpty() {
        return this._storageContainer.length === 0;
    }

    getCurrentStorage() {
        if (this._storageContainer.length === 0) {
            return null;
        }
        return this._storageContainer.slice(-1)[0];
    }

    push(number) {
        this.getCurrentStorage().push(number);
    }

    compute(a, operator, b) {
        return this._OperationHandler[operator](a, b);
    }
    
    execute() {
        //even should be numbers, odd - operations
        if (this.getCurrentStorage().some((el, ind) =>{
                if (ind % 2 === 0 ) {
                    return isNaN(el)
                }
                return !isNaN(el);
            })) {
            throw new ExpressionError('Wrong Sequence');
        }

        let storage = this.getCurrentStorage();
        while (storage.length > 2) {
            let [rightOperator, leftOperator] = [storage[1], storage[3]];
            if (this._PriorityTable[rightOperator] >= (this._PriorityTable[leftOperator] || 0)) {
                const result = this.compute(...storage.splice(0, 3));
                storage.unshift(result);
            }   else {
                const result = this.compute(...storage.slice(2, 5));
                storage.splice(2, 3, result);
            }
        }

        const result = storage[0];
        this.destroyLastStorage();

        if (this.getCurrentStorage()) {
            this.getCurrentStorage().push(result)
        } 

        return result;

    }
}

module.exports = Executor;