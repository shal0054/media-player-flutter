const TRACKS = [
	{
		id: 0,
		artist: '2pac ft. Amr Diab',
		album: 'Remix',
		title: "Baby Don't Cry",
		duration: '4:12',
		src: './media/songs/2Pac-ft-Amr-Diab-Baby-Dont-Cry-Arabic.mp3',
		img: './media/img/2Pac-ft-Amr-Diab-Baby-Dont-Cry-Arabic.jpeg',
	},
	{
		id: 1,
		artist: 'Elissa',
		album: 'Remix',
		title: 'Ahla Donia',
		duration: '3:58',
		src: './media/songs/2pac-Elissa-Arabic-Remix-Ahla-Donia.mp3',
		img: './media/img/2pac-Elissa-Arabic-Remix-Ahla-Donia.jpg',
	},
	{
		id: 2,
		artist: 'Outlandish',
		album: 'Single',
		title: 'Aicha',
		duration: '4:39',
		src: './media/songs/Aisha-Outlandish.mp3',
		img: './media/img/Aisha-Outlandish.jpg',
	},
	{
		id: 3,
		artist: 'Phil Collins',
		album: 'Instrumental Mix',
		title: 'In The Air Tonight',
		duration: '3:20',
		src: './media/songs/In-The-Air-Tonight-Instrumental-Mix.mp3',
		img: './media/img/In-The-Air-Tonight-Instrumental-Mix.jpg',
	},
	{
		id: 4,
		artist: 'Nelly ft. Paul Wall',
		album: 'Sweatsuit',
		title: 'Grillz',
		duration: '4:32',
		src: './media/songs/Nelly-Grillz.mp3',
		img: './media/img/Nelly-Grillz.jpeg',
	},
];

const APP = {
	playList: null,
	audio: null,
	playPauseBtn: null,
	trackDurationText: null,
	currentTrack: { id: 0, duration: 0 },
	init: () => {
		(APP.playList = document.getElementById('playlist')),
			(APP.audio = document.getElementById('audio')),
			(APP.playPauseBtn = document.getElementById('play_pause_btn')),
			(APP.trackDurationText = document.getElementById('track_duration')),
			APP.addListeners();
		APP.buildTrackList();
	},
	addListeners: () => {
		APP.playPauseBtn.addEventListener('click', APP.playTrack);
		APP.audio.addEventListener('durationchange', () => {});
	},

	buildTrackList: () => {
		const fragment = new DocumentFragment();
		APP.playList.innerHTML = '';

		TRACKS.forEach(track => {
			const songCardDiv = document.createElement('div');
			songCardDiv.className = 'song_card';
			songCardDiv.id = track.id;

			const img = document.createElement('img');
			img.src = track.img;
			img.className = 'thumbnail';
			img.alt = 'thumbnail image';
			songCardDiv.appendChild(img);

			const cardTextDiv = document.createElement('div');
			cardTextDiv.className = 'card_text';
			songCardDiv.appendChild(cardTextDiv);

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
			songCardDiv.appendChild(playButton);

			const playIcon = document.createElement('i');
			playIcon.classList.add('bx');
			playIcon.classList.add('bx-play');
			playIcon.dataset.id = track.id;
			playButton.appendChild(playIcon);

			fragment.appendChild(songCardDiv);
		});

		APP.playList.append(fragment);
	},

	playTrack: ev => {
		if (!APP.audio.paused) return; //already playing
		APP.currentTrack.id = ev.target.dataset.id;
		APP.audio.src = TRACKS[APP.currentTrack.id].src;
		APP.audio.addEventListener('durationchange', ev => {
			APP.currentTrack.duration = APP.formatTime(APP.audio.duration);
			APP.trackDurationText.innerText = APP.currentTrack.duration;
		});
		// APP.audio.play();
		// APP.startAnimations();
	},
	pauseTrack: ev => {
		APP.audio.pause();
		// APP.stopAnimations();
	},

	formatTime(seconds) {
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

document.addEventListener('DOMContentLoaded', APP.init);
