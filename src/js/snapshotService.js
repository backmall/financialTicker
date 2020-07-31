import { StockEntry } from "./stockEntry.js";
class SnapshotService {
    async fetchSnapshot(snapshotLocation) {
        let loaded_data;
        await fetch(snapshotLocation, { mode: 'no-cors' })
            .then(res => res.text())
            .then(data => loaded_data = this.parseCSV(data));
        return loaded_data;
    }
    parseCSV(csv) {
        let seperated = csv.split(/\r?\n/);
        let output = [];
        if (seperated[0] !== "Name,Company Name,Price,Change,Chg %,Mkt Cap") {
            throw new Error("Selected CSV is not matching format!!!");
        }
        else {
            seperated.shift();
        }
        for (let line of seperated) {
            let split_line = line.split(",");
            if (split_line.length === 1) {
                continue;
            }
            output.push(StockEntry.makeStockEntryFromLine(split_line));
        }
        return output;
    }
}
export { SnapshotService };
