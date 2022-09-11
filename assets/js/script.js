const title = document.getElementById('title')
const artistEl = document.getElementById('artist')
const music = document.querySelector('audio')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

const durationEl = document.getElementById('duration')
const current = document.getElementById('current')
const progress = document.getElementById('progress')
const progressCont = document.getElementById('progress-container')

const img = document.querySelector('img')
const imgDiv = document.querySelector('.player-img')

const songs = [
    {
        name: 'Biri var',
        displayName: 'Biri var',
        artist: 'Hiss',
        img: 'hiss.png'
    },
    {
        name: 'Another love',
        displayName: 'Another love',
        artist: 'Tom Odell',
        img: 'tom-odell.jpg'
    },
    {
        name: 'Slave',
        displayName: 'Slave',
        artist: 'Maneskin',
        img: 'maneskin.jpg'
    }
]

let isPlaying = false

function playSong() {
    isPlaying = true

    playBtn.classList.replace('fa-play', 'fa-pause')
    imgDiv.classList.add('active')
    
    music.play()
}

function pauseSong() {
    isPlaying = false

    playBtn.classList.replace('fa-pause', 'fa-play')
    imgDiv.classList.remove('active')

    music.pause()
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

function loadSong(song) {

    title.textContent = song.displayName
    artistEl.textContent = song.artist
    music.src = `./../../musics/${song.name}.mp3`
    img.setAttribute('src', `./assets/img/${song.img}`)
}

let songIndex = 0

function prevSong() {
    songIndex--

    if(songIndex<0) {
        songIndex = songs.length -1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++

    if(songIndex == songs.length) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

loadSong(songs[songIndex])

function updateProgress(e) {
    if(isPlaying) {

        const {duration, currentTime} = e.srcElement

        const progressPercent = (currentTime/duration)*100
        progress.style.width = `${progressPercent}%`

        //calculate display

        const durationMins = Math.floor(duration/60)
        let durationSecs =  Math.floor(duration%60)

        if(durationSecs<10) {
            durationSecs = `0${durationSecs}`
        }

        if(durationSecs) {
            durationEl.textContent = `${durationMins}:${durationSecs}`
        }

        const currentMinutes = Math.floor(currentTime/60)
        let currentSecs = Math.floor(currentTime%60)

        if(currentSecs<10) {
            currentSecs = `0${currentSecs}`
        }

        current.textContent = `${currentMinutes}:${currentSecs}`
    }
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX

    const {duration} = music

    music.currentTime = (clickX/width) * duration
}

music.addEventListener('timeupdate', updateProgress)
progressCont.addEventListener('click', setProgress)