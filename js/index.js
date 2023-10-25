const TRACKS = [
	{
		id: 0,
		artist: '2pac ft. Amr Diab',
		album: 'Remix',
		title: "Baby Don't Cry",
		duration: '4:12',
		src: './media/tracks/2Pac-ft-Amr-Diab-Baby-Dont-Cry-Arabic.mp3',
		img: './media/img/2Pac-ft-Amr-Diab-Baby-Dont-Cry-Arabic.jpeg',
	},
	{
		id: 1,
		artist: 'Elissa',
		album: 'Remix',
		title: 'Ahla Donia',
		duration: '3:58',
		src: './media/tracks/2pac-Elissa-Arabic-Remix-Ahla-Donia.mp3',
		img: './media/img/2pac-Elissa-Arabic-Remix-Ahla-Donia.jpg',
	},
	{
		id: 2,
		artist: 'Outlandish',
		album: 'Single',
		title: 'Aicha',
		duration: '4:39',
		src: './media/tracks/Aisha-Outlandish.mp3',
		img: './media/img/Aisha-Outlandish.jpg',
	},
	{
		id: 3,
		artist: 'Phil Collins',
		album: 'Instrumental Mix',
		title: 'In The Air Tonight',
		duration: '3:20',
		src: './media/tracks/In-The-Air-Tonight-Instrumental-Mix.mp3',
		img: './media/img/In-The-Air-Tonight-Instrumental-Mix.jpg',
	},
	{
		id: 4,
		artist: 'Nelly ft. Paul Wall',
		album: 'Sweatsuit',
		title: 'Grillz',
		duration: '4:32',
		src: './media/tracks/Nelly-Grillz.mp3',
		img: './media/img/Nelly-Grillz.jpeg',
	},
];

const APP = {
	playList: null,
	volumeBtn: null,
	screenToggleBtn: null,
	audio: null,
	playPauseBtn: null,
	trackDurationText: null,
	currentTrack: { id: 0, duration: 0 },
	init: () => {
		APP.playList = document.getElementById('playlist');
		APP.audio = document.getElementById('audio');
		APP.playPauseBtn = document.getElementById('play_pause_btn');
		APP.trackDurationText = document.getElementById('track_duration');
		APP.screenToggleBtn = document.getElementById('screen_toggle_btn');
		APP.volumeBtn = document.getElementById('volume_btn');
		APP.addListeners();
		APP.buildTrackList();
	},
	addListeners: () => {
		APP.playPauseBtn.addEventListener('click', () => {
			if (APP.audio.paused) {
				APP.audio.play();
				UI.playPauseIcon.classList.remove('bx-play');
				UI.playPauseIcon.classList.add('bx-pause');
			} else {
				APP.pauseTrack();
			}
		});
		APP.screenToggleBtn.addEventListener('click', UI.playerListToggle);
		APP.volumeBtn.addEventListener('click', UI.volumeTray);
	},

	buildTrackList: () => {
		const fragment = new DocumentFragment();
		APP.playList.innerHTML = '';

		let id = 0;
		TRACKS.forEach(track => {
			const trackCardDiv = document.createElement('div');
			trackCardDiv.className = 'track_card';
			trackCardDiv.id = id;
			id++;

			const img = document.createElement('img');
			img.src = track.img;
			img.className = 'thumbnail';
			img.alt = 'thumbnail image';
			trackCardDiv.appendChild(img);

			const cardTextDiv = document.createElement('div');
			cardTextDiv.className = 'card_text';
			trackCardDiv.appendChild(cardTextDiv);

			const pTitle = document.createElement('div');
			pTitle.id = 'p_title';
			pTitle.innerText = track.title;
			cardTextDiv.appendChild(pTitle);

			const pArtist = document.createElement('div');
			pArtist.id = 'p_artist';
			pArtist.innerText = track.artist;
			cardTextDiv.appendChild(pArtist);

			const playButton = document.createElement('button');
			playButton.className = 'play_btn';
			playButton.dataset.id = track.id;
			playButton.addEventListener('click', APP.playTrack);
			trackCardDiv.appendChild(playButton);

			const playIcon = document.createElement('i');
			playIcon.classList.add('bx');
			playIcon.classList.add('bx-play');
			playIcon.dataset.id = track.id;
			playButton.appendChild(playIcon);

			fragment.appendChild(trackCardDiv);
		});

		APP.playList.append(fragment);
	},

	playTrack: ev => {
		const trackId = ev.target.dataset.id;

		if (UI.playlist.classList.contains('active')) UI.playerListToggle();
		if (APP.currentTrack.id === trackId && !APP.audio.paused) return;
		else if (APP.currentTrack.id === trackId) {
			APP.audio.play();
			UI.togglePlayPauseIcon();
			return;
		}

		APP.currentTrack.id = trackId;
		APP.audio.src = TRACKS[APP.currentTrack.id].src;
		APP.audio.addEventListener('durationchange', () => {
			APP.currentTrack.duration = APP.formatTime(APP.audio.duration);
			APP.trackDurationText.innerText = APP.currentTrack.duration;
		});
		UI.setTrackInfo();
		UI.highlightCard(ev.target.closest('.track_card'));
		APP.audio.play();
		// APP.startAnimations();
	},

	pauseTrack: ev => {
		APP.audio.pause();
		UI.togglePlayPauseIcon();
		// APP.stopAnimations();
	},

	formatTime: seconds => {
		const SECONDS_PER_HOUR = 3600;
		const SECONDS_PER_MINUTE = 60;

		let hours = Math.floor(seconds / SECONDS_PER_HOUR);
		let minutes = Math.floor(
			(seconds - hours * SECONDS_PER_HOUR) / SECONDS_PER_MINUTE
		);
		let sec = seconds - minutes * SECONDS_PER_MINUTE - hours * SECONDS_PER_HOUR;

		minutes = minutes.toString().padStart(2, '0');
		sec = sec.toString().padStart(2, '0');

		return `${minutes}:${Math.floor(sec)}`;
	},
};

