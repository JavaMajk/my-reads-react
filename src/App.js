import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import MyBooks from './MyBooks'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  updateShelves = () => {
    BooksAPI.getAll()
    .then(books => {
      this.setState({books}, () => {
      this.setState({reading: books.filter(book => book.shelf === 'currentlyReading')})
      this.setState({wantTo: books.filter(book => book.shelf === 'wantToRead')})
      this.setState({read: books.filter(book => book.shelf === 'read')})
    })
    }
    )
  }

  placeOnShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(
    this.updateShelves(),
    toast.success(`${book.title} was moved!`)
  );
  } 

  render() {
    return (
      <div className="app">
        <Route path='/search-books' render={() => (
          //show search page
          <SearchBooks 
            books={this.state.books}
            placeOnShelf={this.placeOnShelf}
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
        <ToastContainer className='toast-container'
          toastClassName="dark-toast" transition={Slide} closeButton={false} hideProgressBar autoClose={2500}/>
      </div>
    )
  }
}

export default BooksApp
