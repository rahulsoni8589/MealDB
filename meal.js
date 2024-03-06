// chronological order of event in this page
// Data parsing - Fetched the data from the api
// showmeal function - redered the fetched data through this fn using data parsed
// clickmeal - this function implents after rendering all the data into the page, it will show the product description.
// favouritemeal - implement similar to above but fn is to add meal card to favouite section

const dishesElement = document.querySelector("#dishes")
const selectElement = document.querySelector("#selectFav")


const description = new Object;

// fetching using fetch api (promise based api)
async function getMeal(url){ 
    try{
        const response = await fetch(url);
        if (!response.status){
            throw new Error ("Either Data not found or unable to fetch the data")
        } else{
        const mealData = await response.json();
        // console.log(mealData)
        return mealData
        }
    } catch(err){
        console.log(err);
    }
};

//Display the fetched data in the meal container

function render(){
    const dishes = getMeal("https://www.themealdb.com/api/json/v1/1/categories.php")
    dishes.then(data => {
        const category = data.categories;
        category.forEach(meal => {
            showMeal(meal)  //function to render all the mealcard 
        });
        clickmeal(); // click fn will work only when all the cards are rendered into the webpage
        favouritemeal() // click fn will work only when all the cards are rendered into the webpage
        selectoption(description);
    }).catch(err => {
        console.error(err)
    })
}
render()

//structure of the meal card that is in the container with id as "dishes"
/* <div class="dish">
        <img src="foodpic.jpg" alt="">
        <span style="border: 2px solid green;">Name</span>
        <i class="fa-regular fa-heart"></i>
    </div>
*/

// This function is called above to show the meal cards
function showMeal(dish){
    //created card for each meal
    const {strCategory, strCategoryDescription, strCategoryThumb} = dish;
    const mealElement = document.createElement("div");
    const imgElement = document.createElement("img");
    const spanElement = document.createElement("span");
    const heartElement = document.createElement("i");

    mealElement.classList.add("dish");
    heartElement.classList.add("fa-regular", "fa-heart");

    mealElement.appendChild(imgElement);
    mealElement.appendChild(spanElement);
    mealElement.appendChild(heartElement);
    dishesElement.appendChild(mealElement);

    imgElement.setAttribute("src", strCategoryThumb);
    spanElement.textContent = strCategory

    // making array out of each render post to fetch it name and description to show it during click on meal card
    description[strCategory] = strCategoryDescription;
    
};


// click on meal functionality
function clickmeal(){
    const mealcards = document.querySelectorAll(".dish")
    mealcards.forEach((card)=>{
        card.childNodes[0].addEventListener("click",()=>{
            const mealname = card.innerText
            if (Object.hasOwn(description,mealname)){
                sessionStorage.setItem('detail', description[mealname]) 
                window.location.href="MD.html"
            }
        })
    })
}


// implemention add to fav functionality
function favouritemeal(){
    const mealcards = document.querySelectorAll(".dish")
    mealcards.forEach((card)=>{
        card.lastChild.addEventListener("click",(event)=>{
            event.preventDefault();
            if (!event.target.classList.contains("heart")){
                event.target.classList.add("heart")
                const opt = document.createElement("option")
                opt.textContent = card.childNodes[1].textContent
                selectElement.appendChild(opt)
            } else{
                event.target.classList.remove("heart")
                const name = event.target.previousSibling.innerText
                const arr_node = ([...selectElement.childNodes])
                // console.log(arr_node)
                const find = arr_node.find((node)=>{
                    return node.innerText === name;
                })
                if (find){
                    for (let i of arr_node){
                        if(i.innerText === name){
                            selectElement.removeChild(i)
                        }
                    }
                } 
            }    
        })
    })
}

// implementing search functionality
const searchElement = document.getElementById("searchmeal")
searchElement.addEventListener("input", (text)=>{
    const inputData = (text.target.value).toLowerCase();
    showFilteredmeal(inputData)
})

function showFilteredmeal(input){
    const Allmeals = document.querySelectorAll(".dish")
    Allmeals.forEach((meal)=>{
        const mealname = (meal.innerText).toLowerCase();
        if (mealname.includes(input)){
            meal.style.display = "block"
        }else{
            meal.style.display = "none"
        }
    })
}


function showalloptions(){
    const Allmeals = document.querySelectorAll(".dish")
    Allmeals.forEach((meal)=>{
        meal.style.display = "block" 
    })
}


// implemented select functionality on favourite meal choose area
function selectoption(){
    selectElement.addEventListener("change",(event)=>{
        const find = Object.hasOwn(description, event.target.value);
        if (find){
            showFilteredmeal((event.target.value).toLowerCase())
        } else{
            showalloptions();
        }  
    })
}


