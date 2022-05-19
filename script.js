// console.log('MainScriptLoaded')

//getting all the required elements
const result = document.querySelector('.result');
const search = document.querySelector('#search-bar input');

search.addEventListener('keyup', searching);

function searching() {
    // console.log('seraching..')
    var value = search.value;
      //when input.value empty div result is null..will show nothing..
    result.innerHTML = `<div style="margin:20px; color:white; font-size:2rem; font-family:Cursive;text-align:center">Searching.....</div>`;
    if (value !== '') {
        fetch(`https://superheroapi.com/api.php/3358031561086203/search/${value.trim()}`)
            //fetch will return a promise
            .then((response) => response.json())
            //again it will return a promise
            .then((data) => {
                console.log(data)
                showResult(data);  //calling the show result
            })
            .catch((err) => { //if not able to fetch the data..any err occur
                console.log(err);

            })
    }else{
    result.innerHTML =null;
}
}
function showResult(data) {
    const results = data.results;
    // console.log(results)
   
    if (data.response === 'error') {
        console.log('error',data.response);

        //if response is not success....then a message will appear...

        result.innerHTML = `<div style="margin:20px; color:white; font-size:2rem; font-family:Cursive;text-align:center">Sorry!!! No Results Found Please Search With Diffrent Name....</div>`;
    }

    else {
        result.innerHTML =null;
    for (let i = 0; i < data.results.length && i<8; i++) {
        console.log(data.results.length)
        var searchInfo = document.createElement('div');
        var imgContainer = document.createElement('div');
        var img = document.createElement('img');
        var detailsContainer = document.createElement('div');
        var heroname=document.createElement('div');
        var favBtnContainer = document.createElement('div');
        var favbtn=document.createElement('button');
        var detailsBtnContainer = document.createElement('div');
        var detailsBtn = document.createElement('button');


        searchInfo.classList.add('search-info');
        imgContainer.classList.add('img-container');
        detailsContainer.classList.add('details-container');
        favBtnContainer.classList.add('favourite-button-container')
        detailsBtnContainer.classList.add('details-button-container')


        // getting all the required data from api response...
        img.src = data.results[i].image.url;
        heroname.innerHTML=data.results[i].name;
        favbtn.innerHTML="Add To Favourites..🧡";
        detailsBtn.innerHTML="Check My SuperPowers..💪";

        favbtn.addEventListener('click',()=>{
            var heroId=data.results[i].id
            // console.log(hero)
            pushfav(heroId,favbtn);
            
    })
        detailsBtn.addEventListener('click',()=>{
            var heroId=data.results[i].id;
            // showDetails(heroId);
            window.open("details.html?id="+heroId, "_self");
        })

    


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

function pushfav(heroId){
    // console.log(hero)
    var favArr;
    if(localStorage.getItem('hero')===null){  //checking if array exist...
        favArr=[];  //if not any arr exist creating favArr
    }
    else{
        favArr=JSON.parse(localStorage.getItem('hero'))
        console.log(favArr)
    }
    if(favArr.includes(heroId)){
        alert('Already Your Favourite');
       return; 
    }
    favArr.push(heroId);
    console.log(favArr);
    alert('Added To Favourites..');
    localStorage.setItem("hero",JSON.stringify(favArr));
}