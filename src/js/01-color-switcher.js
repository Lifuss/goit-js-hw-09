const refs = {
    start: document.querySelector("[data-start]"),
    stop: document.querySelector("[data-stop]")
}
document.querySelectorAll('button').forEach(el => {
    el.style.width ="80px"
    el.style.height ="40px"
    el.style.textTransform ="uppercase"
})


let intervalId;
refs.start.addEventListener('click', (e) => {
    intervalId = setInterval(onClickColorChange, 1000)
    refs.start.setAttribute("disabled", "")
})

refs.stop.addEventListener('click', (e) => {
    clearInterval(intervalId)
    refs.start.removeAttribute("disabled")
})


function onClickColorChange () {
    document.body.style.backgroundColor = getRandomHexColor()
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
