import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {

  const navigate = useNavigate();
  const [input, setInput] = useState(null);
  const searchHandler = e => { 
    if (e.target.value.length > 2) { 
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
        <button>     
          <i className='xi-search'></i>
        </button>
      </form>
    </div>
  )
}

export default Search;