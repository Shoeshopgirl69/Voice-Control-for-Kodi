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

var tpe_perform = local("%tpe_perform").toLowerCase().trim()
var deviceIp = '127.0.0.1';
var devicePort = '8080'

if (tk.global("%DISPLAYFLASH") == '') {
	tk.setGlobal("%DISPLAYFLASH",'false');
}

if ( tk.global("%DISPLAYFLASH") == "true" ) {
	flash('Perform Script');
	flash('Command: ' + tpe_perform);
	flash(local("%tpe_perform"));
}

/*
phrase = [
	'Turning lemonade into lemons since 1981',
	'I wish there was a way to know you\'re in the good old days before you\'ve actually left them.',
	'It\'s not that simple. You know what makes a good person good? When a good person does something bad, they own up to it. They try to learn something from it and they move on.',
	'This is not a dictatorship. This is America. Give me liberty, or give me meth.',
	'Do I tell you about EMT shit? Leave the god damn stealing to the experts.',
	'Morning, chief, would my apache brother like toast, or does he only eat maize?',
	'Set \'em up, bar keep. My liver\'s been on vacation and I got a months worth of drinking to catch up on.',
	'Red velvet is bullshit.',
	'An understudy, it\'s like a fancy word for disappointment.',
	'THE MAN WHO PASSES THE SENTENCE SHOULD SWING THE SWORD.',
	'WHEN YOU PLAY THE GAME OF THRONES, YOU WIN OR YOU DIE.',
	'WHEN DEAD MEN AND WORSE COME HUNTING … YOU THINK it MATTERS WHO SITS ON THE IRON THRONE?',
	'THE MAD KING DID AS HE LIKED. HAS YOUR UNCLE JAIME EVER TOLD YOU WHAT HAPPENED TO HIM?',
	'NEITHER GODS NOR MEN WILL EVER COMPEL ME TO LET YOU TURN Casterly ROCK INTO YOUR WHOREHOUSE.',
	'BURN THEM ALL',
	'THE LANNISTERS SEND THEIR REGARDS.',
	'I\'M GONNA HAVE TO EAT EVERY F--KING CHICKEN IN THIS ROOM.',
	'THIS IS NOT THE DAY I DIE.',
	'I WISH I WAS THE MONSTER YOU THINK I AM.'
];

say(phrase[randomIntFromInterval(0,18)]);
*/

if ( tpe_perform == 'pause' || tpe_perform == 'resume' ) {
	getPlayerID();
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":' + player_id + '},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'context' || tpe_perform == 'long press' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.ContextMenu","id":1}';
	sendRequest();
}

if ( tpe_perform == 'stop' ) {
	getPlayerID();
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Player.Stop","params":{ "playerid": ' + player_id + '},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'jump back' ) {
	getPlayerID();
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Player.Seek","id":1,"params":{"playerid": ' + player_id + ',"value":"bigbackward"},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'skip back' ) {
	getPlayerID();
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Player.Seek","id":1,"params":{"playerid": ' + player_id + ',"value":"smallbackward"},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'jump ahead' ) {
	getPlayerID();
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Player.Seek","id":1,"params":{"playerid":' + player_id + ',"value":"bigforward"},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'skip ahead' ) {
	getPlayerID();
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Player.Seek","id":1,"params":{"playerid":' + player_id + ',"value":"smallforward"},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'flash off' && tk.global("%DISPLAYFLASH") == "true" ) {
	tk.setGlobal("%DISPLAYFLASH","false");
}

if ( tpe_perform == 'flash on' && tk.global("%DISPLAYFLASH") == "false" ) {
	tk.setGlobal("%DISPLAYFLASH","true");
}

if ( tpe_perform == 'troubleshooting on' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Settings.SetSettingValue", "params":{"setting":"debug.showloginfo","value":true},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'troubleshooting off' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Settings.SetSettingValue", "params":{"setting":"debug.showloginfo","value":false},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'select' || tpe_perform == 'enter' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.Select","id":1}';
	sendRequest();
}

if ( tpe_perform == 'back' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.Back","id":1}';
	sendRequest();
}

if ( tpe_perform == 'up' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.Up","id":1}';
	sendRequest();
}

if ( tpe_perform == 'down' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.down","id":1}';
	sendRequest();
}

if ( tpe_perform == 'right' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.right","id":1}';
	sendRequest();
}

if ( tpe_perform == 'left' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.Left","id":1}';
	sendRequest();
}

if ( tpe_perform == 'home' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Input.Home","id":1}';
	sendRequest();
}

if ( tpe_perform == 'settings' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"GUI.ActivateWindow","params":{"window":"settings"},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'exodus' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"GUI.ActivateWindow","params":{"window":"videos","parameters":["plugin://plugin.video.exodus"]},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'movies' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"GUI.ActivateWindow","params":{"window":"videos","parameters":["videodb://movies/titles"]},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'tv shows' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"GUI.ActivateWindow","params":{"window":"videos","parameters":["videodb://tvshows/titles"]},"id":1}';
	sendRequest();
}

if ( tpe_perform == 'scan' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"VideoLibrary.Scan","id":1}';
	sendRequest();
}

if ( tpe_perform == 'clean' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"VideoLibrary.Clean","id":1}';
	sendRequest();
}

if ( tpe_perform == 'exit' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.Quit","id":1}';
	sendRequest();
}

if ( tpe_perform == 'channel thirty nine' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "channelid": 1} }, "id": 1 }';
	sendRequest();
}

if ( tpe_perform == 'for' || tpe_perform == 'four' || tpe_perform == '4' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "channelid": 17} }, "id": 1 }';
	sendRequest();
}

if ( tpe_perform == 'channel seven' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "channelid": 43} }, "id": 1 }';
	sendRequest();
}

if ( tpe_perform == '39.2' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "channelid": 40} }, "id": 1 }';
	sendRequest();
}

if ( tpe_perform == '51.1' ) {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={ "jsonrpc": "2.0", "method": "Player.Open", "params": { "item": { "channelid": 4} }, "id": 1 }';
	sendRequest();
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function isKodiRunning() {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Application.GetProperties","params":{"properties":["name","version"]},"id":1}';
	method = 'GET'
	xhttp = new XMLHttpRequest();
	xhttp.open(method, url, false);

	try {
		xhttp.send();
		loadApp('Kodi');
	}
	catch(error) {
		loadApp('Kodi');
		wait(10000);
	}
}

function sendRequest() {
	var method = 'GET'
	var xhttp = new XMLHttpRequest();
	xhttp.open(method, url, false);
	xhttp.send();
}

function getPlayerID () {
	url = 'http://' + deviceIp + ':' + devicePort + '/jsonrpc?request={"jsonrpc":"2.0","method":"Player.GetActivePlayers","id":1}';
	var method = 'GET'
	var xhttp = new XMLHttpRequest();
	xhttp.open(method, url, false);
	xhttp.send();
	arr = JSON.parse(xhttp.responseText);
	player_id = arr.result[0].playerid;
}