export function loadAllMovies(){
    const moviesContainer = document.getElementById("moviesContainer")
    fetch("/api/allMovies.php")
        .then(res => res.json())
        .then(movies => {
            movies.forEach(movie => {
                const colDiv = document.createElement("div");
                colDiv.className = "col-lg-3 col-md-6 col-sm-12 mb-4";

                const cardDiv = document.createElement("div");
                cardDiv.className = "card animate__animated animate__zoomIn";

                const img = document.createElement("img");
                img.src = movie.imgSmall
                img.className = "card-img-top img-fluid"
                img.alt = `Poster for ${movie.title}`

                const cardBody = document.createElement("div")
                cardBody.className = "card-body p-3"

                const h5 = document.createElement("h5")
                h5.className = "card-title fw-bold"
                h5.textContent = `${movie.title}`

                const p = document.createElement("p")
                p.className = "card-text lead"
                p.textContent = movie.descBig
                
                cardBody.appendChild(h5)
                cardBody.appendChild(p)
                cardDiv.appendChild(img)
                cardDiv.appendChild(cardBody)
                colDiv.appendChild(cardDiv)
                moviesContainer.appendChild(colDiv)
            });
        })
        .catch(err => console.error("Error loading movies:", err));
}

export function MainPageMovies(){
    const moviesContainer = document.getElementById("moviesContainer")
    const movieCarousel = document.getElementById("movieCarousel")
    fetch("/api/topMovies.php")
        .then(res => res.json())
        .then(movies => {
            const carouselDiv = document.createElement("div")
            carouselDiv.className = "carousel-inner"
            movies.forEach((movie, index) => {
                const carouselItem = document.createElement("div")
                carouselItem.className = `carousel-item ${index===0 ? 'active' : ''}`
                const carouselImg = document.createElement("img")
                carouselImg.src = movie.imgBig
                carouselImg.className = "d-block w-100 img-fluid carouselImg"
                carouselImg.alt = `${movie.title}`

                carouselItem.appendChild(carouselImg)
                carouselDiv.appendChild(carouselItem)
                movieCarousel.appendChild(carouselDiv)


                const colDiv = document.createElement("div");
                colDiv.className = "col-lg-3 col-md-6 col-sm-12 mb-4";

                const cardDiv = document.createElement("div");
                cardDiv.className = "big_card card animate__animated animate__zoomIn";

                const img = document.createElement("img");
                img.src = movie.imgSmall
                img.className = "card-img-top img-fluid"
                img.alt = `Poster for ${movie.title}`

                const cardBody = document.createElement("div")
                cardBody.className = "card-body p-3"

                const h5 = document.createElement("h5")
                h5.className = "card-title fw-bold"
                h5.textContent = `${movie.title}`

                const p = document.createElement("p")
                p.className = "card-text lead"
                p.textContent = movie.descSmall
                
                cardBody.appendChild(h5)
                cardBody.appendChild(p)
                cardDiv.appendChild(img)
                cardDiv.appendChild(cardBody)
                colDiv.appendChild(cardDiv)
                moviesContainer.appendChild(colDiv)
            });
        })
        .catch(err => console.error("Error loading movies:", err));
}
