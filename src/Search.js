import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {

  const navigate = useNavigate();
  const [input, setInput] = useState(null);

  //const [text, setText] = useState('');

  //const onChange = (e) => {
  //  setText(e.target.value);
  //};

  //const onReset = () => {
  //  setInput('');
  //};
  const searchHandler = e => { 
    if (e.target.value.length > 1) { 
      setInput(e.target.value)
    } else { 
      setInput(null)
    }
  }
  const submitMovie = e => { 
    e.preventDefault();
    navigate(`/search?query_term=${input}`)
  }

  return (
    <div className='Search'>
      <form onSubmit={submitMovie}>
        <input type="text" onChange={searchHandler} placeholder="search" />
        <button type='submit'>     
          <i className='xi-search'></i>
        </button>
      </form>
    </div>
  )
}

export default Search;