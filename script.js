// Password Protection
function checkPassword() {
    const password = "shreya2024"; // Change this to your desired password
    const input = document.getElementById('passwordInput').value;
    const loginOverlay = document.getElementById('loginOverlay');
    const mainContent = document.getElementById('mainContent');

    if (input === password) {
        loginOverlay.classList.add('hide');
        mainContent.classList.remove('hide');
        initializePictures();
    } else {
        alert('Incorrect password!');
        document.getElementById('passwordInput').value = '';
    }
}
// Main Functionality
const pictures = document.querySelectorAll('.Picture');
var previousTouch = undefined;

function updateElementPosition(element, event) {
    var movementX, movementY;

    if (event.type === 'touchmove') {
        const touch = event.touches[0];
        movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
        movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
        previousTouch = touch;
    } else {
        movementX = event.movementX;
        movementY = event.movementY;
    }
    
    const elementY = parseInt(element.style.top || 0) + movementY;
    const elementX = parseInt(element.style.left || 0) + movementX;

    element.style.top = `${elementY}px`;
    element.style.left = `${elementX}px`;
}

function startDrag(element, event) {
    const updateFunction = (event) => updateElementPosition(element, event);
    const stopFunction = () => stopDrag({update: updateFunction, stop: stopFunction});
    document.addEventListener("mousemove", updateFunction);
    document.addEventListener("touchmove", updateFunction);
    document.addEventListener("mouseup", stopFunction);
    document.addEventListener("touchend", stopFunction);
}

function stopDrag(functions) {
    previousTouch = undefined;
    document.removeEventListener("mousemove", functions.update);
    document.removeEventListener("touchmove", functions.update);
    document.removeEventListener("mouseup", functions.stop);
    document.removeEventListener("touchend", functions.stop);
}

function initializePictures() {
    pictures.forEach(picture => {
        const range = 100;
        const randomX = Math.random() * (range * 2) - range;
        const randomY = Math.random() * (range * 2) - range;
        const randomRotate = Math.random() * (range / 2) - range / 4;
        const startFunction = (event) => startDrag(picture, event);
        
        picture.style.opacity = '1';
        picture.style.top = `${randomY}px`;
        picture.style.left = `${randomX}px`;
        picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
        picture.addEventListener("mousedown", startFunction);
        picture.addEventListener("touchstart", startFunction);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bg-music');
    const video = document.querySelector('.Picture-img-video');
    
    if (music && video) {
        const playMusic = () => {
            music.volume = 1.0;
            music.muted = false;
            music.play()
                .then(() => {
                    console.log('Music started');
                    window.removeEventListener('click', playMusic);
                    window.removeEventListener('touchstart', playMusic);
                })
                .catch(error => console.log('Music autoplay failed:', error));
        };
        
        window.addEventListener('click', playMusic);
        window.addEventListener('touchstart', playMusic);

        video.addEventListener('play', () => {
            music.volume = 0.2;
        });

        video.addEventListener('pause', () => {
            music.volume = 1.0;
        });

        video.addEventListener('ended', () => {
            music.volume = 1.0;
        });
    }
});