import { updateTable } from "./visualiser.js";
class DeltaBlocksHandler {
    constructor(stockData, deltaData) {
        this.sleepTime = 0;
        this.stockData = stockData;
        this.deltaData = deltaData;
        this.deltaBlockPointer = 0;
        this.deltaLength = deltaData.length;
    }
    startHandler() {
        var that = this;
        setTimeout(function repeat() {
            that.processAndUpdate(document);
            console.log(`Going to sleep for ${that.sleepTime}`);
            setTimeout(repeat, that.sleepTime);
        }, that.sleepTime);
    }
    updatePointer() {
        this.deltaBlockPointer += 1;
        this.deltaBlockPointer = this.deltaBlockPointer % this.deltaLength;
    }
    getNextDeltaBlock() {
        let block = this.deltaData[this.deltaBlockPointer];
        this.updatePointer();
        return block;
    }
    processBlock(stockData, deltaBlock) {
        for (let deltaEntry in deltaBlock) {
            if (deltaEntry === "sleepTime") {
                break;
            }
            else {
                let stockRow = stockData[deltaEntry];
                let deltaRow = deltaBlock[deltaEntry];
                stockRow.price = (deltaRow[0] === "" ? stockRow.price : deltaRow[0]);
                stockRow.change = (deltaRow[1] === "" ? stockRow.change : deltaRow[1]);
                stockRow.changePercentage = (deltaRow[2] === "" ? stockRow.changePercentage : deltaRow[2]);
            }
        }
        return stockData;
    }
    async getNextStockData() {
        let newStockData = Object.assign([], this.stockData);
        let deltaBlock = this.getNextDeltaBlock();
        let processedData = this.processBlock(newStockData, deltaBlock);
        if (deltaBlock["sleepTime"]) {
            return [processedData, deltaBlock["sleepTime"]];
        }
        else {
            return [processedData, 0];
        }
    }
    async processAndUpdate(document) {
        let newData;
        await this.getNextStockData()
            .then(resp => newData = resp);
        await updateTable(document, newData[0]);
        this.sleepTime = newData[1];
    }
}
export { DeltaBlocksHandler };
