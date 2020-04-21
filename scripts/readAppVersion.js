// This plugin replaces text in a file with the app version from config.xml.

var replaceFileName = "index.html";

var fs = require("fs");
var path = require("path");

// Read xml file
function loadConfigXMLDoc(filePath) {
  var fs = require("fs");
  var xml2js = require("xml2js");
  var json = "";
  try {
    var fileData = fs.readFileSync(filePath, "ascii");
    var parser = new xml2js.Parser();
    parser.parseString(fileData.substring(0, fileData.length), function(
      err,
      result
    ) {
      //console.log("config.xml as JSON", JSON.stringify(result, null, 2));
      json = result;
    });
    console.log("File '" + filePath + "' was successfully read.");
    return json;
  } catch (ex) {
    console.log(ex);
  }
}

// Replace a string in file by specific one
function replaceStringInFile(filename, to_replace, replace_with) {
  var data = fs.readFileSync(filename, "utf8");

  var result = data.replace(new RegExp(to_replace, "g"), replace_with);
  fs.writeFileSync(filename, result, "utf8");
}

var configXMLPath = "config.xml";
var rawJSON = loadConfigXMLDoc(configXMLPath);
var version = rawJSON.widget.$.version || "1.0.0";
console.log("Version app currents:", version);

var rootDir = process.cwd();

// Start to replace version string in index.html file
if (rootDir) {
  var fileName = path.join(rootDir, "/www/" + replaceFileName);
  if (fs.existsSync(fileName)) {
    replaceStringInFile(fileName, "V1.0.0", version);
    console.log("Replaced version in file: " + fileName);
  }
}
