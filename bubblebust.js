"use strict";

const buttons = document.querySelector('.buttons');
const level_document = document.getElementById('level');
const overlay = document.getElementById('overlay');
const gameover_text = document.getElementById('text');
const restart = document.getElementById('restart');

let level = 1;

level_document.textContent = "LEVEL " + level;

function getRandomPosition(element) {
	let x = document.documentElement.clientHeight;
	let y = document.documentElement.clientWidth;
	let randomX = Math.floor(Math.random()*x);
	let randomY = Math.floor(Math.random()*y);
	return [randomX,randomY];
}

let new_button = document.createElement('button');

function endGame(timerInterval) {
    gameover_text.textContent = "Game Over";
    restart.textContent = "Restart";
    overlay.style.display = "block";
    clearInterval(timerInterval);
    restart.addEventListener('click', function() {
        location.reload();
    });
}

function makeRandomButton(number_of_buttons, count=0) {
    number_of_buttons = level;
    let color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    let time = Math.round(((level * 3)/1.1 - (level * 2))+3);
    document.getElementById("countdownhtml").textContent = time + "S";
    let timerInterval = setInterval(function() {
        time--;
        document.getElementById("countdownhtml").textContent = time + "S";
        if (time <= 0) {
            clearInterval(timerInterval);
            endGame(timerInterval);
        }
    }, 1000);
    if (time <= 0) {
        clearInterval(timerInterval);
    }
    for (let i = 0; i < number_of_buttons; i++) {
        new_button = document.createElement('button');
        new_button.textContent = level;
        new_button.setAttribute("style", "position:absolute;");
        new_button.setAttribute("src", "some-image.jpg");
        new_button.style.width = "200px";
        new_button.style.height = "200px";
        buttons.appendChild(new_button);
        let xy = getRandomPosition(new_button);
        new_button.style.top = xy[0] + 'px';
        new_button.style.left = xy[1] + 'px';
        new_button.style.display = "block";
        new_button.style.height = "100px";
        new_button.style.width = "100px";
        new_button.style.borderRadius = "50%";
        new_button.style.backgroundColor = color;
        new_button.style.border = "red";
        new_button.addEventListener('click', function(e) {
            e.currentTarget.remove();
            count = count + 1;
            if (count === level) {
                clearInterval(timerInterval);
                nextLevel();
                makeRandomButton(level);
            }
        });
    }
}

makeRandomButton(level);

function nextLevel() {
    level++;
    level_document.textContent = "LEVEL " + level;
}
