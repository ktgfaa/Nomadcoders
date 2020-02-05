const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); 
    // localStorage는 string만 받으므로 JSON.stringify() 로 변환해서 넣기.
}

function deleteToDo(event){
    const btn = event.target; // target으로 이벤트를 발생한 버튼 찾기
    const li = btn.parentNode; // 그 버튼으로 parentNode해서 부모 찾기
    toDoList.removeChild(li); // li 삭제
    const cleanToDos = toDos.filter(function(toDo){
        // filter(함수)는 array 함수이며 , 조건을 return해서 true인 값들만 array(cleanToDos)
        // 로 넣는다. 
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; // 다시 toDos array 초기화.
    saveToDos(); // localStorage도 초기화.
}

function paintToDo(text) { // 실제로 TODO를 만드는 역할
    const li = document.createElement("li"); // createElement로 각 태그 만들기
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1; // localStorage에 들어갈 value(id)
    span.innerText = text;
    li.appendChild(delBtn); //appendChild 로 li의 자식으로 넣기.
    li.appendChild(span);
    li.id = newId;  // 각 생성되는 li에 id값 할당.
    toDoList.appendChild(li);
    const toDoObj = { // localStorage에 들어갈 value값 object
        text : text,
        id : newId
    };
    toDos.push(toDoObj); // array에 TODO object 넣기
    saveToDos(); // 함수로 localStorage에 value값으로 object 넣기
}

function handleSubmit(event) { //toDo 를 submit 했을 때 발생하는 이벤트 처리
    event.preventDefault(); // 기존 이벤트 무효
    const currentValue = toDoInput.value;
    paintToDo(currentValue); // paintToDo 함수로 li를 만들어서 파라미터값으로 내용만듬.
    toDoInput.value = ""; //input 다시 초기화.
}

function loadToDo() { 
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null){
        const loadedToDos = localStorage.getItem(TODOS_LS);
        if(loadedToDos !== null){
            const parsedToDos = JSON.parse(loadedToDos); // 로컬에 저장된 String을 다시 object로 반환.
            parsedToDos.forEach(function(toDo){ // 새로고침 해도 로컬에 저장된 값들이 paintToDo 함수
                // 로 인해 불러옴.
                paintToDo(toDo.text);
            });
        }
    }
}

function init() {
    loadToDo(); 
    toDoForm.addEventListener("submit", handleSubmit);
}

init();