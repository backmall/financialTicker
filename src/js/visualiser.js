import { Chart } from "./chart.js";
let tableHeaders = [
    "Name",
    "Company Name",
    "Price",
    "Change",
    "Change %",
    "Market Capital"
];
let chartdata;
function createTable(document, data) {
    let table = document.querySelector("table");
    generateTableHead(document, table);
    populateTable(data, document, table);
    return table;
}
async function updateTable(document, data) {
    var body = document.querySelector('tbody');
    let table = document.querySelector("table");
    let chart1 = document.querySelector('canvas');
    chartdata.addFromStockEntry(data[0]);
    let ctx = chart1.getContext('2d');
    chart1.width = 1000;
    chart1.height = 500;
    let xGrid = 10;
    let yGrid = 10;
    let cellSize = 10;
    function drawGrids() {
        ctx.beginPath();
        while (xGrid < chart1.height) {
            ctx.moveTo(0, xGrid);
            ctx.lineTo(chart1.width, xGrid);
            xGrid += cellSize;
        }
        while (yGrid < chart1.width) {
            ctx.moveTo(yGrid, 0);
            ctx.lineTo(yGrid, chart1.height);
            yGrid += cellSize;
        }
        ctx.strokeStyle = "gray";
        ctx.stroke();
    }
    function blocks(count) {
        return count * 10;
    }
    function drawAxis() {
        let yPlot = 45;
        let pop = 0;
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(blocks(5), blocks(5));
        ctx.lineTo(blocks(5), blocks(45));
        ctx.lineTo(blocks(90), blocks(45));
        ctx.moveTo(blocks(5), blocks(45));
        for (let i = 0; i <= 10; i++) {
            ctx.strokeText(pop, blocks(2), blocks(yPlot));
            yPlot -= 5;
            pop += 180;
        }
        ctx.strokeText("GOOGLE Inc Stock Prize", blocks(40), blocks(48));
        ctx.stroke();
    }
    function drawChart() {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        var xPlot = 5;
        ctx.moveTo(blocks(5), blocks(45));
        for (let element of chartdata.chartData) {
            let inBlocks = +element / 35;
            ctx.strokeText(element, blocks(xPlot), blocks(45 - inBlocks));
            ctx.lineTo(blocks(xPlot), blocks(45 - inBlocks));
            xPlot += 8;
        }
        ctx.stroke();
    }
    drawGrids();
    drawAxis();
    drawChart();
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
            let priceCellNumber = +priceFromCell.textContent;
            let priceDataNumber = +priceFromData;
            priceFromCell.textContent = priceFromData;
            if (priceCellNumber > priceDataNumber) {
                rowInTable.setAttribute("class", "redFlare");
            }
            else if (priceCellNumber < priceDataNumber) {
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
        }
        if (changePercFromCell.textContent !== changePercFromData) {
            changePercFromCell.textContent = changePercFromData;
        }
        dataIndex++;
    }
    console.log("Updated Table");
}
function generateTableHead(document, table) {
    let thead = table.createTHead();
    let trow = thead.insertRow();
    for (let header of tableHeaders) {
        let th = document.createElement("th");
        let text = document.createTextNode(header);
        th.append(text);
        trow.append(th);
    }
}
async function populateTable(data, document, table) {
    chartdata = new Chart(data[0]);
    let tbody = table.createTBody();
    for (let element of data) {
        let row = tbody.insertRow();
        let entry = element.toJSON();
        for (let key in entry) {
            let cell = row.insertCell();
            let text = document.createTextNode(entry[key]);
            cell.appendChild(text);
        }
    }
}
export { createTable, updateTable };
