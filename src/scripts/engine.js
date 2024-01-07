function createKeys(value, box, color) {
    let key = document.createElement("li");
        key.className = `key ${color}`;
        key.dataset.key = value;
        key.innerHTML = `<span>${value}</span>`;
        box.appendChild(key);
}

function setKeys () {
    let box = document.getElementById("key-box");
    createKeys("q", box, "white");
    createKeys("2", box, "black");
    createKeys("w", box, "white");
    createKeys("3", box, "black");
    createKeys("e", box, "white");
    createKeys("r", box, "white");
    createKeys("5", box, "black");
    createKeys("t", box, "white");
    createKeys("6", box, "black");
    createKeys("y", box, "white");
    createKeys("7", box, "black");
    createKeys("u", box, "white");
    createKeys("x", box, "white");
    createKeys("d", box, "black");
    createKeys("c", box, "white");
    createKeys("f", box, "black");
    createKeys("v", box, "white");
    createKeys("b", box, "white");
    createKeys("h", box, "black");
    createKeys("n", box, "white");
    createKeys("j", box, "black");
    createKeys("m", box, "white");
    createKeys("k", box, "black");
    createKeys(",", box, "white");           
}
setKeys();

const pianoKeys = document.querySelectorAll(".piano-keys .key");

const volumeSlider = document.querySelector(".volume-slider input");

const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let playing = [];
let volume = 1;

const playTune = (key) => {
    let audio = new Audio(`src/sounds/${key}.mp3`);
    audio.volume = volume;
    audio.play();
    playing.push(key);

    var sliced = playing.slice(playing.length - 3, playing.length);
    let birth = ['q', 'q', 'w'];
    let dre = ['x', 'v', 'm'];
    let star = ['q', 'q', 't'];

    if (sliced.toString() === birth.toString()) {
        birthday();
    } else if (sliced.toString() === dre.toString()) {
        playDre();
    } else if (sliced.toString() === star.toString()) {
        littleStar();
    }

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 100);
};

pianoKeys.forEach((key) => {
    mapedKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

document.addEventListener("keydown", (e) => {
    if (mapedKeys.includes(e.key)) {
      playTune(e.key);
    }
});

const handleVolume = (e) => {
    volume = e.target.value;
};

volumeSlider.addEventListener("input", handleVolume);

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

keysCheck.addEventListener("click", showHideKeys);

function playSong(key, timing) {
    setTimeout(function() {
        document.dispatchEvent(new KeyboardEvent("keydown", {
            key: key
        }));
        playing = [];
    }, timing);
}

function repeat(key, time, add) {
    playSong(key, time);
    playSong(key, time + add);
}

const birthday = () => {
    repeat("q", 300, 300);
    playSong("w", 900);
    playSong("q", 1300);
    playSong("r", 1700);
    playSong("e", 2100);
    repeat("q", 2500, 300);
    playSong("w", 3100);
    playSong("q", 3500);
    playSong("t", 3900);
    playSong("r", 4300);
    repeat("q", 4700, 300);
    playSong("x", 5300);
    playSong("y", 5700);
    playSong("r", 6100);
    playSong("e", 6500);
    playSong("w", 6900);
    repeat("7", 7300, 300);
    playSong("y", 7900);
    playSong("r", 8300);
    playSong("t", 8700);
    playSong("r", 9100);
}
//birthday();

const playDre = () => {
    let timing = 3100;
    playSong("x", 300);
    playSong("v", 600);
    playSong("m", 900);

    playSong("x", 1150);
    playSong("v", 1400);
    playSong("m", 1650);

    playSong("x", 1850);
    playSong("v", 2050);
    playSong("m", 2250);

    playSong("x", 2400);
    playSong("v", 2550);
    playSong("m", 2700);

    playSong("x", 2800);
    playSong("v", 2900);
    playSong("m", 3000);

    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 8; i++) {
            playSong("x", timing);
            playSong("v", timing);
            playSong("m", timing);
            timing += 300;
        }
        for (let i = 0; i < 3; i++) {
            playSong("u", timing);
            playSong("v", timing);
            playSong("m", timing);
            timing += 300;
        }
        for (let i = 0; i < 5; i++) {
            playSong("u", timing);
            playSong("v", timing);
            playSong("n", timing);
            timing += 300;
        }
    }
}
//playDre();

const littleStar = () => {
    function typeA(value) {
        repeat("q", value, 300);
        repeat("t", value + 600, 300);
        repeat("y", value + 1200, 300);
        playSong("t", value + 1800);
    }
    function typeB(value) {
        repeat("t", value, 300);
        repeat("r", value + 600, 300);
        repeat("e", value + 1200, 300);
        playSong("w", value + 1800);
    }
    typeA(300);
    repeat("r", 2500, 300);
    repeat("e", 3100, 300);
    repeat("w", 3700, 300);
    playSong("q", 4300);
    typeB(4700);
    typeB(6900);
    typeA(9100);
}
//littleStar();