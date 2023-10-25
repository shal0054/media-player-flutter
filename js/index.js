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
	timerText: null,
	nextBtn: null,
	previousBtn: null,
	fastForwardBtn: null,
	rewindBtn: null,
	progressBar: null,
	currentTrack: { id: '', duration: 0 },
	init: () => {
		APP.playList = document.getElementById('playlist');
		APP.audio = document.getElementById('audio');
		APP.playPauseBtn = document.getElementById('play_pause_btn');
		APP.trackDurationText = document.getElementById('track_duration');
		APP.screenToggleBtn = document.getElementById('screen_toggle_btn');
		APP.volumeBtn = document.getElementById('volume_btn');
		APP.nextBtn = document.getElementById('next_btn');
		APP.previousBtn = document.getElementById('previous_btn');
		APP.fastForwardBtn = document.getElementById('fast_forward_btn');
		APP.rewindBtn = document.getElementById('rewind_btn');
		APP.timerText = document.getElementById('timer');
		APP.progressBar = document.getElementById('slider');
		APP.buildTrackList();
		APP.addListeners();
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
		APP.nextBtn.addEventListener('click', APP.playNext);
		APP.audio.addEventListener('ended', APP.playNext);
		APP.previousBtn.addEventListener('click', APP.playPrevious);
		APP.fastForwardBtn.addEventListener('click', APP.fastForward);
		APP.rewindBtn.addEventListener('click', APP.rewind);
		APP.audio.addEventListener('timeupdate', APP.updateTimer, false);
	},

	buildTrackList: () => {
		const fragment = new DocumentFragment();
		APP.playList.innerHTML = '';

		let id = 0;
		TRACKS.forEach(track => {
			const trackCardDiv = document.createElement('div');
			trackCardDiv.className = 'track_card';
			trackCardDiv.id = id;

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
			playButton.dataset.id = id;
			playButton.addEventListener('click', APP.playTrack);
			trackCardDiv.appendChild(playButton);

			const playIcon = document.createElement('i');
			playIcon.classList.add('bx');
			playIcon.classList.add('bx-play');
			playIcon.dataset.id = id;
			playButton.appendChild(playIcon);

			id++;
			fragment.appendChild(trackCardDiv);
		});

		APP.playList.append(fragment);
	},

	playTrack: ev => {
		const trackId = ev.target.dataset.id;

		if (APP.playList.classList.contains('active')) UI.playerListToggle();

		if (APP.currentTrack.id === trackId && !APP.audio.paused) return;
		else if (APP.currentTrack.id === trackId && APP.audio.paused) {
			APP.audio.play();
			UI.togglePlayPauseIcon();
			return;
		}

		APP.currentTrack.id = trackId;

		UI.setTrackInfo();
		UI.highlightCard(ev.target.closest('.track_card'));
		APP.audio.play();

		// APP.startAnimations();
	},

	updateTimer: () => {
		APP.timerText.textContent = APP.formatTime(APP.audio.currentTime);

		let percentTime = (APP.audio.currentTime / APP.audio.duration) * 100;
		APP.progressBar.value = percentTime;
	},

	pauseTrack: () => {
		APP.audio.pause();
		UI.togglePlayPauseIcon();
		// APP.stopAnimations();
	},

	playNext: () => {
		if (APP.currentTrack.id >= 0) {
			let nextId = parseInt(APP.currentTrack.id) + 1;

			if (nextId >= APP.playList.children.length) nextId = 0;
			APP.currentTrack.id = nextId;

			UI.setTrackInfo();

			// find then highlight next track's card
			let nextCard = null;
			const cards = APP.playList.children;
			for (let i = 0; i < cards.length; i++) {
				if (parseInt(cards[i].id) === nextId) nextCard = cards[i];
			}

			UI.highlightCard(nextCard);

			APP.audio.play();
		}
	},

	playPrevious: () => {
		// is there an active track?
		if (APP.currentTrack.id >= 0) {
			// TODO: This should be try catch instead
			let prevId = parseInt(APP.currentTrack.id) - 1;

			if (prevId < 0) prevId = APP.playList.children.length - 1;
			APP.currentTrack.id = prevId;

			UI.setTrackInfo();

			// find then highlight next track's card
			let prevCard = null;
			const cards = APP.playList.children;
			for (let i = 0; i < cards.length; i++) {
				if (parseInt(cards[i].id) === prevId) prevCard = cards[i];
			}

			UI.highlightCard(prevCard);

			APP.audio.play();
		}
	},

	fastForward: () => {
		APP.audio.currentTime = APP.audio.currentTime + 10;
	},

	rewind: () => {
		APP.audio.currentTime = APP.audio.currentTime - 10;
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
		sec = Math.floor(sec).toString().padStart(2, '0');

		return `${minutes}:${sec}`;
	},
};

const UI = {
	menuIcon: document.getElementById('menu_icon'),
	volume: document.querySelector('.volume'),
	volumeLevel: document.getElementById('volume_level'),
	playerImg: document.getElementById('p_img'),
	trackTitle: document.getElementById('track_title'),
	artist: document.getElementById('artist'),
	playPauseIcon: document.getElementById('play_pause_icon'),

	setTrackInfo() {
		const trackId = APP.currentTrack.id;
		UI.playerImg.src = TRACKS[trackId].img;
		UI.trackTitle.textContent = TRACKS[trackId].title;
		UI.artist.textContent = TRACKS[trackId].artist;
		APP.audio.src = TRACKS[APP.currentTrack.id].src;
		APP.audio.addEventListener('durationchange', () => {
			APP.currentTrack.duration = APP.formatTime(APP.audio.duration);
			APP.trackDurationText.innerText = APP.currentTrack.duration;
		});
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
		const cards = APP.playList.children;
		for (let i = 0; i < cards.length; i++) {
			cards[i].classList.remove('playing');
		}

		// add .playing to the active card only
		trackCard.classList.add('playing');
	},

	playerListToggle() {
		APP.playList.classList.toggle('active');
		if (APP.playList.classList.contains('active')) {
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
