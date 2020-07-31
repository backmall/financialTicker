import { StockEntry } from "./stockEntry.js";

class SnapshotService{
    
  /**
   * Fetch the .csv file from `snapshotLocation` and parse it
   * and return array of StockEntries
   * @param snapshotLocation 
   */
  async fetchSnapshot(snapshotLocation: string){
      
      let loaded_data;

      await fetch(snapshotLocation, { mode: 'no-cors' })
          .then(res => res.text())
          .then(data => loaded_data = this.parseCSV(data))
      
      return loaded_data;
  }

  /**
   * Pass in .csv file and parse it into StockEntry[]
   * @param csv 
   */
  parseCSV(csv: string): StockEntry[] {
      let seperated = csv.split(/\r?\n/);
      let output = [];

      if (seperated[0] !== "Name,Company Name,Price,Change,Chg %,Mkt Cap") {
          throw new Error("Selected CSV is not matching format!!!");
      } else {
          seperated.shift();
      }
      
      for (let line of seperated) {
          let split_line = line.split(",");

          if (split_line.length === 1) {
              continue;
          }
          
          output.push(StockEntry.makeStockEntryFromLine(split_line))
      }

      return output;
  }
}

export { SnapshotService };