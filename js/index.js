const SONGS = [
	//list of song objects
];

const APP = {
	player: null,
	audio: null,
	btnPlay: null,
	currentTrack: 0,
	init: () => {
		(APP.player = document.getElementById('player')),
			(APP.audio = document.getElementById('audio')),
			(APP.btnPlay = document.getElementById('btnPlay')),
			APP.addListeners();
	},
	addListeners: () => {
		APP.btnPlay.addEventListener('click', APP.playTrack);
		APP.btnStop.addEventListener('click', APP.stopTrack);
	},
	playTrack: ev => {
		if (!APP.audio.paused) return; //already playing
		APP.audio.src = SONGS[APP.currentTrack].src;
		APP.audio.play();
		APP.startAnimations();
	},
	stopTrack: ev => {
		APP.audio.pause();
		APP.audio.currentTime = 0;
		APP.stopAnimations();
	},
};
