class StockEntry {
    constructor(name, companyName, price, change, changePercentage, marketCapital) {
        this.name = name;
        this.companyName = companyName;
        this.price = price;
        this.change = change;
        this.changePercentage = changePercentage;
        this.marketCapital = marketCapital;
    }
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
    static formatStockEntry(entry) {
        return new StockEntry(entry.name, entry.companyName, entry.price, entry.change, entry.changePercentage, entry.marketCapital);
    }
    static makeStockEntryFromLine(text) {
        let prototype = {
            "name": text[0],
            "companyName": text[1],
            "price": text[2],
            "change": text[3],
            "changePercentage": text[4],
            "marketCapital": text[5]
        };
        return StockEntry.formatStockEntry(prototype);
    }
}
export { StockEntry };
