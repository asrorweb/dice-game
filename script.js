const diceImg = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player_section_1 = document.querySelector(".player--0");
const player_section_2 = document.querySelector(".player--1");
const btn_new_game = document.querySelector(".btn--new");

let currenScore_Text_1 = document.querySelector("#current--0");
let currenScore_Text_2 = document.querySelector("#current--1");

let score_player1_text = document.querySelector("#score--0");
let score_player2_text = document.querySelector("#score--1");

let cub = document.querySelector(".cube");

let curent_score_buffer_1 = 0;

let score_player1_buffer = 0;
let score_player2_buffer = 0;

let game_over = true;
let next_player = true;

btnRoll.addEventListener("click", () => {
    if (game_over) {
        // o'yin tugamaguncha ishlaydi
        const random_num = Math.floor(Math.random() * 6) + 1;
        console.log(random_num);

        findPoint_and_EqualizeTransform(random_num);

        curent_score_buffer_1 += random_num;

        cub.style.animationName = "cubanimation";

        addAnimation(random_num);
        console.log(random_num);

        game_over = false;

        setTimeout(() => {
            cub.style.animationName = "";

            // cub.style.transform =

            game_over = true;

            // 1-oyinchi ochko 1 chiqsa nargi uinchiga utadi
            if (next_player) {
                if (random_num == 1) {
                    curent_score_buffer_1 = 0;
                    currenScore_Text_1.textContent = curent_score_buffer_1;
                    next_player = false;

                    toogleClassActive();
                } else {
                    currenScore_Text_1.textContent = curent_score_buffer_1;
                }
            }
            // 2-oyinchi  1 chiqsa nargi uinchiga utadi
            else {
                if (random_num == 1) {
                    curent_score_buffer_1 = 0;
                    currenScore_Text_2.textContent = curent_score_buffer_1;
                    next_player = true;

                    toogleClassActive();
                } else {
                    currenScore_Text_2.textContent = curent_score_buffer_1;
                }
            }
        }, 3000);
    }
});

// o'yichi ochko oladi va kiyingi uyinchiga utqizib yuboradi
btnHold.addEventListener("click", () => {
    if (game_over) {
        if (next_player) {
            score_player1_buffer += curent_score_buffer_1;
            score_player1_text.textContent = score_player1_buffer;
            curent_score_buffer_1 = 0;
            currenScore_Text_1.textContent = "0";
            next_player = false;

            toogleClassActive();
        } else {
            score_player2_buffer += curent_score_buffer_1;
            score_player2_text.textContent = score_player2_buffer;
            curent_score_buffer_1 = 0;
            currenScore_Text_2.textContent = "0";
            next_player = true;

            toogleClassActive();
        }

        //1 o'yinchi 100dan utsa knopkala ishlame qoladi uyin tugaydi
        if (score_player1_buffer >= 15 || score_player2_buffer >= 15) {
            let winner =
                score_player1_buffer >= 15
                    ? player_section_1
                    : player_section_2;

            winnerColor(winner);

            game_over = false;
        }
    }
});

// new game btn
btn_new_game.addEventListener("click", () => {
    game_over = true;
    console.log("reset game");
    restartGame();
});

// class ni undan bunga utqizib turadi
function toogleClassActive() {
    player_section_1.classList.toggle("player--active");
    player_section_2.classList.toggle("player--active");
}

// yutgan uyinchiga yashil rang beradi
function winnerColor(winnerPlayer) {
    winnerPlayer.style.backgroundColor = "green";
}

// winner rangini olish
function restartGame() {
    score_player2_buffer = 0;
    score_player2_text.textContent = score_player2_buffer;

    curent_score_buffer_1 = 0;
    currenScore_Text_2.textContent = curent_score_buffer_1;

    score_player2_buffer = 0;
    score_player1_text.textContent = score_player2_buffer;

    curent_score_buffer_1 = 0;
    currenScore_Text_1.textContent = curent_score_buffer_1;

    next_player = true;

    player_section_1.classList.add("player--active");
    player_section_2.classList.remove("player--active");

    player_section_1.style.backgroundColor = "";
    player_section_2.style.backgroundColor = "";
}

function findPoint_and_EqualizeTransform(point) {
    let transform;
    switch (point) {
        case 1:
            transform = "rotateX(0deg) rotateY(0deg)";
            break;
        case 2:
            transform = "rotateX(180deg) rotateY(0deg)";
            break;
        case 3:
            transform = "rotateX(0deg) rotateY(270deg)";
            break;
        case 4:
            transform = "rotateX(90deg) rotateY(0deg)";
            break;
        case 5:
            transform = "rotateX(270deg) rotateY(0deg)";
            break;
        case 6:
            transform = "rotateX(0deg) rotateY(90deg)";
            break;
    }

    cub.style.transform = transform;
}

function addAnimation(point) {
    let transform;
    let style = document.createElement("style");

    switch (point) {
        case 1:
            transform = "rotateX(0deg) rotateY(0deg)";
            break;
        case 2:
            transform = "rotateX(180deg) rotateY(0deg)";
            break;
        case 3:
            transform = "rotateX(0deg) rotateY(270deg)";
            break;
        case 4:
            transform = "rotateX(90deg) rotateY(0deg)";
            break;
        case 5:
            transform = "rotateX(270deg) rotateY(0deg)";
            break;
        case 6:
            transform = "rotateX(0deg) rotateY(90deg)";
            break;
    }

    let keyFrames = `

    @keyframes cubanimation {
        0% {
            transform: rotateX(45deg) rotateY(-125deg);
        }
        25% {
            transform: rotateX(-125deg) rotateY(-160deg);
        }
        50% {
            transform: rotateX(220deg) rotateY(250deg);
        }
        75% {
            transform: rotateX(360deg) rotateY(0deg);
        }
        100% {
            transform: ${transform};
        }
    }`;

    style.innerHTML = keyFrames;
    document.getElementsByTagName("head")[0].appendChild(style);

    setTimeout(() => {
        document.getElementsByTagName("head")[0].removeChild(style);
    }, 3000);
}
