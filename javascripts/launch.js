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
