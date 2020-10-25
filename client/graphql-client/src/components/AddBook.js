import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook () {
    const booksQuery = useQuery(getBooksQuery);
    const authorsList = useQuery(getAuthorsQuery);
    const [addBook, {data}] = useMutation(addBookMutation);
    const [bookName, setBookName] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [genre, setGenre] = useState('');
    
    const displayAuthors = () => {
      if(authorsList.loading) {
        return <option disabled>Loading...</option>;
      }
      return authorsList.data.authors.map(author => {
        return <option key={author.id} value={author.id}>{author.name}</option>
      })
    }

    const submitForm = (e) => {
        e.preventDefault();
        addBook({ 
            variables: { 
                name: bookName,
                authorId: authorId,
                genre: genre
            },
            refetchQueries: () => [{query: booksQuery}]
        }) 
        
    }
    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book Name: </label>
                <input type="text" onChange={(e) => setBookName(e.target.value)}></input>
            </div>
            <div className="field">
                <label>Genre: </label>
                <input type="text" onChange={(e) => setGenre(e.target.value)}></input>
            </div>
            <div className="field">
                <label>Author: </label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select author:</option>
                    <>{displayAuthors()}</>
                </select>
            </div>
            <button>+</button>
        </form>
    );
  
}

export default AddBook;
