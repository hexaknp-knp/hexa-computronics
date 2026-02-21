let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;

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

total = total - discount;
document.getElementById("total").innerText="Total: ₹"+total;
}

function removeItem(index){
cart.splice(index,1);
localStorage.setItem("cart", JSON.stringify(cart));
displayCart();
}

function applyCoupon(){
let code = document.getElementById("coupon").value;
if(code === "HEXA10"){
discount = 1000;
alert("Coupon Applied!");
}else{
alert("Invalid Coupon");
}
displayCart();
}

function searchProduct(){
let input = document.getElementById("search").value.toLowerCase();
let products = document.querySelectorAll(".product");
products.forEach(p=>{
let text = p.innerText.toLowerCase();
p.style.display = text.includes(input) ? "block" : "none";
});
}

function filterCategory(cat){
let products = document.querySelectorAll(".product");
products.forEach(p=>{
if(cat==="all"){p.style.display="block";}
else{
p.style.display = p.getAttribute("data-category")===cat ? "block":"none";
}
});
}

function sendWhatsApp(){
let total = document.getElementById("total").innerText;
let message = "New Order:\n";
cart.forEach(item=>{
message += item.name + " - ₹" + item.price + "\n";
});
message += "\n" + total;

window.open("https://wa.me/919935529306?text="+encodeURIComponent(message));
}
