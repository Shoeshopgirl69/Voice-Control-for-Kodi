var tpe_launch = local("%tpe_launch").toLowerCase().trim();

if (tk.global("%DISPLAYFLASH") == '') {
	tk.setGlobal("%DISPLAYFLASH",'false');
}

if ( tk.global("%DISPLAYFLASH") == "true" ) {
	flash('Launch Script');
	flash(tpe_launch);
}

if ( tpe_launch == 'netflix' ) {
	flash('Netflix');
	loadApp('Netflix');
}

if ( tpe_launch == 'kodi' ) {
	loadApp('Kodi');
}

if ( tpe_launch == 'tasker' ) {
	loadApp('Tasker');
}

if ( tpe_launch == 'live channels' ) {
	loadApp('Live Channels');
}

if ( tpe_launch == 'plex' ) {
	loadApp('Plex');
}

if ( tpe_launch == 'youtube' ) {
	loadApp('YouTube');
}

if ( tpe_launch == 'home' ) {
	loadApp('Home Screen');
}

if ( tpe_launch == 'hulu' ) {
	loadApp('Hulu');
}

if ( tpe_launch == 'fan tv' ) {
	loadApp('Fan TV');
}

if ( tpe_launch == 'settings' ) {
	loadApp('Settings');
}
