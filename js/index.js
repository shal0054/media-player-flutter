const TRACKS = [
	{
		id: 0,
		artist: '2pac ft. Amr Diab',
		album: 'Remix',
		track: "Baby Don't Cry",
		length: '4:12',
		path: '/media/songs/2Pac-ft-Amr-Diab-Baby-Dont-Cry-Arabic.mp3',
		img: '/media/img/2pac.jpg',
	},
	{
		id: 1,
		artist: 'Elissa',
		album: 'Remix',
		track: 'Ahla Donia',
		length: '3:58',
		path: 'media/songs/2pac-Elissa-Arabic-Remix-Ahla-Donia.mp3',
		img: 'media/img/Alleyezonme.jpeg',
	},
	{
		id: 2,
		artist: 'Outlandish',
		album: 'Single',
		track: 'Aicha',
		length: '4:39',
		path: '/media/songs/Aisha-Outlandish.mp3',
		img: '/media/img/outlandish.jpg',
	},
	{
		id: 3,
		artist: 'Phil Collins',
		album: 'Instrumental Mix',
		track: 'In The Air Tonight',
		length: '3:20',
		path: '/media/songs/In-The-Air-Tonight-Instrumental-Mix.mp3',
		img: '/media/img/phil.jpg',
	},
	{
		id: 4,
		artist: 'Nelly ft. Paul Wall',
		album: 'Sweatsuit',
		track: 'Grillz',
		length: '4:32',
		path: '/media/songs/Nelly-Grillz.mp3',
		img: '/media/img/nelly.jpeg',
	},
];

const APP = {
	player: null,
	audio: null,
	playPauseBtn: null,
	currentTrack: 0,
	init: () => {
		(APP.player = document.getElementById('player')),
			(APP.audio = document.getElementById('audio')),
			(APP.playPauseBtn = document.getElementById('play_pause_btn')),
			APP.addListeners();
	},
	addListeners: () => {
		APP.playPauseBtn.addEventListener('click', APP.playTrack);
	},
	playTrack: ev => {
		if (!APP.audio.paused) return; //already playing
		APP.audio.src = TRACKS[APP.currentTrack].src;
		APP.audio.play();
		APP.startAnimations();
	},
	stopTrack: ev => {
		APP.audio.pause();
		APP.audio.currentTime = 0;
		APP.stopAnimations();
	},
};
