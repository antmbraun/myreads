import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

import Book from './Book'

class SearchPage extends Component {

  state = {
    searchResultsWithShelves: []
  }

  onInputChange = (input) => {
    if (input) {
      BooksAPI.search(input)
        .then( (searchResults) => {

          // see if any of the books are on one of the user's shelves
          let searchResultsWithShelves = []
          
          // Display error if no results found
          if (searchResults.error) {
            searchResultsWithShelves = "error"
          }
          else {
            const books = this.props.books
            for (let result of searchResults) {
              for (const book of books) {
                if (result.id === book.id) {
                  result.shelf = book.shelf
                }
              }
              searchResultsWithShelves.push(result)
            }
          }
         

          this.setState( () => ({
            searchResultsWithShelves
          }))
        })
    }
    else {
      this.setState( () => ({
        searchResults: []
      }))
    }
  }


  render() {
      return (
          <div className="search-books">
          <div className="search-books-bar">
            <Link to='/'><button className="close-search">Close</button></Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author" onChange={(e) => this.onInputChange(e.target.value)}/>
            </div>
          </div>
          <div className="search-books-results">
            {
              this.state.searchResultsWithShelves == "error"  ? 
                <div>No results</div> : 
                <div className="bookshelf">
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.searchResultsWithShelves.map( 
                        (book) => (
                          <li key={book.id}>
                            <Book book={book} changeShelf={this.props.changeShelf}/>
                          </li>  
                        ))}
                    </ol>
                  </div>
                </div>
            }
          </div>
        </div>
      )
    }
}

export default SearchPage