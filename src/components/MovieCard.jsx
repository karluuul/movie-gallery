import React, {useState, useEffect} from 'react'

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language, overview} }) => {

  const [isMobile, setIsMobile] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Detect mobile and update state
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.matchMedia("(max-width: 820px)").matches);
    
    checkIfMobile(); // Check on first load
    window.addEventListener("resize", checkIfMobile); // Listen for resizes

    return () => window.removeEventListener("resize", checkIfMobile); // Cleanup
  }, []);

  // Toggle overview on click (only for mobile)
  const toggleOverview = () => {
    if (isMobile) {
      setIsActive(!isActive);
    }
  };

  return (
    <div
      className={`movie-card relative rounded-xl overflow-hidden shadow-lg ${isActive ? "active" : ""}`}
      onClick={toggleOverview} // Click works only on mobile
    >
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png' } alt={title}/>

      <div className='mt-4'>
        <h3>{title}</h3>

        <div className='content'>
            <div className="rating">
                <img src='star.svg' alt='star icon'/>
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span>•</span>
            <p className="lang">{original_language}</p>
           
            
            <span>•</span>
            <p className="year">
                {release_date ? release_date.split('-')[0] : 'N/A'}
            </p>
            <div className='overview'>
              <p className='text-white'>{overview}</p>
            </div>
           
        </div>
      </div>
    </div>
  )
}

export default MovieCard
