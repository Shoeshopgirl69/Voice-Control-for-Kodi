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

var tpeLaunch = local("%tpe_launch").toLowerCase().trim();

if (tk.global("%DISPLAYFLASH") == '') {
	tk.setGlobal("%DISPLAYFLASH",'false');
}

if ( tk.global("%DISPLAYFLASH") == "true" ) {
	flash('Launch Script');
	flash(tpeLaunch);
}

if ( tpeLaunch == 'netflix' ) {
	loadApp('Netflix');
}

if ( tpeLaunch == 'kodi' ) {
	loadApp('Kodi');
}

if ( tpeLaunch == 'tasker' ) {
	loadApp('Tasker');
}

if ( tpeLaunch == 'live channels' ) {
	loadApp('Live Channels');
}

if ( tpeLaunch == 'plex' ) {
	loadApp('Plex');
}

if ( tpeLaunch == 'youtube' ) {
	loadApp('YouTube');
}

if ( tpeLaunch == 'home' ) {
	loadApp('Home Screen');
}

if ( tpeLaunch == 'hulu' ) {
	loadApp('Hulu');
}

if ( tpeLaunch == 'fan tv' ) {
	loadApp('Fan TV');
}

if ( tpeLaunch == 'settings' ) {
	loadApp('Settings');
}

if ( tpeLaunch =='radar' ) {
	browseURL("http://10.178.0.118:7878");
<<<<<<< HEAD
}
=======
}
>>>>>>> 090d00085dcb2beb8eafb888b5991b46a11b9d4f
