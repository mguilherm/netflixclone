import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import './App.css';

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //all list 

      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //featured film
      let originals = list.filter(i=> i.slug === 'originals');
      let ramdomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[ramdomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)

    }
   loadAll();

  }, [])

  useEffect (() => {
    const scrollListener = () => {
      window.scrollY > 20 ? setBlackHeader(true) : setBlackHeader(false)
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);


  return (
    <div className="page">
      <Header black={blackHeader}/>
      { featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow 
              key= {key}
              title = {item.title}
              items={item.items}
            />
          </div>
        ))}
      </section>
      
    </div>
  )
}