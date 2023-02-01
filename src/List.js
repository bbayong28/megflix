import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Load from './Load';
import { Link } from 'react-router-dom';

const List = ({ genre, limit }) => {
  //데이터 가져오기
  //useState([])에 처음 설정을 []로 안해주면 map 뿌릴 때 에러남
  const [movie, getMovie] = useState([]);
  const [load, setLoad] = useState(true);
  console.log(genre, limit);

  const movieData = async () => { 
    setLoad(true)
    const movieItem = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&genre=${genre}`)
    console.log(movieItem.data.data.movies);        
    getMovie(movieItem.data.data.movies);
    setLoad(false)
  }

  useEffect(() => {
      movieData();
  }, [genre])

  return (
    <section className='List sec'>
      <div className='inner flex'>
        <h2>{genre}</h2>
        <span >
          <Link to={`/${genre}`} >더 보기<i className='xi-plus'></i></Link>
        </span>
      </div>
      {
        load 
          ? <Load />
          :
          <ul className='inner grid'>
            {
              movie.map((it) => { 
                return (
                  <li key={it.id} className='itm'>
                    <Link to={`/detail/${it.id}`}>
                      <figure>
                        <img src={it.medium_cover_image} alt={it.title} />
                      </figure>
                      <div className='case'>
                        <div className='desc'>{ it.title }</div>
                      </div>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
      }
    </section>
  )
}

export default List