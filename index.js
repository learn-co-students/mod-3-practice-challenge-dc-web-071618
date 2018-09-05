// let bookUsers

document.addEventListener("DOMContentLoaded", function() {
  console.log(`We are go for launch 🚀`)
  fetchBooks()
});

function fetchBooks(){
  fetch(`http://localhost:3000/books`)
  .then(res => res.json())
  .then(json => parseBooks(json))
  console.log(`📚 Here come the books 📚`)
}

function parseBooks(json){
  json.forEach(function(book){
    listBook(book)
  })
}

function listBook(book){
  let bookList = document.getElementById(`list`)
  let bookTitle = document.createElement(`li`)

  bookTitle.innerText = book.title
  bookTitle.dataset.id = `${book.id}`
  bookTitle.dataset.title = `${book.title}`
  bookTitle.dataset.description = `${book.description}`
  bookTitle.dataset.imgUrl = `${book.img_url}`

  bookList.appendChild(bookTitle)
  bookTitle.addEventListener('click', fetchOneBook)
}

function fetchOneBook(e){
  // debugger
  fetch(`http://localhost:3000/books/${parseInt(e.target.dataset.id)}`)
  .then(res => res.json())
  .then(json => renderBookDetails(json))
}

function renderBookDetails(json){
  let showPanel = document.getElementById(`show-panel`)
  showPanel.innerHTML = ""

  let id = json.id
  let title = json.title
  let description = json.description
  let image = json.img_url
  let users = json.users

  let bookTitle = document.createElement(`h2`)
  let bookDescription = document.createElement(`p`)
  let bookImage = document.createElement(`img`)
  let likeBtn = document.createElement('button')

  bookTitle.innerText = `${title}`
  bookDescription.innerText = `${description}`
  bookImage.src = `${image}`
  likeBtn.innerText = `Like this Book`
  likeBtn.id = `bookId_${id}`
  likeBtn.dataset.id = id
  // likeBtn.addEventListener('click', likeBook)
  // debugger

  likeBtn.addEventListener('click', () => {
    users.push({id:1, username: "pouros"})
    fetch(`http://localhost:3000/books/${parseInt(id)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify({
        users
      })
    })
    .then(res => res.json())
    .then(json => renderBookDetails(json))
  })

  showPanel.appendChild(bookTitle)
  showPanel.appendChild(bookImage)
  showPanel.appendChild(bookDescription)
  users.forEach(function(user){
    let userName = document.createElement('h3')
    userName.id = `userId_${user.id}`
    userName.innerText = user.username
    showPanel.appendChild(userName)
  })
  showPanel.appendChild(likeBtn)

}
