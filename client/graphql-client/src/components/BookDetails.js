import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries'

function BookDetails (props) {
    const bookList = useQuery(getBookQuery, {
        variables: { id: props.bookId },
    });
    const displayBook = () => {
        if(!bookList.data) {
            return <div>No book selected</div>
        } else {
            const {book} = bookList.data;
            if(book === null) {
                return <div>No book selected</div>
            }
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map(book=>{
                            return <li key={book.id}>{book.name}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }
    return (
      <div id="book-details">
          {displayBook()}
      </div>
    );
  
}

export default BookDetails;
