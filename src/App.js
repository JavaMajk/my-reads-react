import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import MyBooks from './MyBooks'

class BooksApp extends Component {
  state = {
    books: [],
    reading: [],
    wantTo: [],
    read: []
  }

  componentDidMount() {
     this.updateShelves();
  }

  updateShelves() {
    BooksAPI.getAll()
    .then(books => {
      this.setState({books})
      this.setState({reading: books.filter(book => book.shelf === 'currentlyReading')})
      this.setState({wantTo: books.filter(book => book.shelf === 'wantToRead')})
      this.setState({read: books.filter(book => book.shelf === 'read')})
    }
    )
  }

  placeOnShelf(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(console.log(`${book.title} moved to ${shelf}`));
    this.updateShelves();
  } 

  render() {
    return (
      <div className="app">
        <Route path='/search-books' render={() => (
          //show search page
          <SearchBooks 
            books={this.state.books}
          />
        )}
        />
          
         <Route exact path='/' render={() => (
           <MyBooks 
           reading={this.state.reading}
           wantTo={this.state.wantTo}
           read={this.state.read}
           placeOnShelf={this.placeOnShelf}
           />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
