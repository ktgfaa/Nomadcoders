const body = document.querySelector("body");


const IGM_NUMBER = 3;


function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`; // image에 path를 저장
    image.classList.add("bjImage"); // 저장된 image에 class이름 추가해서 css로 컨트롤
    body.prepend(image);
    // prepend()는 선택한 요소의 내용의 앞에 콘텐트를 추가
}

function genRandom() {
    const number = Math.floor(Math.random() * IGM_NUMBER);
    // floor는 반올림 ceil은 반내림
    return number;
}


function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();