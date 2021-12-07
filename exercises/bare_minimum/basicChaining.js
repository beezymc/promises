/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('needle');

var getGitHubProfile = function (user, callback) {
  var url = 'https://api.github.com/users/' + user;
  var options = {
    headers: { 'User-Agent': 'request' },
  };
  request.get(url, options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = Promise.promisify(getGitHubProfile);

var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      callback(err);
    } else {
      var firstLine = String(data).split('\n');
      callback(null, firstLine[0]);
    }
  });
};

var pluckFirstLineFromFileAsync = Promise.promisify(pluckFirstLineFromFile);

var writeJSONtoFilePath = function (filePath, text, callback) {
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null, { text });
    }
  });

  // fs.readFile(filePath, 'utf8', function (err, data) {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     var firstLine = String(data).split('\n');
  //     callback(null, firstLine[0]);
  //   }
  // });
};

var writeJSONtoFilePathAsync = Promise.promisify(writeJSONtoFilePath);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((user) => {
      return getGitHubProfileAsync(user)
        .then((profile) => {
          return writeJSONtoFilePathAsync(writeFilePath, JSON.stringify(profile));
        });
    })
    .catch((err) => {
      console.log(err);
    });
};


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
