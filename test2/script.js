let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [
{
name:"Laptop Model X",
price:50000,
category:"hardware",
image:"../images/laptop2.jpg",
stock:5
},
{
name:"WiFi 6 Router",
price:5000,
category:"network",
image:"../images/router.jpg",
stock:10
}
];

let orders = JSON.parse(localStorage.getItem("orders")) || [];
let discount = 0;

/* ================= STORE ================= */

function saveProducts(){
localStorage.setItem("products", JSON.stringify(products));
renderProducts();
}

function renderProducts(){
let container = document.getElementById("product-list");
if(!container) return;

container.innerHTML="";
products.forEach((p,index)=>{
container.innerHTML += `
<div class="product" data-category="${p.category}">
<img src="${p.image}">
<h3>${p.name}</h3>
<div class="stock">Stock: ${p.stock}</div>
<div class="price">₹${p.price}</div>
<button onclick="addToCart(${index})">Add to Cart</button>
</div>`;
});
}

function addToCart(index){
if(products[index].stock <= 0){
alert("Out of Stock");
return;
}
cart.push(products[index]);
products[index].stock--;
saveProducts();
localStorage.setItem("cart", JSON.stringify(cart));
alert("Added to cart");
}

/* ================= CART ================= */

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
cart.forEach((item,i)=>{
total += item.price;
cartItems.innerHTML += `
<div class="cart-item">
${item.name} - ₹${item.price}
<button onclick="removeItem(${i})">X</button>
</div>`;
});
total -= discount;
document.getElementById("total").innerText="Total: ₹"+total;
}

function removeItem(i){
let item = cart[i];
let product = products.find(p=>p.name===item.name);
if(product) product.stock++;
cart.splice(i,1);
localStorage.setItem("cart", JSON.stringify(cart));
saveProducts();
displayCart();
}

/* ================= COUPON ================= */

function applyCoupon(){
let code = document.getElementById("coupon").value;
if(code==="HEXA10"){
discount=1000;
alert("Coupon Applied!");
}else{
alert("Invalid Coupon");
}
displayCart();
}

/* ================= WHATSAPP ORDER ================= */

function sendWhatsApp(){
let total = document.getElementById("total").innerText;
let message="New Order:\n";
cart.forEach(item=>{
message += item.name+" - ₹"+item.price+"\n";
});
message+="\n"+total;
window.open("https://wa.me/919935529306?text="+encodeURIComponent(message));
}

/* ================= SAVE ORDER ================= */

function saveOrder(){
orders.push({
items:cart,
date:new Date().toLocaleString()
});
localStorage.setItem("orders", JSON.stringify(orders));
localStorage.removeItem("cart");
cart=[];
alert("Order Saved!");
}

/* ================= ADMIN ================= */

function addProduct(){
let name=document.getElementById("pname").value;
let price=parseInt(document.getElementById("pprice").value);
let category=document.getElementById("pcat").value;
let image=document.getElementById("pimg").value;
let stock=parseInt(document.getElementById("pstock").value);

products.push({name,price,category,image,stock});
saveProducts();
alert("Product Added!");
}

function deleteProduct(index){
products.splice(index,1);
saveProducts();
}

function renderAdmin(){
let list=document.getElementById("admin-list");
list.innerHTML="";
products.forEach((p,i)=>{
list.innerHTML+=`
<div>
${p.name} - ₹${p.price}
<button onclick="deleteProduct(${i})">Delete</button>
</div>`;
});
}
