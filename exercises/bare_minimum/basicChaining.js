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

var writeJSONtoFilePath = function (filePath, text, callback) {
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null, { text });
    }
  });
};

var writeJSONtoFilePathAsync = Promise.promisify(writeJSONtoFilePath);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  //take the first line of the text in the file at the filepath, and return it
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((user) => {
      //take the username (that was in the first line) and send a get request to github for the profile.
      return getGitHubProfileAsync(user)
        .then((profile) => {
          //turn the profile into a string and write it into a new file at the writeFilePath.
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
