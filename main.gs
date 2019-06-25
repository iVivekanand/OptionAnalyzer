var spreadSheet = SpreadsheetApp.openById("myspreadsheet");
var fnoTop10GainersLosers = spreadSheet.getSheetByName("FnOGainersLosers");
var gainersRange = fnoTop10GainersLosers.getRange("A3:L12");
var gainersRangeValues = gainersRange.getValues();
var losersRange = fnoTop10GainersLosers.getRange("A15:L24");
var losersRangeValues = losersRange.getValues();
var bucket = fnoTop10GainersLosers.getRange("E1").getValue();

function populateGainers() {
  var type = "fnoGainers1";
  switch(bucket) {
    case "Nifty":
      type = "niftyGainers1";
      break;
    case "Nifty Next":
      type = "jrNiftyGainers1";
      break;
    case "FnO Securities":
      type = "fnoGainers1";
      break;
    default:
      break;
  }
  var response = UrlFetchApp.fetch("http://main.xfiddle.com/c82d7951/passurl.php?url=https%3A%2F%2Fwww.nseindia.com%2Flive_market%2FdynaContent%2Flive_analysis%2Fgainers%2F" + type + ".json");
  var json = response.getContentText();
  var parsedJson = JSON.parse(json);

  fnoTop10GainersLosers.getRange("A1").setValue(parsedJson.time);
  for(var counter = 0; counter < 10; counter++) {
    gainersRangeValues[counter][0] = parsedJson.data[counter].symbol;
    gainersRangeValues[counter][1] = parsedJson.data[counter].series;
    gainersRangeValues[counter][2] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].openPrice + "\" , \",\", \"\"))";
    gainersRangeValues[counter][3] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].highPrice + "\" , \",\", \"\"))";
    gainersRangeValues[counter][4] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].lowPrice + "\" , \",\", \"\"))";
    gainersRangeValues[counter][5] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].ltp + "\" , \",\", \"\"))";
    gainersRangeValues[counter][6] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].previousPrice + "\" , \",\", \"\"))";
    gainersRangeValues[counter][7] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].netPrice + "\" , \",\", \"\"))";
    gainersRangeValues[counter][8] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].tradedQuantity + "\" , \",\", \"\"))";
    gainersRangeValues[counter][9] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].turnoverInLakhs + "\" , \",\", \"\"))";
    gainersRangeValues[counter][10] = parsedJson.data[counter].lastCorpAnnouncementDate;
    gainersRangeValues[counter][11] = parsedJson.data[counter].lastCorpAnnouncement;
  }
  gainersRange.setValues(gainersRangeValues);
}

function populateLosers() {
  var type = "fnoLosers1";
  switch(bucket) {
    case "Nifty":
      type = "niftyLosers1";
      break;
    case "Nifty Next":
      type = "jrNiftyLosers1";
      break;
    case "FnO Securities":
      type = "fnoLosers1";
      break;
    default:
      break;
  }
  
  var response = UrlFetchApp.fetch("http://main.xfiddle.com/c82d7951/passurl.php?url=https%3A%2F%2Fwww.nseindia.com%2Flive_market%2FdynaContent%2Flive_analysis%2Flosers%2F" + type + ".json");
  var json = response.getContentText();
  var parsedJson = JSON.parse(json);

  fnoTop10GainersLosers.getRange("A1").setValue(parsedJson.time);
  for(var counter = 0; counter < 10; counter++) {
    losersRangeValues[counter][0] = parsedJson.data[counter].symbol;
    losersRangeValues[counter][1] = parsedJson.data[counter].series;
    losersRangeValues[counter][2] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].openPrice + "\" , \",\", \"\"))";
    losersRangeValues[counter][3] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].highPrice + "\" , \",\", \"\"))";
    losersRangeValues[counter][4] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].lowPrice + "\" , \",\", \"\"))";
    losersRangeValues[counter][5] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].ltp + "\" , \",\", \"\"))";
    losersRangeValues[counter][6] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].previousPrice + "\" , \",\", \"\"))";
    losersRangeValues[counter][7] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].netPrice + "\" , \",\", \"\"))";
    losersRangeValues[counter][8] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].tradedQuantity + "\" , \",\", \"\"))";
    losersRangeValues[counter][9] = "=VALUE(SUBSTITUTE(\"" + parsedJson.data[counter].turnoverInLakhs + "\" , \",\", \"\"))";
    losersRangeValues[counter][10] = parsedJson.data[counter].lastCorpAnnouncementDate;
    losersRangeValues[counter][11] = parsedJson.data[counter].lastCorpAnnouncement;
  }
  losersRange.setValues(losersRangeValues);
}

function getGainersLosers() {
  populateGainers();
  populateLosers();
}

function getLotSize() {
  var lotSize = spreadSheet.getSheetByName("LotSize");
  var csvContent = UrlFetchApp.fetch("http://main.xfiddle.com/c82d7951/passurl.php?url=https%3A%2F%2Fwww.nseindia.com%2Fcontent%2Ffo%2Ffo_mktlots.csv").getContentText();
  var csvData = Utilities.parseCsv(csvContent);
  lotSize.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
  var lotSizeRange = lotSize.getRange(1, 2,csvData.length);
  var rangeToUpdate = lotSizeRange.getValues();
  for (var start = 0; start < csvData.length; start++) {
    rangeToUpdate[start][0] = rangeToUpdate[start][0].toString().trim();
  }
  lotSizeRange.setValues(rangeToUpdate);
}
