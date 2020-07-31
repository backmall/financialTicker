class DeltasService {
    async fetchDeltas(deltasLocation) {
        let loaded_data;
        await fetch(deltasLocation, { mode: 'no-cors' })
            .then(res => res.text())
            .then(data => loaded_data = this.parseCSV(data));
        return loaded_data;
    }
    parseCSV(csv) {
        let seperated = csv.split(/\r?\n/);
        let output = [];
        let index;
        for (index = 0; index < seperated.length; index += 11) {
            let sectionIndex;
            let deltaBlock = {};
            for (sectionIndex = 0; sectionIndex < 10; sectionIndex++) {
                let line = seperated[index + sectionIndex];
                let split_line = line.split(",");
                if (split_line.length === 1) {
                    return output;
                }
                deltaBlock[sectionIndex] = split_line.slice(2);
            }
            deltaBlock["sleepTime"] = seperated[index + 10].split(",")[0];
            output.push(deltaBlock);
        }
        return output;
    }
}
export { DeltasService };