const UI = {
	playlist: document.getElementById('playlist'),
	menuIcon: document.getElementById('menu_icon'),
	volume: document.querySelector('.volume'),
	volumeLevel: document.getElementById('volume_level'),
	playerImg: document.getElementById('p_img'),
	trackTitle: document.getElementById('track_title'),
	artist: document.getElementById('artist'),
	playPauseIcon: document.getElementById('play_pause_icon'),

	setTrackInfo() {
		UI.playerImg.src = TRACKS[APP.currentTrack.id].img;
		UI.trackTitle.textContent = TRACKS[APP.currentTrack.id].title;
		UI.artist.textContent = TRACKS[APP.currentTrack.id].artist;
		UI.togglePlayPauseIcon();
	},

	togglePlayPauseIcon() {
		if (UI.playPauseIcon.classList.contains('bx-play')) {
			UI.playPauseIcon.classList.remove('bx-play');
			UI.playPauseIcon.classList.add('bx-pause');
		} else {
			UI.playPauseIcon.classList.remove('bx-pause');
			UI.playPauseIcon.classList.add('bx-play');
		}
	},

	highlightCard(trackCard) {
		// remove .playing from all cards
		const cards = UI.playlist.children;
		for (let i = 0; i < cards.length; i++) {
			cards[i].classList.remove('playing');
		}

		// add .playing to the active card only
		trackCard.classList.add('playing');
	},

	playerListToggle() {
		UI.playlist.classList.toggle('active');
		if (UI.playlist.classList.contains('active')) {
			UI.menuIcon.className = '';
			UI.menuIcon.classList.add('bx');
			UI.menuIcon.classList.add('bx-music');
		} else {
			UI.menuIcon.className = '';
			UI.menuIcon.classList.add('bx');
			UI.menuIcon.classList.add('bx-menu-alt-left');
		}
	},

	volumeTray() {
		UI.volume.classList.toggle('vol_slider_open');
	},
};

document.addEventListener('DOMContentLoaded', APP.init);
