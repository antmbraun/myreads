import React, { Component } from 'react'
// import * as BooksAPI from '../BooksAPI'


class Book extends Component {

    handleShelfChange(shelf) {
        this.props.changeShelf(this.props.book, shelf)
    }
    
    render() {
        const book = this.props.book 

        return (
            <div className="book">
                <div className="book-top">
                {book.imageLinks !== undefined && (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${book.imageLinks.smallThumbnail} )` }}></div>)}
                    <div className="book-shelf-changer">
                        <select defaultValue={this.props.book.shelf ? this.props.book.shelf : "none"} onChange={(e) => this.handleShelfChange(e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title !== undefined && (book.title)}</div>
                <div className="book-authors">{book.authors !== undefined && (book.authors)}</div>
            </div>
        )
    }
}

export default Book