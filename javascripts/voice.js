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

function main() {

	var KodiIP = '127.0.0.1';
	var KodiPort = '8080'
	var RadarrIP = '0.0.0.0';
	var RadarrPort = '7878';
	var DelugeIP = '0.0.0.0';
	var DelugePort = '8112';
	var NetworkShareIP = '0.0.0.0'; // The hostname or IP for Radarr to save to. Example: \\This Part of the UNC\sharename
	var ShareName = 'movies'; // The share name for Radarr. Example: \\hostname\This part of the UNC
	var apiKeyTheMovieDB = ''; // If this stops working, you can get your own key
	var apiKeyRadarr = ''; // Replace with your Radarr's api key under setting > general
	
	payload = local("%tpe_voice").toLowerCase().trim();

	if (tk.global('%DISPLAYFLASH') == '') {
		tk.setGlobal('%DISPLAYFLASH','false');
	}
	
	if (tk.global('%PLUGIN') == '') {
		tk.setGlobal('%PLUGIN','plugin.video.exodus');
	}
	
	var flashStatus = tk.global('%DISPLAYFLASH');
	var videoPlugin = tk.global('%PLUGIN');

	var command = payload.replace(/\ .*/,'');
	var re = new RegExp(command, "g");
	var payload = payload.replace(re,'');
	payload = payload.trim();
	var JSONData;
	var method;
	var url;
	var xhttp;
	var arr;
	
	if ( flashStatus == 'true' ) {
		flash(command);
		flash(payload);
		flash(videoPlugin);
	}

	function sendJSONData() {
		
		if ( flashStatus == 'true' ) {
			flash(JSONData);
		}
		
		method = 'POST';
		url = 'http://' + KodiIP + ':' + KodiPort + '/jsonrpc';
		xhttp = new XMLHttpRequest();
		xhttp.open(method, url, false);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send(JSONData);
		arr = JSON.parse(xhttp.responseText);
		
		if ( flashStatus == "true" ) {
			flash(xhttp.responseText);
		}
	}

	function getPlayerID() {
		JSONData = '{"jsonrpc":"2.0","method":"Player.GetActivePlayers","id":1}';
		sendJSONData();
		player_id = arr.result[0].playerid;
	}
	
	if (command == 'play') {
		// Gets a properly formated name of the show or movie
		url = 'https://api.themoviedb.org/3/search/multi?include_adult=false&page=1&query=' + payload + '&language=en-US&api_key=' + apiKeyTheMovieDB;
		method = 'GET'
		xhttp = new XMLHttpRequest();
		xhttp.open(method, url, false);
		xhttp.send();

		arr = JSON.parse(xhttp.responseText);
		mediaType = arr.results[0].media_type;

		if ( flashStatus == "true" ) {
			flash(mediaType);
		}

		// Movies
		if ( mediaType == 'movie' ) {
			movieTitle = arr.results[0].title;
			
			// Query Kodi for movie title
			JSONData = '{"jsonrpc":"2.0","method":"VideoLibrary.GetMovies","params":{"filter":{"field":"title","operator":"is","value":"' + movieTitle + '"},"properties":["title"],"sort":{"order":"ascending","method":"label","ignorearticle":true}},"id":"libMovies"}';
			sendJSONData();
			
			// If not found, query plugin
			if ( xhttp.responseText == '{"id":"libMovies","jsonrpc":"2.0","result":{"limits":{"end":0,"start":0,"total":0}}}' ) {
				
				if ( flashStatus == "true" ) {
					flash('Querying plugin');
				}
				
				traktUrl = encodeURIComponent("http://api.trakt.tv/search/movie?limit=1&page=1&query=" + movieTitle);
				JSONData = '{"id": 1, "jsonrpc": "2.0", "method": "Files.GetDirectory","params":{"directory":"plugin://' + videoPlugin + '/?action=moviePage&url=' + traktUrl + '" } }';
				sendJSONData();
				movieName = arr.result.files[0].file;
				JSONData = '{"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file":"' + movieName + '"},"options":{"resume":true}}}';
				sendJSONData();
			}

			// Play local
			else {
				if ( flashStatus == 'true' ) {
					flash('Local media');
				}				
				movieId = arr.result.movies[0].movieid;
				url = 'http://' + KodiIP + ':' + KodiPort + '/jsonrpc';
				JSONData = '{"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"movieid":' + movieId + '},"options":{"resume":true}}}';
				sendJSONData();			
			}
		}

		// TV
		if ( mediaType == 'tv' ) {
			tvShowTitle = arr.results[0].name;
			tvShowTitleEncoded = arr.results[0].name;
			JSONData = '{"jsonrpc":"2.0","method":"VideoLibrary.GetTVShows","params":{"filter":{"field":"title","operator":"is","value":"' + tvShowTitleEncoded + '"},"properties":["title"],"sort":{"order":"ascending","method":"label","ignorearticle":true}},"id":"libTvShows"}';
			sendJSONData();

			// See if there is an unwatched episode locally
			if ( xhttp.responseText != '{"id":"libTvShows","jsonrpc":"2.0","result":{"limits":{"end":0,"start":0,"total":0}}}' ) {
				tvshowId = arr.result.tvshows[0].tvshowid;
				JSONData = '{"jsonrpc":"2.0","method":"VideoLibrary.GetEpisodes","params":{"filter":{"field":"playcount","operator":"is","value":"0"},"limits":{"end":1},"tvshowid":' + tvshowId + ',"properties":["season","episode","lastplayed","firstaired","resume","title","dateadded"],"sort":{"method":"episode","order":"ascending"}},"id":"libTvShows"}';
				sendJSONData();
			}
			
			// Look for the show in Exodus and find the next unwatched episode in Trakt
			if ( xhttp.responseText == '{"id":"libTvShows","jsonrpc":"2.0","result":{"limits":{"end":0,"start":0,"total":0}}}' ) {
				JSONData = '{"id":1,"jsonrpc":"2.0","method": "Files.GetDirectory","params":{"directory":"plugin://' + videoPlugin + '/?action=calendar&url=progress"}}}';
				sendJSONData();

				for(i = 0; i < arr.result.files.length; i++) {
					if ( arr.result.files[i].label.startsWith(tvShowTitle) ) {
						showInfo = (arr.result.files[i].file);
						JSONData = '{"id": 1, "jsonrpc": "2.0", "method": "Files.GetDirectory","params":{"directory":"' + showInfo + '" } }';
						sendJSONData();
						episodeInfo = (arr.result.files[0].file);
					}
				}

				try {
					JSONData = '{"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file":"' + episodeInfo + '"},"options":{"resume":true}}}';
					sendJSONData();	
				}
				
				catch(error) {
					if ( error.message == 'episodeInfo is not defined' ){
						traktUrl = encodeURIComponent("http://api.trakt.tv/search/show?limit=1&page=1&query=" + tvShowTitleEncoded);
						JSONData = '{"id": 1, "jsonrpc": "2.0", "method": "Files.GetDirectory","params":{"directory":"plugin://' + videoPlugin + '/?action=tvshowPage&url=' + traktUrl + '" } }';
						sendJSONData();

						showInfo = (arr.result.files[0].file.replace("action=seasons","action=episodes") + "&season=1");
						JSONData = '{"id": 1, "jsonrpc": "2.0", "method": "Files.GetDirectory","params":{"directory":"' + showInfo + '" } }';
						sendJSONData();

						episodeInfo = (arr.result.files[0].file);	
						JSONData = '{"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file":"' + episodeInfo + '"},"options":{"resume":true}}}';
						sendJSONData();				
					}
				}
			}
			
			// Play local episode
			else {
				episodeId = arr.result.episodes[0].episodeid;
				JSONData = '{"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"episodeid":' + episodeId + '},"options":{"resume":true}}}';
				sendJSONData();
			}
		}
	}

	else if ( command == 'launch' ) {
		if ( payload == 'netflix' ) {
			loadApp('Netflix');
		}
		
		if ( payload == 'kodi' ) {
			loadApp('Kodi');
		}

		if ( payload == 'tasker' ) {
			loadApp('Tasker');
		}

		if ( payload == 'live' ) {
			loadApp('Live Channels');
		}

		if ( payload == 'plex' ) {
			loadApp('Plex');
		}

		if ( payload == 'youtube' ) {
			loadApp('YouTube');
		}

		if ( payload == 'home' ) {
			loadApp('Home Screen');
		}

		if ( payload == 'hulu' ) {
			loadApp('Hulu');
		}

		if ( payload == 'fan tv' ) {
			loadApp('Fan TV');
		}

		if ( payload =='radar' ) {
			url = 'http://' + RadarrIP + ':' + RadarrPort;
			browseURL(url);
		}

		if ( payload =='deluge' ) {
			url = 'http://' + DelugeIP + ':' + DelugePort;
			browseURL(url);
		}
	}

	else if ( command == 'download' ){
		// Get movie info
		url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=' + payload + '&language=en-US&api_key=' + apiKeyTheMovieDB;
		method = 'GET'
		xhttp = new XMLHttpRequest();
		xhttp.open(method, url, false);
		xhttp.send();
		arr = JSON.parse(xhttp.responseText);

		movieTitle = arr.results[0].title;
		tmdbId = arr.results[0].id;
		imagePath = "https://image.tmdb.org/t/p/w640" + arr.results[0].poster_path;
		titleSlug = (movieTitle + " " + tmdbId).replace(/ /g,'-').toLowerCase();

		// Send movie info to Radarr - Radarr is configured to use Deluge to download the movie
		JSONData = '{"qualityProfileID":"4","monitored":"true","rootFolderPath":"\\\\\\\\' + NetworkShareIP + '\\\\' + ShareName + '","title":"' + movieTitle + '","images":[{"covertype":"poster","url":"' + imagePath + '"}],"titleslug":"' + titleSlug + '","tmdbid":"' + tmdbId + '"}';
		url = 'http://' + RadarrIP + ':' + RadarrPort + '/api/movie';
		xhttp = new XMLHttpRequest();
		method = 'POST'
		xhttp.open(method, url, true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.setRequestHeader("X-Api-Key", apiKeyRadarr);
		xhttp.send(JSONData);
	}

	else if ( command == 'press' ) {
		if ( payload == 'pause' || payload == 'resume' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Player.GetActivePlayers","id":1}';
			sendJSONData();
			getPlayerID();
			JSONData = '{"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":' + player_id + '},"id":1}';
			sendJSONData();
		}
		
		if ( payload == 'context' || payload == 'long press' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Input.ContextMenu","id":1}';
			sendJSONData();
		}

		if ( payload == 'stop' ) {
			getPlayerID();
			JSONData = '{"jsonrpc":"2.0","method":"Player.Stop","params":{ "playerid": ' + player_id + '},"id":1}';
			sendJSONData();
		}

		if ( payload == 'jump back' ) {
			getPlayerID();
			JSONData = '{"jsonrpc":"2.0","method":"Player.Seek","id":1,"params":{"playerid": ' + player_id + ',"value":"bigbackward"},"id":1}';
			sendJSONData();
		}

		if ( payload == 'skip back' ) {
			getPlayerID();
			JSONData = '{"jsonrpc":"2.0","method":"Player.Seek","id":1,"params":{"playerid": ' + player_id + ',"value":"smallbackward"},"id":1}';
			sendJSONData();
		}

		if ( payload == 'jump ahead' ) {
			getPlayerID();
			JSONData = '{"jsonrpc":"2.0","method":"Player.Seek","id":1,"params":{"playerid":' + player_id + ',"value":"bigforward"},"id":1}';
			sendJSONData();
		}

		if ( payload == 'skip ahead' ) {
			getPlayerID();
			JSONData = '{"jsonrpc":"2.0","method":"Player.Seek","id":1,"params":{"playerid":' + player_id + ',"value":"smallforward"},"id":1}';
			sendJSONData();
		}

		if ( payload == 'flash off' && flashStatus == 'true' ) {
			tk.setGlobal("%DISPLAYFLASH","false");
		}

		if ( payload == 'flash on' && flashStatus == 'false' ) {
			tk.setGlobal("%DISPLAYFLASH","true");
		}
	
		if ( payload == 'troubleshooting on' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Settings.SetSettingValue", "params":{"setting":"debug.showloginfo","value":true},"id":1}';
			sendJSONData();
		}

		if ( payload == 'troubleshooting off' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Settings.SetSettingValue", "params":{"setting":"debug.showloginfo","value":false},"id":1}';
			sendJSONData();
		}
	
		if ( payload == 'select' || payload == 'enter' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Input.Select","id":1}';
			sendJSONData();
		}

		if ( payload == 'back' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Input.Back","id":1}';
			sendJSONData();
		}

		if ( payload == 'up' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Input.Up","id":1}';
			sendJSONData();
		}

		if ( payload == 'down' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Input.down","id":1}';
			sendJSONData();
		}

		if ( payload == 'right' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Input.right","id":1}';
			sendJSONData();
		}

		if ( payload == 'left' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Input.Left","id":1}';
			sendJSONData();
		}

		if ( payload == 'home' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Input.Home","id":1}';
			sendJSONData();
		}

		if ( payload == 'settings' ) {
			JSONData = '{"jsonrpc":"2.0","method":"GUI.ActivateWindow","params":{"window":"settings"},"id":1}';
			sendJSONData();
		}

		if ( payload == 'streamer' ) {
			JSONData = '{"jsonrpc":"2.0","method":"GUI.ActivateWindow","params":{"window":"videos","parameters":["plugin://' + videoPlugin + '"]},"id":1}';
			sendJSONData();
		}

		if ( payload == 'movies' ) {
			JSONData = '{"jsonrpc":"2.0","method":"GUI.ActivateWindow","params":{"window":"videos","parameters":["videodb://movies/titles"]},"id":1}';
			sendJSONData();
		}

		if ( payload == 'tv shows' ) {
			JSONData = '{"jsonrpc":"2.0","method":"GUI.ActivateWindow","params":{"window":"videos","parameters":["videodb://tvshows/titles"]},"id":1}';
			sendJSONData();
		}

		if ( payload == 'scan' ) {
			JSONData = '{"jsonrpc":"2.0","method":"VideoLibrary.Scan","id":1}';
			sendJSONData();
		}

		if ( payload == 'clean' ) {
			JSONData = '{"jsonrpc":"2.0","method":"VideoLibrary.Clean","id":1}';
			sendJSONData();
		}
		
		if ( payload == 'exit' ) {
			JSONData = '{"jsonrpc":"2.0","method":"Application.Quit","id":1}';
			sendJSONData();
		}
		
		if ( payload == 'exodus' ) {
			tk.setGlobal("%PLUGIN",'plugin.video.exodus');
		}
		
		if ( payload == 'neptune' ) {
			tk.setGlobal("%PLUGIN",'plugin.video.neptune');
		}
	}
	
	// PVR
	else if ( command == 'show' ) {
		JSONData = '{"jsonrpc": "2.0", "method": "PVR.GetChannels", "params": {"channelgroupid": "alltv", "properties" :["uniqueid"]},"id": 1}';
		sendJSONData();
		for(labels in arr.result.channels) {
			if ( payload.toUpperCase() == arr.result.channels[labels].label.toUpperCase() ) {
				JSONData = '{"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"channelid":' + arr.result.channels[labels].channelid + '}}}';
				sendJSONData();
			}
		}
	}
	
	return 0;
}

main();
