import React, { useState } from 'react'
//import axios from 'axios'
//import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const Search = () => {

  // const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState(null);
  // const getMovie = async () => {
  //     const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${input}`);
  //     setMovie(res.data.data.movies)
  // }

  const searchHandler = e => { 
    if (e.target.value.length > 2) { 
      setInput(e.target.value)
    } else { 
      setInput(null)
    }
  }
  const submitMovie = e => { 
    e.preventDefault();
    // getMovie();
    navigate(`/search?query_term=${input}`)
  }

  return (
    <div className='Search'>
      <form onSubmit={submitMovie}>
          <input type="text" onChange={searchHandler} placeholder="search" />
        <button>     
          {/* <BiSearchAlt2 className='search_icon'/> */}
          <i className='xi-search'></i>
        </button>
      </form>
    </div>
  )
}
//https://yts.mx/api/v2/list_movies.json?query_term=godfather
export default Search;