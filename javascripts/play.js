// 6/24/2017
tpePlay = local("%tpe_play").toLowerCase().trim().replace(/ /g,'+');
deviceIp = '127.0.0.1';
devicePort = '8080'
apiKey = '157ab3cbdf2b143cbf07caab87c6a5ba'

// Random phrases
/*
phrase = [
	'Did he fire six shots or only five? Well to tell you the truth in all this excitement I kind of lost track myself. But being this is a forty four Magnum, the most powerful handgun in the world and would blow your head clean off, you\'ve gotta ask yourself one question: Do I feel lucky? Well, do ya, punk?',
	'Take your stinking paws off me you damned dirty ape',
	'These aren\'t the droids you\'re looking for.',
	'My mama always said life was like a box of chocolates. You never know what you\'re gonna get.',
	'Bye bye boys. Have fun storming the castle.',
	'Gee, I\'m real sorry your mom blew up, Ricky',
	'Nobody puts baby in a corner.',
	'Hey head, say bye bye to the neck!',
	'Frankly, my dear, I don\'t give a damn.',
	'Hey, you guys!!',
	'Tony Stark was able to build this in a cave!',
	'Okay. You wanna play rough? Okay. Say hello to my little friend!',
	'I\'m gonna make him an offer he can\'t refuse.',
	'Toto, I\'ve a feeling we\'re not in Kansas anymore.',
	'I wish I knew how to quit you',
	'You don\'t understand! I coulda had class. I coulda been a contender. I could\'ve been somebody, instead of a bum, which is what I am.',
	'There\'s no crying in baseball.',
	'I see dead people',
	'I\'ll get you my pretty, and your little dog too.',
	'Old man, you give those dogs another piece of my food and I\'m gonna kick you \'til you\'re dead!'
];

say(phrase[randomIntFromInterval(0,19)]);
*/

if (tk.global("%DISPLAYFLASH") == '') {
	tk.setGlobal("%DISPLAYFLASH",'false');
}

if ( tk.global("%DISPLAYFLASH") == "true" ) {
  flash('tpe_play: ' + tpePlay);
}

// See if Kodi is running
url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.GetProperties","params":{"properties":["name","version"]},"id":1}';
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);

// Bring Kodi to the foreground
try {
	xhttp.send();
	loadApp('Kodi');
}
// Launch Kodi
catch(error) {
	loadApp('Kodi');
	wait(10000);
}

// Gets a properly formated name of the show or movie
url = 'https://api.themoviedb.org/3/search/multi?include_adult=false&page=1&query=' + tpePlay + '&language=en-US&api_key=' + apiKey;
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();
if ( tk.global("%DISPLAYFLASH") == "true" ) {
  	wait(10000);
	flash(xhttp.responseText);
}

arr = JSON.parse(xhttp.responseText);
mediaType = arr.results[0].media_type;

if ( tk.global("%DISPLAYFLASH") == "true" ) {
	flash(mediaType);
}

// Movies
if ( mediaType == 'movie' ) {
	movieTitle = encodeURIComponent(arr.results[0].title);
	if ( tk.global("%DISPLAYFLASH") == "true" ) {
		flash(movieTitle);
	}
	
	// See if movie is in Kodi's DB
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"VideoLibrary.GetMovies","params":{"filter":{"field":"title","operator":"is","value":"' + movieTitle + '"},"properties":["title"],"sort":{"order":"ascending","method":"label","ignorearticle":true}},"id":"libMovies"}';
	method = 'GET'
	xhttp = new XMLHttpRequest();
	xhttp.open(method, url, false);
	xhttp.send();
	arr = JSON.parse(xhttp.responseText);

	// If not in Kodi's DB insult the wife
	if ( xhttp.responseText == '{"id":"libMovies","jsonrpc":"2.0","result":{"limits":{"end":0,"start":0,"total":0}}}' ) {
		traktUrl = encodeURIComponent("http://api.trakt.tv/search/movie?limit=1&page=1&query=" + movieTitle).replace(/%/g,'%25');
		url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id": 1, "jsonrpc": "2.0", "method": "Files.GetDirectory","params":{"directory":"plugin://plugin.video.exodus/?action=moviePage%26url=' + traktUrl + '" } }';
		method = 'GET'
		xhttp = new XMLHttpRequest();
		xhttp.open(method, url, false);
		xhttp.send();

		arr = JSON.parse(xhttp.responseText);
		movieName = encodeURIComponent(arr.result.files[0].file);
												
		url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file":"' + movieName + '"},"options":{"resume":true}}}';

		method = 'GET'
		xhttp = new XMLHttpRequest();
		xhttp.open(method, url, false);
		xhttp.send();
	}

	// Play local
	else {
		movieId = arr.result.movies[0].movieid;
		url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"movieid":' + movieId + '},"options":{"resume":true}}}'
		method = 'GET'
		xhttp = new XMLHttpRequest();
		xhttp.open(method, url, false);
		xhttp.send();
	}
}

