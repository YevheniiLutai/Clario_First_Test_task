let modalMenu = document.getElementById('modal_window');

document.getElementById('modal_button_unistall').addEventListener("click", () => {
    modalMenu.style.display = "none";
    setTimeout(() => {
        alert("DONE");;
    },50)
})
document.getElementById('open_pop_up').addEventListener("click", () => {
    modalMenu.style.display = "flex";
    modalMenu.classList.remove("close_left");
    modalMenu.classList.remove("close_down");
})
document.getElementById('modal_button_close').addEventListener("click", () => {
    modalMenu.classList.add("close_left");
})
document.getElementById('icon_close').addEventListener("click", () => {
    modalMenu.classList.add("close_down");
})
window.addEventListener("click", (event) => {
    if (event.target == modalMenu) {
        modalMenu.classList.add("close_left");
    }
})