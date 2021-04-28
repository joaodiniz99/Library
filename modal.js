const modal = document.getElementById('myModal');
const newBookBtn = document.getElementById('newBook');

newBookBtn.onclick = () => {
    modal.style.display = 'block';
}

window.onclick = (event) => {
    if(event.target == modal) {
        modal.style.display = 'none';
    }
}