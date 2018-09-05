//On page load, make a fetch GET request and display all of the books in a list.
//When a user clicks a book, make a fetch GET request and display the book's thumbnail, description, and users who have liked it.
//When a user clicks the 'Read Book' button, send a PATCH request to http://localhost:3000/books/:id to add the user's name to the users who like the book.

document.addEventListener("DOMContentLoaded", getBooks)

function getBooks() {
  fetch("http://localhost:3000/books")
  .then(response => response.json())
  .then(booksData => {
    booksData.forEach(
      bookData => renderBookTitleToList(bookData))
    })
}

function renderBookTitleToList(book) {
  let bookList = document.querySelector("#list")
  let bookListItem = document.createElement('li')
  bookListItem.innerText = book.title
  bookListItem.id = `book-${book.id}`
  bookListItem.addEventListener('click', getBookInfo)
  bookList.appendChild(bookListItem)
}

function getBookInfo(event) {
  bookId = event.target.id.split('-')[1]
  fetch(`http://localhost:3000/books/${bookId}`)
  .then(response => response.json())
  .then(bookData => renderBookInfo(bookData))
}

function renderBookInfo(book) {
  let showDiv = document.querySelector("#show-panel")
  showDiv.innerHTML = ""
  let bookDiv = document.createElement('div')
  let titleElement = document.createElement('h1')
  let pictureElement = document.createElement('img')
  let descriptionElement = document.createElement('p')
  let usersElement = document.createElement('div')
  let usersWhoLikeElement = document.createElement('h4')
  let likeButton = document.createElement('button')
  bookDiv.id = `book-${book.id}`
  titleElement.innerText = book.title
  pictureElement.src = book.img_url
  descriptionElement.innerText = book.description
  usersWhoLikeElement.innerText = "Users Who Like This Book:"
  usersElement.appendChild(usersWhoLikeElement)
  book.users.forEach(user => {
      let userElement = document.createElement('p')
      userElement.innerText = user.username
      usersElement.appendChild(userElement)
    }
  )
  likeButton.innerText = "Like Book"
  likeButton.addEventListener('click', function() {likeBook(book)})
  bookDiv.appendChild(titleElement)
  bookDiv.appendChild(pictureElement)
  bookDiv.appendChild(descriptionElement)
  bookDiv.appendChild(usersElement)
  bookDiv.appendChild(likeButton)
  showDiv.appendChild(bookDiv)
}

function likeBook(book) {
  likingUsers = book.users
  checkforCurrentUser = likingUsers.filter(user => (user.id === 1))
  if (checkforCurrentUser.length === 0) {
    likingUsers.push({"id":1, "username":"pouros"})
  } else {
    alert("You've already liked this book!")
  }
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    body: JSON.stringify({users: likingUsers}),
    headers: {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
    }
  })
  .then(response => response.json())
  .then(updatedBookData => renderBookInfo(updatedBookData))
}
