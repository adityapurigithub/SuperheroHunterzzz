const favContainer=document.querySelector('.fav-container');
const ifempty=document.querySelector('#empty');
var favArr=[];
favArr=JSON.parse(localStorage.getItem('hero'));
// console.log(favArr)
if(favArr===null){
    ifempty.style.display='block';
}
document.addEventListener('DOMContentLoaded',showFav(favArr));

function showFav(favArr){
    
    for(let i=0;i<favArr.length;i++){
        console.log(favArr[i])
        const id=favArr[i].trim();
        fetch(`https://superheroapi.com/api.php/3358031561086203/${id}`)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                // console.log(data)    
                showHeroInfo(data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}
function showHeroInfo(data){
    console.log(data.id)
    var heroContainer=document.createElement('div');
    var imgContainer=document.createElement('div');
    var img=document.createElement('img');
    var removeFav=document.createElement('div');
    var removeFavbtn=document.createElement('button');
    var detailcontainer=document.createElement('div');
    var detailBtn=document.createElement('button');
    
    heroContainer.classList.add('heroContainer');
    imgContainer.classList.add('imgContainer');
    removeFav.classList.add('removeFav');
    detailcontainer.classList.add('detailcontainer')


    img.src=data.image.url;
    imgContainer.appendChild(img);
    removeFavbtn.innerText='Remove From Favourites ';

    detailBtn.innerText='Check My SuperPowers  ';
    detailBtn.addEventListener('click',(e)=>{
        var heroId=data.id;
        console.log(heroId);
        window.open("details.html?id="+heroId, "_self");
    })

    removeFav.appendChild(removeFavbtn);
    
    detailcontainer.appendChild(detailBtn);

    heroContainer.appendChild(imgContainer);
    heroContainer.appendChild(removeFav);
    heroContainer.appendChild(detailcontainer);

    favContainer.appendChild(heroContainer);

    console.log(favContainer);



}