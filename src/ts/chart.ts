import { StockEntry } from "./stockEntry.js";
class Chart{
    
    public chartData: number[];

    constructor(firstData: StockEntry){
        this.chartData = [+firstData.price];
    }

    /**
     * adds new value to be displayed on chart
     * @param newData - number 
     */
     public addToChart(newData: number) {
        if(this.chartData.length === 10){
            this.chartData.shift();
            if(newData ===0){
                this.chartData.push(this.chartData[this.chartData.length-1]);
            }
            else{
                this.chartData.push(newData);
            }
        }
        else {
            this.chartData.push(newData);
        }  
    }

    /**
     * returns chart data as number[] to be displayed
     */
    public getChart(){
        return this.chartData;
    }

    /**
     * return element of Chart array
     * @param index index of element to be returned
     */
    public getElement(index: number){
        return this.chartData[index];
    }

    /**
     * returns size of Chart array
     */
    public getSize(){
        return +this.chartData.length;
    }

    /**
     * add data to chart from StockEntry
     * @param data StockEntry
     */
    public addFromStockEntry(data: StockEntry){
        let addData = +data.price;
        this.addToChart(addData);
    }
} export {Chart};