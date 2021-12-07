/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  //use fsreadfile, taking in the filepath as the first argument, with a callback containing the error and data as the second argument.
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      callback(err);
    } else {
      //data is the list of files,
      // split the list of files and "This is a file to read"
      var firstLine = String(data).split('\n');
      callback(null, firstLine[0]);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request.get(url, function(error, response) {
    if (error) {
      callback(error);
    } else {
      callback(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
