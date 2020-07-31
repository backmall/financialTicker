class StockEntry{
  name: string;
  companyName: string;
  
  /**
   * As the data will be changed by replacing, string is sufficient
   */
  price: string;            
  change: string;           
  changePercentage: string; 
  marketCapital: string;    

  constructor(
    name: string, companyName: string, price: string,
    change: string, changePercentage: string, marketCapital: string)
  {
    this.name = name;
    this.companyName = companyName;
    this.price = price;
    this.change = change;
    this.changePercentage = changePercentage;
    this.marketCapital = marketCapital;
  }
  
  /**
   * Convert StockEntry obj to JSON for display
   */
  toJSON() {
    return {
      name: this.name,
      companyName: this.companyName,
      price: this.price,
      change: this.change,
      changePercentage: this.changePercentage,
      marketCapital: this.marketCapital,
    };
  }

  /**
   * Create `StockEntry` from `entry` JSON
   * @param entry - JSON
   */
  static formatStockEntry(entry: any): StockEntry{
    return new StockEntry(
      entry.name,
      entry.companyName,
      entry.price,
      entry.change,
      entry.changePercentage,
      entry.marketCapital,
    );
  }

  /**
   * Convert `String[]` into a `StockEntry` object
   * @param text `String[]` with fields for StockEntry creation
   */
  static makeStockEntryFromLine(text: string[]) {
    let prototype = {
      "name": text[0],
      "companyName": text[1],
      "price": text[2],
      "change": text[3],
      "changePercentage": text[4],
      "marketCapital": text[5]
    }

    return StockEntry.formatStockEntry(prototype);
  }
}

export { StockEntry };