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

const barBtn = document.getElementById('burger')
const list = document.querySelector('.overlay-content')



let currentPlaying

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
        displayName: 'I wanna be your slave',
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

    const listDis = document.querySelectorAll('#list-display')
    if(isOpened) {
        for(let i=0; i<listDis.length; i++) {
            if(listDis[i].innerText == currentPlaying)
                listDis[i].parentElement.parentElement.style.color = "green"
            else
                listDis[i].parentElement.parentElement.style.color = "#fff"
        }
    }
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
    currentPlaying = song.displayName
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

let isOpened = false

function closeNav() {
    isOpened=false
    document.getElementById("myNav").style.width = "0%";
    list.innerHTML = ""
}

function openNav() {
    isOpened = true
    document.getElementById("myNav").style.width = "20%";

    for(let i=0; i<songs.length; i++) {
        list.innerHTML += `<div class="list-item"><p id="${i}" class="ft-play">${i+1}</p><img src="./assets/img/${songs[i].img}" alt=""><div id="list-item_right"><p id="list-display">${songs[i].displayName}</p><p>${songs[i].artist}</p></div></div>`
    }

    const listsong = document.querySelectorAll('.ft-play')
    listsong.forEach(btn => {
        btn.addEventListener('click', playListSong)
    })

    listsong.forEach(btn => {
        btn.addEventListener('mouseover', changeIcon)
    })

    listsong.forEach(btn => {
        btn.addEventListener('mouseleave', backIcon)
    })
}

function playListSong(e) {
    const clickedEl = e.target

    loadSong(songs[clickedEl.id])
    playSong()

    const listsong = document.querySelectorAll('.ft-play')
    for(let i = 0; i < listsong.length; i++) {
        listsong[i].parentElement.style.color = "#fff"
    }

    clickedEl.parentElement.parentElement.parentElement.style.color = "green"
}

function changeIcon(e) {
    const hovered = e.target
    if(hovered.classList.contains('ft-play'))
        hovered.innerHTML = `<p><i class="fas fa-play" id="${hovered.id}" title="Play"></i></p>` 
}

function backIcon(e) {
    const lefthover = e.target
    if(lefthover.classList.contains('ft-play')) {
        lefthover.innerHTML = Number(lefthover.id)+1
    }
}

barBtn.addEventListener('click', function(e) {
    isOpened ? closeNav() : openNav()
})

const X = document.querySelector('.closebtn')

X.addEventListener('click', function(e) {
    closeNav()
})