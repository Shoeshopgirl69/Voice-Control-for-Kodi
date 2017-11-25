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

tpeDownload = local("%tpe_download").toLowerCase().trim().replace(/ /g,'+');
deviceIp = '10.178.0.118'; // IP of the computer running Radarr
networkShareIp = '10.178.100.1'; // IP of the file share
devicePort = '7878'; // Port that Radarr is listening on
shareName = 'movies'; // Share name of where movies should be saved
apiKeyTheMovieDB = '157ab3cbdf2b143cbf07caab87c6a5ba' // API key for themoviedb; you can replace and use your own apiKey
apiKeyRadarr = '4e1b73ddefa84185acfce6d261ed3790' // Replace with your Radarr's api key under setting > general


if (tk.global("%DISPLAYFLASH") == '') {
	tk.setGlobal("%DISPLAYFLASH",'false');
}

if (tk.global("%DISPLAYFLASH") == 'true') {
  flash('tpeDownload: ' + tpeDownload);
}

// Get movie info
url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=' + tpeDownload + '&language=en-US&api_key=' + apiKeyTheMovieDB;
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();

arr = JSON.parse(xhttp.responseText);

movieTitle = arr.results[0].title;
tmdbId = arr.results[0].id;
imagePath = "https://image.tmdb.org/t/p/w640" + arr.results[0].poster_path;
titleSlug = (movieTitle + " " + tmdbId).replace(/ /g,'-').toLowerCase();

flash("You are downloading '" + movieTitle + "'");

// Send movie info to Radarr - Radarr is configured to use Deluge to download the movie
jsonData = '{"qualityProfileID":"4","monitored":"true","rootFolderPath":"\\\\\\\\' + networkShareIp + '\\\\' + shareName + '","title":"' + movieTitle + '","images":[{"covertype":"poster","url":"' + imagePath + '"}],"titleslug":"' + titleSlug + '","tmdbid":"' + tmdbId + '"}';
url = 'http://' + deviceIp + ':' + devicePort + '/api/movie';
xhttp = new XMLHttpRequest();
method = 'POST'
xhttp.open(method, url, true);
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.setRequestHeader("X-Api-Key", apiKeyRadarr);

xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        alert(xhttp.responseText);
    }
}

xhttp.send(jsonData);





