import { createTable, updateTable } from "./visualiser.js"
import { DeltaBlocksHandler } from "./deltaBlocksHandler.js";
import { DeltasService } from "./deltasService.js"
import { SnapshotService } from "./snapshotService.js";
import { StockEntry } from "./stockEntry.js";

let snapLocation = "../../data/snapshot.csv";
let deltasLocation = "../../data/Deltas.csv";

/**
 * Helper to prepare data from `snapshot.csv`
 */
async function prepareSnapshotData() {
  let snap = new SnapshotService();
  let data: StockEntry[] = await snap.fetchSnapshot(snapLocation);

  console.log("I've got the Snapshot data")
  console.log(data);

  return data;
}

/**
 * Helper to prepare data from `Deltas.csv`
 */
async function prepareDeltasData() {
  let delta = new DeltasService();
  let data: any = await delta.fetchDeltas(deltasLocation);

  console.log("I've got the Deltas data");
  console.log(data);

  return data;
}

/**
 * Entry point of FinancialTicker
 */
async function main() {
  // Load snapshotData and create the table
  let snapshotData = await prepareSnapshotData();
  createTable(document, snapshotData);

  // Load the deltasData
  let deltasData = await prepareDeltasData();

  // Init DeltaBlocksHandler and start it
  let deltaHanlder = new DeltaBlocksHandler(snapshotData, deltasData);
  deltaHanlder.startHandler();
}

window.onload = () => {
  main();
};
