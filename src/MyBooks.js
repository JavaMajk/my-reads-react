import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class MyBooks extends Component {
  render() {

   return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
            {this.props.loading === true ? <div className='loader'><img src='https://thumbs.gfycat.com/CooperativeCarelessGreatwhiteshark-max-1mb.gif' alt="Loading" height='150' width='150' /></div> : 
              this.props.reading.map(book => 
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={((book.imageLinks) && { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }) || { width: 128, height: 193, backgroundImage: `url(https://image.ibb.co/e8FJLo/no_cover.jpg)` }}></div>
                      <div className="book-shelf-changer">
                        <select defaultValue='currentlyReading' onChange={event => this.props.placeOnShelf(book, event.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              )
              }
            
               </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {this.props.loading === true ? <div className='loader'><img src='https://thumbs.gfycat.com/CooperativeCarelessGreatwhiteshark-max-1mb.gif' alt="Loading" height='150' width='150' /></div> :
                this.props.wantTo.map(book => 
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={((book.imageLinks) && { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }) || { width: 128, height: 193, backgroundImage: `url(https://image.ibb.co/e8FJLo/no_cover.jpg)` }}></div>
                      <div className="book-shelf-changer">
                        <select defaultValue='wantToRead' onChange={event => this.props.placeOnShelf(book, event.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              )
              }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {this.props.loading === true ? <div className='loader'><img src='https://thumbs.gfycat.com/CooperativeCarelessGreatwhiteshark-max-1mb.gif' alt="Loading" height='150' width='150' /></div> :
                this.props.read.map(book => 
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={((book.imageLinks) && { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }) || { width: 128, height: 193, backgroundImage: `url(https://image.ibb.co/e8FJLo/no_cover.jpg)` }}></div>
                      <div className="book-shelf-changer">
                        <select defaultValue='read' onChange={event => this.props.placeOnShelf(book, event.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              )
              }
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to='/search-books'>Add a book</Link>
      </div>
    </div>
    )
  }
}

export default MyBooks