/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  const pluckFirstLinePromise = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        var firstLine = String(data).split('\n');
        resolve(firstLine[0]);
      }
    });
  });
  return pluckFirstLinePromise;
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  const getStatusPromise = new Promise ((resolve, reject) => {
    request.get(url, function(error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response.statusCode);
      }
    });
  });
  return getStatusPromise;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
