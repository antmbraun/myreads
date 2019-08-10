import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {


    shelfNames = {
        "currentlyReading": "Currently Reading",
        "wantToRead": "Want to Read",
        "read": "Read"
    }

    shelfName = this.shelfNames[this.props.shelf]

    render() {
        const books = this.props.books
        console.log(books)


        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        books
                            .filter( (book) => { return book.shelf === this.props.shelf})
                            .map( (book) => (
                                <li key={book.id}>
                                    <Book book={book} changeShelf={this.props.changeShelf}/>
                                </li>
                        )
                    )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf