
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
cart.push({name, price});
localStorage.setItem("cart", JSON.stringify(cart));
alert("Added to cart");
}

function displayCart(){
let cartItems = document.getElementById("cart-items");
let total = 0;
cartItems.innerHTML="";
cart.forEach((item,index)=>{
total += item.price;
cartItems.innerHTML += `
<p>${item.name} - ₹${item.price}
<button onclick="removeItem(${index})">Remove</button>
</p>`;
});
document.getElementById("total").innerText = "Total: ₹" + total;
}

function removeItem(index){
cart.splice(index,1);
localStorage.setItem("cart", JSON.stringify(cart));
displayCart();
}
