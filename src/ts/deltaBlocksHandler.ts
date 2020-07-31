import { StockEntry } from "./stockEntry.js";
import { updateTable } from "./visualiser.js";

class DeltaBlocksHandler{
  private stockData: StockEntry[]
  private deltaData: any

  private deltaBlockPointer: number // Used to point to current delta block
  private deltaLength: number // Used in calculating next delta block

  public sleepTime: number = 0

  constructor(stockData: StockEntry[], deltaData: any[]) {
    this.stockData = stockData;
    this.deltaData = deltaData;

    this.deltaBlockPointer = 0;
    this.deltaLength = deltaData.length;
  }

  /**
   * Start handler to modify the data synchronized to tickerTime from .csv
   */
  startHandler() {
    var that = this;
    setTimeout(function repeat() {
      that.processAndUpdate(document)
      console.log(`Going to sleep for ${that.sleepTime}`);
      setTimeout(repeat, that.sleepTime);
    }, that.sleepTime);
  }

  /**
   * Helper to have the pointer always in bounds of deltaBlock
   */
  private updatePointer() {
    this.deltaBlockPointer += 1;
    this.deltaBlockPointer = this.deltaBlockPointer % this.deltaLength;
  }

  /**
   * Helper to get next data and loop accordingly through the data
   */
  private getNextDeltaBlock(): any {
    let block = this.deltaData[this.deltaBlockPointer];
    this.updatePointer();

    return block;
  }

  /**
   * Process the deltaBlock and change values accordingly 
   * @param stockData Stock data to be manipulated
   * @param deltaBlock Delta data that will modify stock data
   */
  private processBlock(stockData: StockEntry[], deltaBlock: any[]): StockEntry[] {
    for (let deltaEntry in deltaBlock) {
      if (deltaEntry === "sleepTime") {
        break;
      }else{
        let stockRow = stockData[deltaEntry];
        let deltaRow = deltaBlock[deltaEntry];
        
        stockRow.price = (deltaRow[0] === "" ? stockRow.price : deltaRow[0]);
        stockRow.change = (deltaRow[1] === "" ? stockRow.change : deltaRow[1]);
        stockRow.changePercentage = (deltaRow[2] === "" ? stockRow.changePercentage : deltaRow[2]);
      }
    }
    return stockData;
  }

  /**
   * Helper function to to coordinate the change of StockEntry data
   */
  private async getNextStockData(): Promise<[StockEntry[], any]>{
    let newStockData = Object.assign([], this.stockData);
    let deltaBlock = this.getNextDeltaBlock();

    let processedData = this.processBlock(newStockData, deltaBlock);

    if (deltaBlock["sleepTime"]) {
      return [processedData, deltaBlock["sleepTime"]];
    } else {
      return [processedData, 0];
    }
  }

  /**
   * Process the data with the deltaBlocks, and update the `Table`
   * @param document document containing the `Table`
   */
  async processAndUpdate(document: Document) {
    let newData: [StockEntry[], any];

    await this.getNextStockData()
      .then(resp => newData = resp);
    
    await updateTable(document, newData[0]);
    this.sleepTime = newData[1];
  }
}

export { DeltaBlocksHandler };