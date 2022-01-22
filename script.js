const inputBox = document.getElementById("input");
const searchButton = document.getElementById("genre-buttons");
const cardGroup = document.getElementById("card-group")
const bookList = document.getElementById("book-list")
const oneDrink = document.getElementById('oneDrink')
const randomDrink = document.getElementById("randomDrink")
const moreOption = document.getElementById("moreOption")

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    let bookSubject = event.target.id;
    console.log(bookSubject);
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${bookSubject}&maxResults=40`;
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then(result => {
      for (i = 0; i < result.items.length; i++){
        let item = document.createElement("a");
        item.innerHTML += `<div class="card" style="width: 15rem;">
            <img src="${result.items[i].volumeInfo.imageLinks.thumbnail}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
            <h3 class="card-title overflow-hidden">${result.items[i].volumeInfo.title}</h3>
            <h5>by ${result.items[i].volumeInfo.authors[0]}</h5><br><h5 id="${result.items[i].id}" class="btn btn-primary btn-book btn-lg">Learn More</h5>
            </div>
            </div><br>`;
        document.getElementById("book-list").appendChild(item);
        searchButton.innerHTML= ""
        document.getElementById("head2").innerHTML="Pick your Favorite Book!"
      }

})
.catch((error) => {
})

})

bookList.addEventListener("click", bookDetails);

function bookDetails(event){
   if (event.target.classList.contains("btn-book"))
      fetch(`https://www.googleapis.com/books/v1/volumes/${event.target.id}`)
      .then((response) => response.json())
      .then(result => {
          console.log(result.volumeInfo);
          console.log(result.volumeInfo.imageLinks.large);
          let item = document.createElement("a");
          item.innerHTML = `<div class="card" style="width: 15rem;">
          <img src="${result.volumeInfo.imageLinks.thumbnail} "height: auto";
          "width: 100%"; class="card-img-top" alt="...">
          <div class="card-body">
          <h3 class="card-title overflow-hidden">${result.volumeInfo.title}</h3>
          <h5>by ${result.volumeInfo.authors[0]}</h5><br><p>Plot: ${result.volumeInfo.description}</h5>
          </div>
          </div>`;
          console.log(item)
          document.getElementById("book-list").innerHTML = "";
          document.getElementById("book-info").innerHTML = item.innerHTML;
          let drinkButton = document.createElement("button");
          drinkButton.innerHTML = "Want a drink?";
          document.getElementById("more-info").appendChild(drinkButton);
      })
    .catch((error) => {
    console.log("Unable to get certain elements")})
}
 // ----------------------------- more options drinks --------------------------------- (1)
// moreOption.addEventListener('click', (e) => {
//   e.preventDefault()
//   fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
//      .then(response => response.json())
//      .then(data => {
//           renderDrinks(data.drinks)
//      });
// function renderDrinks(drinkData) {
//      drinkData.map(drink => {
//           let drinklist= `
//           <div class='drinksMenu'>
//                <img src="${drink.strDrinkThumb}" class="imgs" alt='${drink.strDrink}' style="width: 200px; display: flex">
//                <div class='drinkIngrediant'>
//                     <h3 id='drinkName'>${drink.strDrink}</h3>
//                     <a id="${drink.idDrink}" class="btn btn-primary">Ingredients <i class="fas fa-glass-martini-alt"></i></a>
//                </div>
//           </div>      
//           `
//           allDrinks.innerHTML += drinklist;
//      }); 
// };

// })

//-------------------------- change object to Array -- hard coded
allDrinks.addEventListener('click', (e) => {
  if(e.target.className.includes('btn-primary')){
       console.log(e.target.id, "e.id"); //testing if we are targeting the id to call the other API
       fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${e.target.id}`)
            .then(response => response.json())
            .then((singleDrink) => {
                 console.log(singleDrink)
                 console.log(singleDrink.drinks[0].strIngredient1) //testing if we fetch the other API
                 let ingredients = [
                      singleDrink.drinks[0].strIngredient1,
                      singleDrink.drinks[0].strIngredient2,
                      singleDrink.drinks[0].strIngredient3,
                      singleDrink.drinks[0].strIngredient4,
                      singleDrink.drinks[0].strIngredient5,
                      singleDrink.drinks[0].strIngredient6,
                      singleDrink.drinks[0].strIngredient7,
                      singleDrink.drinks[0].strIngredient8,
                      singleDrink.drinks[0].strIngredient9,
                      singleDrink.drinks[0].strIngredient10,
                      singleDrink.drinks[0].strIngredient11,
                      singleDrink.drinks[0].strIngredient12,
                      singleDrink.drinks[0].strIngredient13,
                      singleDrink.drinks[0].strIngredient14,
                      singleDrink.drinks[0].strIngredient15,
                 ];
                 renderOneDrink(ingredients);

            }) 
  }    
}); 


// ------ recomendation drink ------------------------------------------------ (2)
recommendation.addEventListener('click', (e) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic')
     .then(response => response.json())
     .then(data => {
          renderRandomDrink(data.drinks)
     });
function renderRandomDrink(drinkData) {
     drinkData.map(drink => {
          let recomendaDrink= `
          <div class='drinksMenu'>
               <img src="${drink.strDrinkThumb}" class="imgs" alt='${drink.strDrink}' style="width: 200px; display: flex">
               <div class='drinkIngrediant'>
                    <h3 id='drinkName'>${drink.strDrink}</h3>
                    <a id="${drink.idDrink}" class="btn btn-primary">Ingredients <i class="fas fa-glass-martini-alt"></i></a>
               </div>
          </div>      
          `
          randomDrink.innerHTML = recomendaDrink;
     }); 
};

})

//-------
randomDrink.addEventListener('click', (e) => {
     if(e.target.className.includes('btn-primary')){
          console.log(e.target.id, "e.id"); //testing if we are targeting the id to call the other API
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${e.target.id}`)
               .then(response => response.json())
               .then((singleDrink) => {
                    console.log(singleDrink)
                    console.log(singleDrink.drinks[0].strIngredient1) //testing if we fetch the other API
                    let ingredients = [
                         singleDrink.drinks[0].strIngredient1,
                         singleDrink.drinks[0].strIngredient2,
                         singleDrink.drinks[0].strIngredient3,
                         singleDrink.drinks[0].strIngredient4,
                         singleDrink.drinks[0].strIngredient5,
                         singleDrink.drinks[0].strIngredient6,
                         singleDrink.drinks[0].strIngredient7,
                         singleDrink.drinks[0].strIngredient8,
                         singleDrink.drinks[0].strIngredient9,
                         singleDrink.drinks[0].strIngredient10,
                         singleDrink.drinks[0].strIngredient11,
                         singleDrink.drinks[0].strIngredient12,
                         singleDrink.drinks[0].strIngredient13,
                         singleDrink.drinks[0].strIngredient14,
                         singleDrink.drinks[0].strIngredient15,
                    ];
                    renderOneDrink(ingredients);

               }) 
     }    
}); 

function renderOneDrink(id) { // map over the ingredient and filter the empty and null values
  console.log(id)
  let aDrink = `
  <div class="oneDrinkDiv">
       <h3> Ingredients </h3>
       <ul class="list-group list-group-flush" id="drink-ingredients">
       
       </ul>
  </div>`
  oneDrink.innerHTML = aDrink;
  const drinkIngrediant = document.getElementById('drink-ingredients'); 
  id.map(ingredient => {
       switch (ingredient) {
            case null:
                 break;
            case "":
                 break;
            default:
            // console.log(ingredient)
            let iList = `<li>${ingredient}</li>`
            oneDrink.innerHTML += iList; 
       } 
  }) 
}