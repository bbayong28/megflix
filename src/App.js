/* eslint-disable */

import React, { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import './common.scss'
import Header from './Header';
import Main from './Main';
import Detail from './Detail'
import Glist from './Glist';
import SearchResult from './SearchResult'

const App = () => {
  const [menu, setMenu] = useState(false);

  const onChangeColor = (e, id) => {
    //e.preventDefault();
    setMenu(id);
  };
  

  const genreList = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Romance",
    "Thriller",
    "Western",
  ];

  return (
    <div>
      <Header>        
        <ul className='flex'>
          {
            genreList.map((it, idx) => { 
              return (                
                <li key={idx} className={ menu === it ? "on" : ""}>
                  <Link to={it} onClick={(e) => onChangeColor(e, it)} >{it}</Link>
                </li>
              )
            })
          }
        </ul>
      </Header>

      <Routes>
        {/* 
         * Nested routes
         * Nested => 태그안에 태그가 들어간 것.
         * <Route></Route>안에 <Route/>를 넣는 방법 => 현재 라우트 위치에 더 연결해주는 것
         * Nested routes를 쓰고 표현하려면 사용할 곳에 <Outlet> 태그를 쓰면 됨.
         */}
        <Route path="/" element={<Main limit={50} />}>
            <Route path="/detail/:id" element={<Detail />} />
        </Route>
        {
            /* <Route path="/Action"/> => <Route path={genreList[0]}/> => 일일히 열개다 못적으니까 map으로 돌리자!! 하고 useEffect에 [genre]를 적어줘야 바뀜. 새로 바뀌는걸 한번 가져오는거라서!*/
            genreList.map((it, idx) => {
                return (
                    <Route path={it} element={<Glist genre={it} limit={20} />} key={idx}>
                        <Route path={`/${it}/:id`} element={<Detail limit={50} />} />
                    </Route>
                )
            })
        }

        <Route path="/search" element={<SearchResult limit={40} />}>
            <Route path="/search/:id" element={<Detail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
