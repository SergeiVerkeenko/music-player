const playBtn = document.querySelector('.play')

const arr = [
    {
        src: './audio./1.mp3',
        title: 'Три полоски',
        ispolnitel: 'Animal ДжаZ',
        img: './img/альбомы/animalJazz.jpg',
        like: false
    },
    {
        src: './audio./2.mp3',
        title: 'Ты Меня Не Ищи',
        ispolnitel: 'Вирус',
        img: './img/альбомы/virus.jpg',
        like: false
    },
    {
        src: './audio./3.mp3',
        title: '100 дней до приказа',
        ispolnitel: 'НеИгрушки',
        img: './img/альбомы/100.jpg',
        like: false
    },
    {
        src: './audio./4.mp3',
        title: 'Ангелы здесь больше не живут',
        ispolnitel: 'Ульяна Каракоз',
        img: './img/альбомы/ангелы.jpg',
        like: false
    }
]

let indexMysic = 0;
const audio = document.createElement('audio')
let flag = false
playBtn.addEventListener('click', () => {
    currentTitle()
    currentSong()
})

document.querySelector('.nextSong').addEventListener('click', () => {
    if (indexMysic === arr.length - 1) {
        indexMysic = 0
    } else {
        indexMysic++
    }
    flag = true
    currentTitle()
    changeSong()
})

document.querySelector('.previousSong').addEventListener('click', () => {
    if (indexMysic === 0) {
        indexMysic = arr.length - 1
    } else {
        indexMysic--
    }
    flag = true
    currentTitle()
    changeSong()
})

function changeSong() {
    audio.src = arr[indexMysic].src
    audio.play()
}


function currentSong() {
    audio.src = arr[indexMysic].src
    if (flag) {
        audio.pause()
        flag = false
        document.querySelector('.strelkaPlay').style.backgroundImage = 'url(./img/Play.svg)'
    } else {
        audio.play()
        document.querySelector('.strelkaPlay').style.backgroundImage = 'url(./img/pause.svg)'
        flag = true
    }
}



// изменение названия песни и исполнителя, плюс изменение картинки альбома
function currentTitle() {
    document.querySelector('.ispolnitel').textContent = arr[indexMysic].ispolnitel;
    document.querySelector('.nameSong').textContent = arr[indexMysic].title;
    document.querySelector('.img').style.backgroundImage = `url(${arr[indexMysic].img})`
    if (arr[indexMysic].like) {
        document.querySelector('.like').style.backgroundImage = 'url(./img/like.svg)'
    } else {
        document.querySelector('.like').style.backgroundImage = 'url(./img/nolike.svg)'
    }
}

//корректировка прогресса и времени
function updateProgress(event) {
    const { duration, currentTime } = event.srcElement;
    if (currentTime % 60 > 10) {
        document.querySelector('.time').textContent = `0${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)}`
    } else {
        document.querySelector('.time').textContent = `0${Math.floor(currentTime / 60)}:0${Math.floor(currentTime % 60)}`

    }
    const progressPersent = (currentTime / duration) * 100;
    document.querySelector('.progress').style.width = `${progressPersent}%`
}

audio.addEventListener('timeupdate', updateProgress)

//перемотка по ползунку
function setProgress(event) {
    const width = this.clientWidth
    const clickX = event.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

document.querySelector('.polzunok').addEventListener('click', setProgress)

// запуск следующей композиции, если текущая закончилась
audio.addEventListener('ended', () => {
    if (indexMysic === arr.length - 1) {
        indexMysic = 0
    } else {
        indexMysic++
    }
    currentTitle()
    changeSong()

})

// возможность ставить лайк
document.querySelector('.like').addEventListener('click', () => {
    if (!arr[indexMysic].like) {
        arr[indexMysic].like = true
        document.querySelector('.like').style.backgroundImage = 'url(./img/like.svg)'
    } else {
        arr[indexMysic].like = false
        document.querySelector('.like').style.backgroundImage = 'url(./img/nolike.svg)'
    }

})