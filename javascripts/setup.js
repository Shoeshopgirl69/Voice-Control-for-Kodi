createDir("Tasker/javascripts.backup", true, false);
createDir("Tasker/javascripts", true, false);
contents = readFile("Tasker/javascripts/download.js");
writeFile("Tasker/javascripts.backup/download.js", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/javascripts/download.js';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/javascripts/download.js", contents, false);

contents = readFile("Tasker/javascripts/launch.js");
writeFile("Tasker/javascripts.backup/launch.js", contents, false);

contents = readFile("Tasker/javascripts/perform.js");
writeFile("Tasker/javascripts.backup/perform.js", contents, false);

contents = readFile("Tasker/javascripts/play.js");
writeFile("Tasker/javascripts.backup/play.js", contents, false);

contents = readFile("Tasker/javascripts/update.js");
writeFile("Tasker/javascripts.backup/update.js", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/javascripts/update.js';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/javascripts/update.js", contents, false);


say('got the filesystem');

// browseURL("https://github.com/brianf21/Voice-Control-for-Kodi/blob/master/README.md");
