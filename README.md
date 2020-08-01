# financialTicker

Typescript website parsing csv files and displaying live changes in a table and a graph.  
Only basic design implemented as the main purpose of the task was to implement functionality.  
[DEMO](https://backmall.github.io/financialTicker/) -available here (github pages not always working with csv files)

### Setup  
For the purpose of development and testing Visual Studio Code has been used with _live-server_ extension.  
There may be some issues with **CORS** if code is executed locally.  
Any changes made to _.ts_ files should be compiled to _.js_ thanks to include statement in _tsconfig.json_

### Features
* loading and parsing .csv files
* rendering a grid based on the data
* updating data with every tick specified in deltas.csv
* rendering continously new data and starting from beginning at the end of .csv file.
* providing notifications after data has been changed in a form of UI flare
* displaying basic chart that updates with every tick

### Files
*financialTicker* - landing file using the rest of the scripts  
*snapshotService* - script to deal only with parsing _snapshot.csv_ data  
*deltasService* - script to deal only with parsing _deltas.csv_ data  
*stockEntry* - script to format data for easier use  
*charts* - script to manage and access charts data  
*deltaBlocksHandler* - script to perform all updates to data and loop loading/sending data to the website  
*visualiser* - script to manage all changes to visual side of the website  

### Preview
![GitHub Logo](/preview.png)

