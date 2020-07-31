import { createTable } from "./visualiser.js";
import { DeltaBlocksHandler } from "./deltaBlocksHandler.js";
import { DeltasService } from "./deltasService.js";
import { SnapshotService } from "./snapshotService.js";
let snapLocation = "../../data/snapshot.csv";
let deltasLocation = "../../data/Deltas.csv";
async function prepareSnapshotData() {
    let snap = new SnapshotService();
    let data = await snap.fetchSnapshot(snapLocation);
    console.log("I've got the Snapshot data");
    console.log(data);
    return data;
}
async function prepareDeltasData() {
    let delta = new DeltasService();
    let data = await delta.fetchDeltas(deltasLocation);
    console.log("I've got the Deltas data");
    console.log(data);
    return data;
}
async function main() {
    let snapshotData = await prepareSnapshotData();
    createTable(document, snapshotData);
    let deltasData = await prepareDeltasData();
    let deltaHanlder = new DeltaBlocksHandler(snapshotData, deltasData);
    deltaHanlder.startHandler();
}
window.onload = () => {
    main();
};
