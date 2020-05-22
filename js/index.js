'use strict';
let srcList = Array.from(document.querySelectorAll('[data-img]')).map(item => item.src);
let img = document.getElementById('modal-img');
let modal = document.getElementById('modal');
let close = document.getElementById('close');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let currentIndex = 0;
function openModalWindow(event) {
    let target = event.target;
    if(target.tagName !== "IMG") {
        return
    }
    modal.classList.add('is-open');
    document.body.classList.add('body-hidden');
    srcList.forEach((item, index) => {if(item === target.src) currentIndex = index});
    img.src = srcList[currentIndex];
}
function closeModalWindow() {
    modal.classList.remove('is-open');
    document.body.classList.remove('body-hidden');
}
function prevSlide() {
    if(currentIndex > 0) img.src = srcList[--currentIndex];
}
function nextSlide() {
    if(currentIndex < srcList.length - 1) img.src = srcList[++currentIndex];
}
document.addEventListener("click", (e) => { openModalWindow(e) });
close.addEventListener("click", closeModalWindow);
prev.addEventListener("click", prevSlide);
next.addEventListener("click", nextSlide);