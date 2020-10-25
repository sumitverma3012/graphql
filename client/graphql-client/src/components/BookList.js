import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails';

function BookList () {
    const bookList = useQuery(getBooksQuery);
    const [bookId, setBookId] = useState(undefined);
    
    const displayBooks = () => {
      let list;
      console.log(bookList)
      if(bookList.loading) {
        list = <div>Loading...</div>
      }
      if(bookList && bookList.data && bookList.data.books) {
        list =  bookList.data.books.map(book => {
          return <li key={book.id} onClick={(e) => setBookId(book.id)}>{book.name}</li>
        })
      }
      return list;
      
    }
    return (
      <div>
        <ul id="book-list">
          {displayBooks()}
        </ul>
        <BookDetails bookId={bookId}/>
      </div>
    );
  
}

export default BookList;