// TV
if ( mediaType == 'tv' ) {
	tvShowTitle = arr.results[0].name;
	tvShowTitleEncoded = encodeURIComponent(arr.results[0].name);
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"VideoLibrary.GetTVShows","params":{"filter":{"field":"title","operator":"is","value":"' + tvShowTitleEncoded + '"},"properties":["title"],"sort":{"order":"ascending","method":"label","ignorearticle":true}},"id":"libTvShows"}';
	method = 'GET'
	xhttp = new XMLHttpRequest();
	xhttp.open(method, url, false);
	xhttp.send();

	arr = JSON.parse(xhttp.responseText);

	// See if the show is in Kodi's DB
	if ( xhttp.responseText != '{"id":"libTvShows","jsonrpc":"2.0","result":{"limits":{"end":0,"start":0,"total":0}}}' ) {
		tvshowId = arr.result.tvshows[0].tvshowid;
		url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"VideoLibrary.GetEpisodes","params":{"filter":{"field":"playcount","operator":"is","value":"0"},"limits":{"end":1},"tvshowid":' + tvshowId + ',"properties":["season","episode","lastplayed","firstaired","resume","title","dateadded"],"sort":{"method":"episode","order":"ascending"}},"id":"libTvShows"}';
		method = 'GET'
		xhttp = new XMLHttpRequest();
		xhttp.open(method, url, false);
		xhttp.send();
	}
	
	// If not local, search exodus
	if ( xhttp.responseText == '{"id":"libTvShows","jsonrpc":"2.0","result":{"limits":{"end":0,"start":0,"total":0}}}' ) {
		url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id":1,"jsonrpc":"2.0","method": "Files.GetDirectory","params":{"directory":"plugin://plugin.video.exodus/?action=calendar%26url=progress"}}}';
		method = 'GET';
		xhttp = new XMLHttpRequest();
		xhttp.open(method, url, false);
		xhttp.send();

		arr = JSON.parse(xhttp.responseText);
		arr_length = arr.result.files.length;

		for(i = 0; i < arr.result.files.length; i++) {
			if ( arr.result.files[i].label.startsWith(tvShowTitle) ) {
				showInfo = encodeURIComponent(arr.result.files[i].file);
				url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id": 1, "jsonrpc": "2.0", "method": "Files.GetDirectory","params":{"directory":"' + showInfo + '" } }';
				method = 'GET'
				xhttp = new XMLHttpRequest();
				xhttp.open(method, url, false);
				xhttp.send();
				
				arr = JSON.parse(xhttp.responseText);
				episodeInfo = encodeURIComponent(arr.result.files[0].file);
			}
		}

		try {
			url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file":"' + episodeInfo + '"},"options":{"resume":true}}}';
			method = 'GET';
			xhttp = new XMLHttpRequest();
			xhttp.open(method, url, false);
			xhttp.send();	
		}
		
		catch(error) {
			// flash(error.message);
			if ( error.message == 'episodeInfo is not defined' ){
				traktUrl = encodeURIComponent("http://api.trakt.tv/search/show?limit=1&page=1&query=" + tvShowTitleEncoded).replace(/%/g,'%25');
				url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id": 1, "jsonrpc": "2.0", "method": "Files.GetDirectory","params":{"directory":"plugin://plugin.video.exodus/?action=tvshowPage%26url=' + traktUrl + '" } }';
				method = 'GET'
				xhttp = new XMLHttpRequest();
				xhttp.open(method, url, false);
				xhttp.send();
			
				arr = JSON.parse(xhttp.responseText);

				showInfo = encodeURIComponent(arr.result.files[0].file.replace("action=seasons","action=episodes") + "&season=1");
				
				url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id": 1, "jsonrpc": "2.0", "method": "Files.GetDirectory","params":{"directory":"' + showInfo + '" } }';
				method = 'GET'
				xhttp = new XMLHttpRequest();
				xhttp.open(method, url, false);
				xhttp.send();
			
				arr = JSON.parse(xhttp.responseText);

				episodeInfo = encodeURIComponent(arr.result.files[0].file);	
				
				url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file":"' + episodeInfo + '"},"options":{"resume":true}}}';
				method = 'GET'
				xhttp = new XMLHttpRequest();
				xhttp.open(method, url, false);
				xhttp.send();				
			}
		}
	}
	
	// Play local episode
	else {
		arr = JSON.parse(xhttp.responseText);
		episodeId = arr.result.episodes[0].episodeid;
		url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"id":1,"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"episodeid":' + episodeId + '},"options":{"resume":true}}}';
		method = 'GET'
		xhttp = new XMLHttpRequest();
		xhttp.open(method, url, false);
		xhttp.send();
	}
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


