const list = document.getElementById('list');
const showPanel = document.getElementById('show-panel');
console.log(list);

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books')
        .then(res => res.json())
        .then(books => {
            books.forEach(book => {
                renderBook(book);
                
            })
        });
});

function renderBook(book) {
    const li = document.createElement('li'); 
    li.innerText = book.title;
    list.appendChild(li);
    li.addEventListener('click', (event) => {
       renderShowPanel(book);
        showPanel.querySelector('button').addEventListener('click', (event) => {
            if(!(book.users.find(user => user.username === 'pouros'))) {
                debugger;
                console.log('no pouros')
                book.users.unshift({ id: 1, username: "pouros" })
            }
            
            fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({users: book.users})
            }).then(res => res.json())
                 .then(book => {
                    renderShowPanel(book)
                    console.log(book);
                 })
        });
    });
    

}

function renderShowPanel(book) {
    const p = document.createElement('p');
    const img = document.createElement('img');
    p.innerText = book.description;
    img.src = book.img_url;
    showPanel.innerHTML = '';
    showPanel.appendChild(img);
    showPanel.appendChild(p);
    console.log(book.users);
    showPanel.innerHTML += `<p>${book.users.slice(0, -1).map(user => {
        return user.username
    }).join(', ')} and ${book.users[book.users.length - 1].username} like this.</p>`
    showPanel.innerHTML += `<button id="${book.id}">Like</button>`
}

// function renderShowPanel(event) {
//     const p = document.createElement('p');
//     const img = document.createElement('img');
//     p.innerText = book.description;
//     img.src = book.img_url;
//     showPanel.innerHTML = '';
//     showPanel.appendChild(img);
//     showPanel.appendChild(p);
// }
