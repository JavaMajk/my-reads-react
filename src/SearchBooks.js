import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static protoTypes = {
    query: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }
  
  state = {
    //Use 'Art' as default query so search page does not load empty
    query: 'Art',
    results: [],
  }

  componentDidMount() {
    this.listResults();
  }
  
  //Compare books on my shelves with search results to displaye with correct value selected in shelf picker 
  searchChecker = results => {
    let checkedBooks = results;
    this.props.books.forEach(bookOnShelve => {
      if(typeof checkedBooks !== 'undefined' && checkedBooks.constructor === Array) {
      checkedBooks.map(searchedBook => {
        searchedBook.id === bookOnShelve.id ? searchedBook.shelf = bookOnShelve.shelf : searchedBook;
      });
    }
    });
    this.setState({ results: checkedBooks });
}

  listResults = () => BooksAPI.search(this.state.query, 20)
  .then(results => {
    //Send the returned results to check against books on my shelves
    this.searchChecker(results)
   })

  updateQuery = newQuery => {
    //Here we use this.listResults ina a callback function. See why at: https://goo.gl/9zF1Pg
    this.setState({ query: newQuery.trim() }, () => {this.listResults()});
  }
  
  
  render() {  
    return (
      <div className="search-books">
            <div className="search-books-bar">
             <Link to='/' className="close-search"></Link>
              <div className="search-books-input-wrapper">
                <input type="text"
                placeholder="Search by title or author"
                onChange={event => this.updateQuery(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {(this.state.results) && (this.state.results.length > 0)  && this.state.results.map(book => 
                <li key={book.id}>
                  <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={((book.imageLinks) && { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }) || { width: 128, height: 193, backgroundImage: `url(https://image.ibb.co/e8FJLo/no_cover.jpg)` }}></div>
                            <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={event => this.props.placeOnShelf(book, event.target.value)}>
                                <option value="nonee" disabled>Move to...</option>
                                <option value="none">None</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors} </div>
                        </div>
                </li>)
              }
              </ol>
            </div>
          </div>
    )
  }
}

export default SearchBooks