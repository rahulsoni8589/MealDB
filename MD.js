const pointsElement = document.querySelector(".points")
var storage = sessionStorage.getItem('detail');
pointsElement.textContent = storage


// steps to DataTransfer
// var storage = sessionStorage.getItem('detail'); //getting the data from the previous page and store it
           // two ways to use
// document.write(storage); //data is printed in the console
// document.write(storage) // data is printed in the dom
// pointsElement.textContent = storage // data print in the domelement