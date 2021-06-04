const URL = "https://api.themoviedb.org/3/movie/popular?api_key";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?api_key=caf4a8ceafae6b529c70286b84890047&query";
const API_KEY = "caf4a8ceafae6b529c70286b84890047";
const ImagePath = "https://image.tmdb.org/t/p/w1280";

// Selectors
const allMovieInfo = document.querySelector(".allMovieInfo");
const search = document.querySelector(".inputSearch");

// events
search.addEventListener('keypress', searchMovie);
allMovieInfo.innerHTML = "";

// functions

//  get movie data
async function getMovieInfo(value) {
  let response = await fetch(`${SEARCHAPI}=${value}`);
  let movieData = await response.json();
  console.log(movieData.results)
  movieData.results.forEach((allMovie) => {
    const { vote_average, original_title, title, poster_path, overview } = allMovie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movies");
    movieEl.innerHTML = "";
    movieEl.innerHTML = `
                        <div class="img">
                            <img src="${
                              ImagePath + poster_path
                            }" alt="${title}">
                        </div>
                        <div class="movieName">
                            <h5>${original_title}</h5>
                            <span class=${ratingColor(
                              vote_average
                            )}>${vote_average}</span>
                        </div>
                        <div class="overview">
                          <b>Overview<b> :-
                          ${overview}
                        </div>
                        `;
    allMovieInfo.appendChild(movieEl);
  });
  search.value = "";
}

// search Movies by type input
function searchMovie(e){
  const searchVal = search.value;
  if(e.keyCode == 13){
    return getMovieInfo(searchVal);
  }
}

// rating color
function ratingColor(voteColor) {
  if (voteColor >= 8) {
    return "green";
  } else if (voteColor >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
