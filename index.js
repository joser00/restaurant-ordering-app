import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
//Render Menu
function renderMenu() {
  let menu = document.getElementById("menu");
  return menuArray.map((item) => {
    return (menu.innerHTML += `
        <div class="item" data-food = ${item.name} data-price = ${item.price}>
                <div class="emoji">${item.emoji}</div>
                <div class="description-item">
                    <h1>${item.name}</h1>
                    <p>${item.ingredients}</p>
                    <h2>$${item.price}</h2>
                </div>
                <button class="btn-plus" data-id = ${item.id}>+</button>
            </div>
            <hr>
        `);
  });
}
//Render Order
function renderOrder() {
  let order = document.getElementById("order");

  let footer = document.getElementById("footer");
  
  let orderArray = [];
  ///Searching for clicks in the DOM for adding items
  document.addEventListener("click", (e) => {
    //Make reapear the order html 
    footer.style.display = "block";
    //Rendering elements DOM
    if (e.target.dataset.id) {
      //Pushing items to the array
      orderArray.push({
        food: e.target.parentElement.dataset.food,
        price: e.target.parentElement.dataset.price,
        id: uuidv4(),
      });

      let stringMenu = "";
      orderArray.forEach((item, index) => {
        console.log(item.food+"before index "+index)
        //Rendering order
        stringMenu += `<div class="item-ordered">
        <h1 id="food">${item.food}</h1>
        <button class="remove-btn" data-unicid=${item.id} data>Remove</button>
        <p id = 'price'>$${item.price}</p>
        </div>`;
        order.innerHTML = stringMenu;
       
      });
    }
      //Sum of the total price!!
   let newOrderArray = orderArray.reduce((acumulator, currentItem) => {
    return acumulator + parseInt(currentItem.price);
  },0);
  document.getElementById("total-price-sum").textContent =
    "$" + newOrderArray;
  ///
  });
   //Looking for clicks to delete an item
   document.addEventListener("click", (e) => {
      orderArray.forEach((item,index)=> {
            //Testing if match the unicid of the button with the id of the parent element
        if (e.target.dataset.unicid === item.id) {
          orderArray.splice(index,1)
          e.target.parentElement.style.display = "none";
        }
      })
      ///Rerendering the price
      let newOrderArray = orderArray.reduce((acumulator, currentItem) => {
        return acumulator + parseInt(currentItem.price);
      },0);
      document.getElementById("total-price-sum").textContent =
        "$" + newOrderArray;
      ///
      
    
  });

}
//Make the payment
function payment(){
  let btnOrder = document.getElementById('complete-order')
  let formModal = document.getElementById('form-modal') 
  
  btnOrder.addEventListener('click',()=> {
  document.getElementById('modal').style.display = 'flex'
 })
 
 formModal.addEventListener('submit', (e)=> {
  e.preventDefault();
  let submitData = new FormData(formModal)
  const costumerName = submitData.get('costumerName')
  document.getElementById('modal').style.display = 'none'
  document.getElementById('footer-container').innerHTML = `<p id="thanks-element">Thanks, ${costumerName}! Your order is on its way!</p>`
 })
}
payment()
renderOrder();
renderMenu();
