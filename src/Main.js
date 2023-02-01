import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import All from './All';
import List from './List';
import Load from './Load';

const Main = ({ limit }) => {

    const [movie, getMovie] = useState([]);
    const [load, setLoad] = useState(true);
    const MS = useRef(null);

    const handleImgError = (e) => { 
        e.target.src = process.env.PUBLIC_URL + "/cover.png"
    }

    const movieData = async () => { 
        const movie = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}`)
        getMovie(movie.data.data.movies)
        console.log(movie.data.data.movies)
        setLoad(false)
    }

    useEffect(() => { 
        movieData()
    },[])

    return (
        <>            
            <section className='Main'>
                {/* Nested routes로 만든 <Route>를 어디에 보여줄지 적을 때 */}
                <Outlet />
                <h2>TOP 100</h2>
                    {
                        load
                        ? <Load />
                        :
                        <Slider
                            slidesToShow={5}
                            arrows={false}
                            ref={MS}
                            centerMode={true}
                            centerPadding={'100px'}
                            >
                            {
                                movie.map(it => {
                                    return (
                                        <div key={it.id} className="itm">

                                            <Link to={`/detail/${it.id}`}>
                                                <figure>
                                                    <img src={it.large_cover_image} alt={it.title} onError={handleImgError} />
                                                </figure>
                                                <div className="case">
                                                    <div className='title'>{it.title_long}</div>
                                                    {/* <div className='desc'>{it.description_full.substr(0, 100)} ... </div> */}
                                                    <ul className='genre'>
                                                        {
                                                            it.genres.map((g, i) => <li key={i}>{g}</li>)
                                                        }
                                                    </ul>
                                                </div>
                                            </Link>

                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    }
                <div className='arrows'>
                    <i className='xi-arrow-left' onClick={() => MS.current.slickPrev()}></i>
                    <i className='xi-arrow-right' onClick={() => MS.current.slickNext()}></i>
                </div>
            </section>
            <All /> 
            <List genre='Romance' limit={16} />
            <List genre='Action' limit={16} />
            <List genre='Horror' limit={16} />            
        </>
    )
}

export default Main