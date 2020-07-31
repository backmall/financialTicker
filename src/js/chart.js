class Chart {
    constructor(firstData) {
        this.chartData = [+firstData.price];
    }
    addToChart(newData) {
        if (this.chartData.length === 10) {
            this.chartData.shift();
            if (newData === 0) {
                this.chartData.push(this.chartData[this.chartData.length - 1]);
            }
            else {
                this.chartData.push(newData);
            }
        }
        else {
            this.chartData.push(newData);
        }
    }
    getChart() {
        return this.chartData;
    }
    getElement(index) {
        return this.chartData[index];
    }
    getSize() {
        return +this.chartData.length;
    }
    addFromStockEntry(data) {
        let addData = +data.price;
        this.addToChart(addData);
    }
}
export { Chart };
