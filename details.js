const mainContainer=document.querySelector('.container');

const searchParams = new URLSearchParams(window.location.search);
// console.log(searchParams);

var id = searchParams.get('id'); //getting the id from ulrsearchparams
// console.log(id)

document.addEventListener('DOMContentLoaded',fetching);

function fetching(){

        fetch(`https://superheroapi.com/api.php/3358031561086203/${id}`)
            .then((response)=>{
                return response.json();
                // console.log(response.json())
            })
            .then((data)=>{
                console.log(data);
                showDetails(data);

            })
            .catch((err)=>{
                console.log(err)
            })
}
function showDetails(data){
    //creating all the required element to show the details..
    const imgContainer=document.createElement('div');
    const img=document.createElement('img');
    const detailcontainer=document.createElement('div');
    const addFav=document.createElement('button');
    const name=document.createElement('div');
    const biography=document.createElement('div');
    const connections=document.createElement('div');
    const stats=document.createElement('div');
    const work=document.createElement('div');

    //adding the classes to the elements..
    imgContainer.classList.add('imgContainer');
    
    addFav.classList.add('addFav')
    detailcontainer.classList.add('detailcontainer')
    name.classList.add('name');
    biography.classList.add('common');
    connections.classList.add('common');
    stats.classList.add('common');
    work.classList.add('common');
    
    img.src=data.image.url;
    imgContainer.appendChild(img);

    addFav.innerHTML='<i id="fav-icon" class="fas fa-star fa-2x"></i>';
    addFav.addEventListener('click',()=>{addToFav(id)});
    name.innerHTML=`<span style="margin-bottom:10px; color:white; font-size:2rem; text-decoration:underline;">NAME</span> : `+data.name +` (AKA ${data.biography['full-name']})`;
    detailcontainer.appendChild(name);

    biography.innerHTML=`<span style="margin-bottom:10px; color:white; font-size:2rem; text-decoration:underline;">First-Appearance</span> : `+data.biography['first-appearance'];
    detailcontainer.appendChild(biography);

    connections.innerHTML=`<span style="margin-bottom:10px; color:white; font-size:2rem; text-decoration:underline;">Connections</span> : `+data.connections['group-affiliation'];
    detailcontainer.appendChild(connections);

    stats.innerHTML=`<span style="margin-bottom:10px; color:white; font-size:2rem; text-decoration:underline;">PowerStats</span> : <br>`+
    `<span>1.Durability: </span>`+data.powerstats.durability+`<br>`+
    `<span>2.Intelligence: </span>`+data.powerstats.intelligence+`<br>`+
    `<span>3.Strength: </span>`+data.powerstats.strength+`<br>`+
    `<span>4.Speed: </span>`+data.powerstats.speed;
    detailcontainer.appendChild(stats);

    work.innerHTML=`<span style="margin-bottom:10px; color:white; font-size:2rem; text-decoration:underline;">Work/Occupation</span> : `+data.connections['group-affiliation'];
    detailcontainer.appendChild(work);

    
    
    
    
    mainContainer.appendChild(imgContainer);
    mainContainer.appendChild(addFav);
    mainContainer.appendChild(detailcontainer);
    console.log(mainContainer)
    

}
function addToFav(id){
    // console.log('click',id)
    var favArr;
    if(localStorage.getItem('hero')===null){
        favArr=[];
    }
    else{
        favArr=JSON.parse(localStorage.getItem('hero'))
        console.log(favArr)
    }
    if(favArr.includes(id)){
        alert('Already Your Favourite');
       return; 
    }
    favArr.push(id);
    console.log(favArr);
    alert('Added To Favourites..');
    localStorage.setItem("hero",JSON.stringify(favArr));
}