import { useEffect } from 'react';
import { useState } from 'react';
import { api_key, imageUrl } from '../../datas/Datas';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './Home.css';
import CardPopular from '../../component/CardPopular';

export default function Home(){

    const [filmName, setFilmName] = useState('');
    const [isLoading, toogleIsLoading] = useState(true);
    const [popularFilms, setPopularFilms] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);

    useEffect(() => {   
        toogleIsLoading(true);
        const fetchFilms = async () => {
            fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&language=fr-FR`)
                .then(res => res.json())
                .then(res => {
                    setPopularFilms(res.results)
                })
            
        }

        const fetchSeries = async () => {
            fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}&language=fr-FR`)
                .then(res => res.json())
                .then(res => {
                    setPopularSeries(res.results)
                })
            
        }

        fetchFilms();
        fetchSeries();

        toogleIsLoading(false);
        
    }, [])
    

    return(
        <div className='grid grid-cols-1 gap-5 text-center p-10'>
            <div className='text-6xl'>FindMyMovie</div>
            <div className='text-2xl italic'>Ce site vous permettra de trouver un film pour ce soir efficacement !</div>
            <div className='flex gap-2 p-10 '>
                <input type='text' placeholder='Tapez ici le nom de votre film ...' value={filmName} onChange={(e) => setFilmName(e.target.value)} className='p-2 hover:ring-offset-2 selected hover:ring-2 ring-[#FF7D00] rounded-full shadow-md sm:w-full w-full' />
                <button className='border border-[#78290F] rounded-full p-3 w-[60px]'>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 17L22 22M19.5 10.75C19.5 15.5825 15.5825 19.5 10.75 19.5C5.91751 19.5 2 15.5825 2 10.75C2 5.91751 5.91751 2 10.75 2C15.5825 2 19.5 5.91751 19.5 10.75Z" stroke="rgba(0,0,0,0.95)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
            </div>
            {
                isLoading? 
                    <div className='text-center'>
                        Chargement des informations ...
                    </div>
                :
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
                        <div>
                            <h1 className='text-3xl'>Films populaire du moment</h1>
                            <div className='flex gap-5 overflow-auto p-2'>
                                {
                                    popularFilms.map((film) => {
                                        return(
                                            <CardPopular srcImg={imageUrl + film.poster_path} pathToMovie={`/movie/${film.id}`} title={film.title}  />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <h1 className='text-3xl'>Séries populaire du moment</h1>
                            <div className='flex gap-5 overflow-auto p-2'>
                                {
                                    popularSeries.map((serie) => {
                                        return(
                                            <CardPopular srcImg={imageUrl + serie.poster_path} pathToMovie={`/movie/${serie.id}`} title={serie.name}  />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
            }
            
        </div>
    );
}