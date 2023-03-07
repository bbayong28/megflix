import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import Gall from './Gall';
import Load from './Load';

const Glist = ({ genre, limit }) => {
    //데이터 가져오기
    const [movie, getMovie] = useState([]);
    const [load, setLoad] = useState(true);
    const MS = useRef(null);
    const handleImgError = (e) => {
        e.target.src = process.env.PUBLIC_URL + "/assets/img/cover.png";
    }
    const movieData = async () => {
        setLoad(true)
        const movie = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&genre=${genre}`);
        getMovie(movie.data.data.movies);
        //console.log(movie.data.data.movies);
        setLoad(false)
    }
    useEffect(() => {
        movieData()
    }, [genre])
    return (
        <>
            <section className='Main'>
                <Outlet />
                <h2>TOP 20</h2>
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

                                            <Link to={`/${genre}/${it.id}`}>
                                                <figure>
                                                    <img src={it.large_cover_image} alt={it.title} onError={handleImgError} />
                                                </figure>
                                                <div className="case">
                                                    <div className='title'>{it.title_long}</div>
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
                <div className="arrows">
                    <i className="xi-arrow-left" onClick={() => MS.current.slickPrev()}></i>
                    <i className="xi-arrow-right" onClick={() => MS.current.slickNext()}></i>
                </div>

            </section>
            <Gall genre={genre} />
        </>
    )
}

export default Glist;