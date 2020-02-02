const jsclock = document.querySelector(".js-clock"),
    h1 = jsclock.querySelector("h1"); //querySelector은 해당 object의 아들을 찾아감.
// 태그,클래스,id를 css처럼 집어넣으면됨.

function getTime() {
    const date = new Date();
    const getHours = date.getHours();
    const getMinutes = date.getMinutes();
    const getSeconds = date.getSeconds();
    h1.innerText = `${getHours < 10 ? `0${getHours}`: getHours}:${getMinutes 
        < 10 ? `0${getMinutes}` : getMinutes}:${getSeconds 
            < 10 ? `0${getSeconds}` : getSeconds}`;
}


function init() { // 항상 함수는 나눠서 사용!!
    getTime();
    setInterval(getTime,1000);
    // setInterval(함수,시간) , 함수를 몇 밀리초 마다 실행 할지
}

init();