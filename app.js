const API_URL =
  "https:api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

//api çekme işlemi
getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  //console.log(data.results);
  showMovies(data.results);
}

//search işlemi
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

//movies'ları ekrana renderlama
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `  <img
          src="${IMG_PATH + poster_path}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average.toFixed(1)}
    </span>
        </div>
        <div class="overview">
          <h3>${title}<small> Overview</small></h3>
          <p>
            ${overview}
          </p>
        </div>`;
    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 6.5) {
    return "orange";
  } else {
    return "red";
  }
}
