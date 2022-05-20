//getting all the required elements
const result = document.querySelector('.result');
const search = document.querySelector('#search-bar input');

search.addEventListener('keyup', searching);

function searching() {
    // console.log('seraching..')
    var value = search.value;
    //when input.value==empty div result is null..will show nothing..
    result.innerHTML = `<div style="margin:20px; color:white; font-size:2rem; font-family:Cursive;text-align:center">Searching.....</div>`;
    if (value !== null) {
        //fetching data from api
        fetch(`https://superheroapi.com/api.php/3358031561086203/search/${value.trim()}`)
            //fetch() will return a promise
            .then((response) => response.json())
            //again calling json.. it will return a promise
            .then((data) => {
                // console.log(data)
                showResult(data);  //calling the show result
            })
            .catch((err) => { //if not able to fetch the data..any err occur
                console.log(err);

            })
    } else {
        result.innerHTML = null;
    }
}
function showResult(data) {
    const results = data.results;
    // console.log(results)

    if (data.response === 'error') {
        console.log('error', data.response);

        //if response is not success....then a message will appear...

        result.innerHTML = `<div style="margin:20px; color:white; font-size:2rem; font-family:Cursive;text-align:center">Sorry!!! No Results Found Please Search With Diffrent Name....</div>`;
    }

    else {
        result.innerHTML = null;
        for (let i = 0; i < data.results.length && i < 8; i++) { //shows result less than 8...
            // console.log(data.results.length)

            //creating all the necessary elements...
            var searchInfo = document.createElement('div');
            var imgContainer = document.createElement('div');
            var img = document.createElement('img');
            var detailsContainer = document.createElement('div');
            var heroname = document.createElement('div');
            var favBtnContainer = document.createElement('div');
            var favbtn = document.createElement('button');
            var detailsBtnContainer = document.createElement('div');
            var detailsBtn = document.createElement('button');

            //adding them the class...
            searchInfo.classList.add('search-info');
            imgContainer.classList.add('img-container');
            detailsContainer.classList.add('details-container');
            favBtnContainer.classList.add('favourite-button-container')
            detailsBtnContainer.classList.add('details-button-container')


            // getting all the required data from api response...
            img.src = data.results[i].image.url;
            heroname.innerHTML = data.results[i].name;
            favbtn.innerHTML = "Add To Favourites..🧡";
            detailsBtn.innerHTML = "Check My SuperPowers..💪";

            //if fav btn is clicked, will call pushfav()
            favbtn.addEventListener('click', () => {
                var heroId = data.results[i].id
                // console.log(hero)
                pushfav(heroId, favbtn);

            });

            //on clicking details btn
            detailsBtn.addEventListener('click', () => {
                var heroId = data.results[i].id;
                // showDetails(heroId);
                window.open("details.html?id=" + heroId, "_self");
                //if detail button clicked then details.html get opened provided with hero ID, in same tab....
            });



            // appending child elements to all the container created...
            detailsContainer.appendChild(heroname);

            detailsContainer.appendChild(favBtnContainer);
            favBtnContainer.appendChild(favbtn);

            detailsContainer.appendChild(detailsBtnContainer);
            detailsBtnContainer.appendChild(detailsBtn);

            imgContainer.appendChild(img);

            searchInfo.appendChild(imgContainer);
            searchInfo.appendChild(detailsContainer);

            result.appendChild(searchInfo);

            // console.log(searchInfo)
        }
    }
}

function pushfav(heroId) {
    // console.log(hero)
    var favArr;
    if (localStorage.getItem('hero') === null) {  //checking if array exist...
        favArr = [];  //if not any arr exist creating favArr
    }
    else {  //else parse it into favArr..
        favArr = JSON.parse(localStorage.getItem('hero'))
        // console.log(favArr)
    }
    if (favArr.includes(heroId)) {
        alert('Already Your Favourite');
        return;
    }
    favArr.push(heroId);
    // console.log(favArr);
    alert('Added To Favourites..');
    //setting back the localstorage
    localStorage.setItem("hero", JSON.stringify(favArr));
}