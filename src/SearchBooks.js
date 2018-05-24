import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static protoTypes = {
    query: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired
  }
  
  state = {
    //Use 'Art' as default query so search page does not load empty
    query: 'Art',
    results: []
  }

  componentDidMount() {
    this.listResults();
  }

  listResults = () => BooksAPI.search(this.state.query, 20)
  .then(results => {
    this.setState({ results })
   })

  updateQuery = newQuery => {
    //Here we use this.listResults ina a callback function. See why at: https://goo.gl/9zF1Pg
    this.setState({ query: newQuery.trim() }, () => {this.listResults()});
    console.log(this.state.results);
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
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
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