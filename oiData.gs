var spreadSheet = SpreadsheetApp.openById("myspreadsheet");
var oiData = spreadSheet.getSheetByName("OI_Data");
var ranges = ["H21:V27", "H29:V35", "H37:V43", "H45:V51", "H53:V59", "H61:V67", "H69:V75", "H77:V84", "H85:V91", "H93:V99", "H101:V107"];
var rangeStart = 0;              

function getOiData() {  
  for(var dateCounter = 21; dateCounter < 107; dateCounter = dateCounter + 8) {
    var date = oiData.getRange(dateCounter, 7).getValue();
    var csvString = UrlFetchApp.fetch("http://main.xfiddle.com/c82d7951/passurl.php?url=https%3A%2F%2Fwww.nseindia.com%2Fcontent%2Fnsccl%2Ffao_participant_oi_" + date + ".csv");
    var data = Utilities.parseCsv(csvString);
    try {
      oiData.getRange(ranges[rangeStart]).clear();
      oiData.getRange(ranges[rangeStart++]).setValues(data);
    }
    catch(e) {
      Logger.log(e.message);
      continue;
    }
  }
}
