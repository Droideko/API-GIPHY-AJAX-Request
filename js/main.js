const searchButton = document.getElementById('searchBtn');
const refreshButton = document.getElementById('refreshBtn');
const search = document.getElementsByName('searchText')[0];
const container = document.querySelector('.container-images');
const imagesBlock = [...document.querySelectorAll('.container-images__block')];
const images = [...document.querySelectorAll('.container-images__gif')];
const originalLinks = [...document.querySelectorAll('.container-images__size')];
const sizeImages = [...document.querySelectorAll('.container-images__original-link')]
const key = `iurC0PR1gEJtTyGrhBGNyIVxulfy9KLM`;
let fixedSearch;

window.addEventListener('load', () => {
   tag = randomTag();
   fixedSearch = tag;
   let url = `https://api.giphy.com/v1/stickers/random?api_key=${key}&tag=${tag}&rating=G`;
   images.forEach((img, i) => getImage(url, img, originalLinks[i], sizeImages[i], i));
});

searchButton.addEventListener('click', () => {
   let tag = search.value;
   if (!tag || tag === '') tag = randomTag();
   fixedSearch = tag;
   let url = `https://api.giphy.com/v1/stickers/random?api_key=${key}&tag=${tag}&rating=G`;
   images.forEach((img, i) => getImage(url, img, originalLinks[i], sizeImages[i], i));
});

refreshButton.addEventListener('click', () => {
   let url = `https://api.giphy.com/v1/stickers/random?api_key=${key}&tag=${fixedSearch}&rating=G`;
   images.forEach((img, i) => getImage(url, img, originalLinks[i], sizeImages[i], i));
});

function randomTag(){
   let tags = ['Cat', 'Dog', 'Monkey', 'Lion', 'Bird', 'Fox'];
   let randomIndex = Math.floor(Math.random() * tags.length);
   return tags[randomIndex];
}

async function getImage(url, img, p, a, i) {
   let response = await fetch(url);
   let user = await response.json();
   if (user.data == false) return false;
   img.src = user.data.image_url;
   if (imagesBlock[i].lastElementChild.tagName === 'P'){
      imagesBlock[i].removeChild(imagesBlock[i].lastElementChild)
   }
   let [height, width] = [user.data.image_height, user.data.image_width];
   a.href = user.data.url;
   p.textContent = `${width}x${height}`;
   let title = document.createElement('p');
   title.classList.add('container-images__block-title')   
   title.textContent = user.data.title || `${tag}`;
   imagesBlock[i].append(title);
   // return true;
}
