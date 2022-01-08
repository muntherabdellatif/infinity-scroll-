const imgContainer =document.getElementById("img-container");
const loader = document.getElementById("loader");
let photoArray =[] ;
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
// on load count 5 after load we will make it 30
const count = 5 ;
const clientId="MpQGs9sdNOMb7WmBTOoK_PbilLmBzct8CKnmsvI28Ss" ;
const apiLink =`https://api.unsplash.com/photos/random/?client_id=${clientId}&count=${count}`

let ready =false;
let imgLoadedCounter = 0;
let totalImg = 0;

function imgLoaded() {
    imgLoadedCounter++;
    if (imgLoadedCounter==totalImg){
        ready=true;
        loader.hidden=true;
        count=30;
    }
    // console.log(`counter ${imgLoadedCounter},total ${totalImg},status${ready}`);
}
function setAttributes (element,attributes) {
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
// display photo 
function displayPhotos() {
    totalImg=photoArray.length;
    imgLoadedCounter=0;
    photoArray.forEach((photo)=>{
        // create link <a>
        const item =document.createElement("a");
        setAttributes(item,{
            href:photo.links.html,
            target:"_blank"
        });
        // create <img>
        const img =document.createElement("img");
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        // check if imgs are loaded
        img.addEventListener("load",imgLoaded);
        // put img in a 
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}
// get photos from Api 
async function getPhoto () {
    try{
        const responce =await fetch(apiLink);
        photoArray= await responce.json();
        displayPhotos();
    }catch (error) {
        console.log(error)
    }
}
// checking if scrolling near the buttom to load more photo
window.addEventListener("scroll",()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-100 && ready){
        ready=false;
        getPhoto();
    }
});
// onload
getPhoto();