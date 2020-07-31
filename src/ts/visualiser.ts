import { StockEntry } from "./stockEntry.js";
import { Chart } from "./chart.js"

let tableHeaders = [
  "Name",
  "Company Name",
  "Price",
  "Change",
  "Change %",
  "Market Capital"
];

let chartdata: Chart;

/**
 * Construct the full table to display stock information as a Table
 * @param table table element from `Document`
 * @param data data of all stocks in a `StockEntry[]`
 */
function createTable(document: Document, data: StockEntry[]) {
  
  let table = document.querySelector("table");
  generateTableHead(document, table);
  populateTable(data, document, table);

  return table;
}

/*
* OLD VERSION NOT WORKING WITH UI FLARE
async function updateTable2(document: Document, data: StockEntry[]) {
  var body = document.querySelector('tbody');
  let table = document.querySelector("table");

  let tbody = table.createTBody();
  for (let element of data) {
    let row = tbody.insertRow();
    let entry: any = element.toJSON();

    for (let key in entry) {
      let cell = row.insertCell();
      let text = document.createTextNode(entry[key])
      
      cell.appendChild(text);
    }
  }

  body.replaceWith(tbody);
  console.log("Updated Table");
}
*/


/**
 * Update table with new data from DeltaBlocksHandler
 * @param document document
 * @param data data from DeltaBlocksHandler
 */
async function updateTable(document: Document, data: StockEntry[]){
  var body = document.querySelector('tbody');
  let table = document.querySelector("table");

  let dataIndex = 0;
  for (let rowInTable of body.children) {
    let childrenOfRow = rowInTable.children;
  
    let priceFromCell = childrenOfRow[2];
    let changeFromCell = childrenOfRow[3];
    let changePercFromCell = childrenOfRow[4];

    let priceFromData = data[dataIndex].price;
    let changeFromData = data[dataIndex].change;
    let changePercFromData = data[dataIndex].changePercentage;


    if (priceFromCell.textContent !== priceFromData) {
      let priceCellNumber: number = +priceFromCell.textContent;
      let priceDataNumber: number = +priceFromData;

      priceFromCell.textContent = priceFromData;
      
      if(priceCellNumber > priceDataNumber){
        rowInTable.setAttribute("class", "redFlare");
      }
      else if(priceCellNumber < priceDataNumber){
        rowInTable.setAttribute("class", "greenFlare");
      } 
      else {
        rowInTable.setAttribute("class", "whiteFlare");
      }
    } 
    else {
      rowInTable.setAttribute("class", "whiteFlare");

    }

    if (changeFromCell.textContent !== changeFromData) {
      changeFromCell.textContent = changeFromData;
      //changeFromCell.setAttribute("style", "background-color: red;");
    }

    if (changePercFromCell.textContent !== changePercFromData) {
      changePercFromCell.textContent = changePercFromData;
      //changePercFromCell.setAttribute("style", "background-color: red;");

    }

    dataIndex++;
  }  
  console.log("Updated Table");

  //<-----------beginning of chart visualization ------------>
  let chart1 = document.querySelector('canvas');
  chartdata.addFromStockEntry(data[0]); //chart
  
  let ctx = chart1.getContext('2d');  
  chart1.width = 1000;
  chart1.height = 500;
  

  let xGrid = 10;
  let yGrid = 10;
  let cellSize = 10;

  /**
   *  draws grid on the canvas
   */
  function drawGrids(){
    ctx.beginPath();
    while(xGrid<chart1.height){
      ctx.moveTo(0, xGrid);
      ctx.lineTo(chart1.width, xGrid);
      xGrid += cellSize;
    }

    while(yGrid<chart1.width){
      ctx.moveTo(yGrid,0);
      ctx.lineTo(yGrid, chart1.height);
      yGrid += cellSize;
    }
    ctx.strokeStyle = "gray";
    ctx.stroke();
  }

  /**
   * method to return number of "blocks" on the grid
   * @param count number of blocks on the chart
   */
  function blocks(count: number){
    return count*10;
  }

/**
 * draws axis of the chart
 */
  function drawAxis(){

    let yPlot: number = 45;
    let pop: number = 0;
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(blocks(5),blocks(5));
    ctx.lineTo(blocks(5), blocks(45));
    ctx.lineTo(blocks(90), blocks(45));
    ctx.moveTo(blocks(5), blocks(45));
    
    //vertical scale every "pop" units
    for(let i=0; i<=10;i++){
      ctx.strokeText(pop, blocks(2), blocks(yPlot));
      yPlot -=5;
      pop+=180;
    }
    ctx.strokeText("GOOGLE Inc Stock Prize", blocks(40), blocks(48));
    ctx.stroke();
  }

  /**
   * draws chart
   */
  function drawChart(){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    
    var xPlot = 5;

    ctx.moveTo(blocks(5), blocks(45));
  
    for(let element of chartdata.chartData){
      let inBlocks = +element/35;
      ctx.strokeText(element, blocks(xPlot), blocks(45-inBlocks));
      ctx.lineTo(blocks(xPlot), blocks(45-inBlocks));
      xPlot +=8;
    }
    ctx.stroke();

  }
  drawGrids();
  drawAxis();
  drawChart();
//<--------------- end of chart visualization ---------->
}

/**
 * Generate header of the table.
 * @param table 
 */
function generateTableHead(document: Document, table: HTMLTableElement) {
  let thead = table.createTHead();
  let trow = thead.insertRow();

  for (let header of tableHeaders) {
    let th = document.createElement("th");
    let text = document.createTextNode(header);

    th.append(text);
    trow.append(th);
  }
}

/**
 * Populate the `table` in `document` with `data`.
 * @param data
 * @param document 
 * @param table 
 */
async function populateTable(
  data: StockEntry[], document: Document, table: HTMLTableElement
) {

  chartdata = new Chart(data[0]); //adding to element to chart

  let tbody = table.createTBody();
  for (let element of data) {
    let row = tbody.insertRow();
    let entry: any = element.toJSON();

    for (let key in entry) {
      let cell = row.insertCell();
      let text = document.createTextNode(entry[key])
      
      cell.appendChild(text);
    }
  }
}

export { createTable, updateTable };