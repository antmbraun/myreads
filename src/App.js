import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

// components
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  changeShelf = (book, shelf) => {
    if (!book.shelf) {
      this.setState((currentState) => {
        book.shelf = shelf
        currentState.books.push(book)
      })
    }
    else {
      this.setState((currentState) => ({
        books: currentState.books.map( b => {
          if (b.id === book.id)
            b.shelf = shelf
          return b
        })
      }))
    }
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path ='/' render={() => ( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={this.state.books} changeShelf={this.changeShelf} shelf="currentlyReading" />
                <BookShelf books={this.state.books} changeShelf={this.changeShelf} shelf="wantToRead" />
                <BookShelf books={this.state.books} changeShelf={this.changeShelf} shelf="read" />
              </div>
            </div>

            <div className="open-search">
              <Link to='/search'><button>Add a book</button></Link>
            </div>
      
          </div>
        )} />
        <Route path ='/search' render={() => ( 
          <SearchPage books={this.state.books} changeShelf={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp