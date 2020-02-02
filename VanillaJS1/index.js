const description = document.getElementById("description");
description.innerHTML = 'description';
description.style.color = "#";

const title = document.querySelector("#title");
title.innerHTML = "i mean";

function handleResize(event) {
    console.log(event);
}

window.addEventListener('resize',handleResize);

function fixdes() {
    description.style.color = "blue";
}

description.addEventListener('click',fixdes);