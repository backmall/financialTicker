class DeltasService{
  
  /**
   * Fetch the .csv file from `deltasLocation` and parse it
   * and return array of StockEntries
   * @param deltasLocation 
   */
  async fetchDeltas(deltasLocation: string){
      
    let loaded_data;

    await fetch(deltasLocation, { mode: 'no-cors' })
        .then(res => res.text())
        .then(data => loaded_data = this.parseCSV(data))
    
    return loaded_data;
  }

  /**
   * Pass in .csv file and parse it.
   * @param csv 
   */
  parseCSV(csv: string) {
    let seperated = csv.split(/\r?\n/);
    let output: any[] = [];

    // 11 lines define a new delta block (10 for the stocks + sleepTime)
    let index;
    for (index = 0; index < seperated.length; index += 11) {
      let sectionIndex: number;
      let deltaBlock: any = {};
      
      for (sectionIndex = 0; sectionIndex < 10; sectionIndex++){
        let line = seperated[index + sectionIndex];
        let split_line = line.split(",");
        
        if (split_line.length === 1) {
          // We reached end of file so return what we have
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