/*
    Voice Control for Kodi
    Copyright (C) 2017  Brian Faris

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

files = listFiles( 'Tasker' );
arr = files.split( '\n' );
numberOfFiles = arr.length;

javascriptsExist = false;
profilesExist = false;

for(i = 0; i < numberOfFiles; i++) {
		if ( arr[i] == '/storage/emulated/0/Tasker/javascripts' ) {
			javascriptsExist = true;
		}
		if ( arr[i] == '/storage/emulated/0/Tasker/profiles' ) {
			profilesExist = true;
		}		
}

if (javascriptsExist === false) {
	createDir("Tasker/javascripts", true, false);
}
if (profilesExist === false) {
	createDir("Tasker/profiles", true, false);
}

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/javascripts/voice.js';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/javascripts/voice.js", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/profiles/Voice.prf.xml';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/profiles/Voice.prf.xml", contents, false);

url = 'https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/setupVoiceControl.js';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
contents = xhttp.responseText;
writeFile("Tasker/setupVoiceControl.js", contents, false);

// Uncomment out the following line to display README; must have Chrome install on the Nvidia Shield
// browseURL("https://github.com/brianf21/Voice-Control-for-Kodi/blob/master/README.md");
