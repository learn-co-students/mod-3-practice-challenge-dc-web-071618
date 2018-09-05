const BOOKS_URL = `http://localhost:3000/books`
const USERS_URL = `http://localhost:3000/users`
let bookLikers;
let showPanel = document.getElementById('show-panel')

document.addEventListener("DOMContentLoaded", init)

function init() {
  fetchBooks()
}

function fetchBooks() {
  fetch(`${BOOKS_URL}`)
  .then(response => response.json())
  .then(data => data.forEach(book => {
    renderBookTitle(book)
  }))
}

function renderBookTitle(bookData) {
  let booksList = document.getElementById('list')
  let bookLi = document.createElement('li')
  bookLi.id = `li-book-${bookData.id}`
  bookLi.innerText = bookData.title

  bookLi.addEventListener('click', getBook)

  booksList.appendChild(bookLi)
}

function getBook() {
  let bookId = event.target.id.split('-')[2]

  fetch(`${BOOKS_URL}/${bookId}`)
  .then(response => response.json())
  .then(bookData => {
    renderBookInfo(bookData)
  })
  document.getElementById('show-panel').innerHTML = ''
}

function renderBookInfo(bookData) {
  showPanel.innerHTML = ''

  let title = document.createElement('h2')
  let image = document.createElement('img')
  let summary = document.createElement('p')

  title.innerText = bookData.title
  image.src = bookData.img_url
  summary.innerText = bookData.description

  showPanel.appendChild(title)
  showPanel.appendChild(image)
  showPanel.appendChild(summary)
  getBookUsers(bookData)
}

function getBookUsers(bookData) {
  let usersHeader = document.createElement('h3')
  let usersList = document.createElement('ul')
  let likeButton = document.createElement('button')
  usersHeader.innerText = 'Users who like this book:'
  usersList.id = 'users-list'
  likeButton.innerText = 'Like this book'
  likeButton.id = `like-btn-${bookData.id}`

  bookLikers = bookData.users

  likeButton.addEventListener('click', likeBook)

  showPanel.appendChild(usersHeader)
  showPanel.appendChild(usersList)
  showPanel.appendChild(likeButton)
  // debugger
  bookData.users.forEach(user => {
    renderBookUser(user)
  })
}

function likeBook() {
  let bookId = event.target.id.split('-')[2]
  let likersArray = []
  bookLikers.forEach(liker => {
    // debugger
    likersArray.push(liker.username)
  })

  // debugger
  if (!likersArray.includes('pouros')) {
    bookLikers.push({"id":1, "username":"pouros"})
  } else {
    alert('You liked this book already')
  }

  fetch(`${BOOKS_URL}/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      users: bookLikers
    })
  })
  .then(response => response.json())
  .then(data => renderBookInfo(data))
}

function renderBookUser(user) {
  let userItem = document.createElement('li')
  userItem.innerText = user.username

  document.getElementById('users-list').appendChild(userItem)
}
