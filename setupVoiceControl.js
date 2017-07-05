files = listFiles( 'Tasker' );
arr = files.split( '\n' );
flash( 'Found ' + arr.length + ' files' );
numberOfFiles = arr.length;

javascriptsExist = false;
tasksExist = false;
profilesExist = false;

for(i = 0; i < numberOfFiles; i++) {
		if ( arr[i] == '/storage/emulated/0/Tasker/javascripts' ) {
			javascriptsExist = true;
		}
		if ( arr[i] == '/storage/emulated/0/Tasker/tasks' ) {
			tasksExist = true;
		}
		if ( arr[i] == '/storage/emulated/0/Tasker/profiles' ) {
			profilesExist = true;
		}		
}

if (javascriptsExist === false) {
	createDir("Tasker/javascripts", true, false);
}

if (tasksExist === false) {
	createDir("Tasker/tasks", true, false);
}

if (profilesExist === false) {
	createDir("Tasker/profiles", true, false);
}

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/javascripts/download.js';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/javascripts/download.js", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/javascripts/update.js';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/javascripts/update.js", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/javascripts/launch.js';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/javascripts/launch.js", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/javascripts/perform.js';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/javascripts/perform.js", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/javascripts/play.js';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/javascripts/play.js", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/tasks/Launch_Task.tsk.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/tasks/Launch_Task.tsk.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/tasks/Perform_Task.tsk.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/tasks/Perform_Task.tsk.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/tasks/Play_Task.tsk.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/tasks/Play_Task.tsk.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/tasks/Wake_Task.tsk.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/tasks/Wake_Task.tsk.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/tasks/Download_Task.tsk.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/tasks/Download_Task.tsk.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/tasks/Update_Task.tsk.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/tasks/Update_Task.tsk.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/tasks/Setup_Task.tsk.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/tasks/Setup_Task.tsk.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/profiles/Download.prf.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/profiles/Download.prf.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/profiles/Launch.prf.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/profiles/Launch.prf.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/profiles/Perform.prf.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/profiles/Perform.prf.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/profiles/Perform.prf.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/profiles/Perform.prf.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/profiles/Play.prf.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/profiles/Play.prf.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/profiles/Wake.prf.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/profiles/Wake.prf.xml", contents, false);

// Uncomment out the following line to display README
// browseURL("https://github.com/brianf21/Voice-Control-for-Kodi/blob/master/README.md");