const favContainer=document.querySelector('.fav-container');
const ifempty=document.querySelector('#empty');
var favArr=[];
favArr=JSON.parse(localStorage.getItem('hero'));
// console.log(favArr)
if(favArr.length===0){
    ifempty.style.display='block';
}

document.addEventListener('DOMContentLoaded',showFav(favArr));
function showFav(favArr){
    
    for(let i=0;i<favArr.length;i++){
        console.log(favArr)
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
    var heroName=document.createElement('div')
    var imgContainer=document.createElement('div');
    var img=document.createElement('img');
    var removeFav=document.createElement('div');
    var removeFavbtn=document.createElement('button');
    var detailcontainer=document.createElement('div');
    var detailBtn=document.createElement('button');
    
    heroContainer.classList.add('heroContainer');
    heroName.classList.add('heroName');
    imgContainer.classList.add('imgContainer');
    removeFav.classList.add('removeFav');
    detailcontainer.classList.add('detailcontainer')

    heroName.innerText=data.name;

    img.src=data.image.url;
    imgContainer.appendChild(img);
    removeFavbtn.innerText='Remove From Favourites ';

    removeFavbtn.addEventListener('click',(e)=>{
        var heroId=data.id;
        var i =favArr.indexOf(heroId);
        var target=e.target.parentNode.parentNode;
        // console.log(target);
        target.remove();
        if(favArr.includes(heroId)){
            favArr.splice(i,1);
            // console.log(i)
        }
        localStorage.setItem("hero", JSON.stringify(favArr));
        location.reload();
    })
    
    

    detailBtn.innerText='Check My SuperPowers  ';

    detailBtn.addEventListener('click',()=>{
        var heroId=data.id;
        console.log(heroId);
        window.open("details.html?id="+heroId, "_self");
    })

    removeFav.appendChild(removeFavbtn);
    
    detailcontainer.appendChild(detailBtn);

    heroContainer.appendChild(imgContainer);
    heroContainer.appendChild(heroName);
    heroContainer.appendChild(removeFav);
    heroContainer.appendChild(detailcontainer);

    favContainer.appendChild(heroContainer);

    console.log(favContainer);



}
