let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
cart.push({name, price});
localStorage.setItem("cart", JSON.stringify(cart));
alert("Added to cart");
}

function openCart(){
document.getElementById("cart").style.display="block";
displayCart();
}

function closeCart(){
document.getElementById("cart").style.display="none";
}

function displayCart(){
let cartItems = document.getElementById("cart-items");
let total = 0;
cartItems.innerHTML="";
cart.forEach((item,index)=>{
total += item.price;
cartItems.innerHTML += `
<div class="cart-item">
<span>${item.name}</span>
<span>₹${item.price}
<button onclick="removeItem(${index})">X</button>
</span>
</div>`;
});
document.getElementById("total").innerText="Total: ₹"+total;
}

function removeItem(index){
cart.splice(index,1);
localStorage.setItem("cart", JSON.stringify(cart));
displayCart();
}
