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

/* ================= LOGIN ================= */

function login(){
let pass = document.getElementById("admin-pass").value;
if(pass==="1234"){
localStorage.setItem("admin","true");
window.location.href="admin.html";
}else{
alert("Wrong Password");
}
}

function checkAdmin(){
if(localStorage.getItem("admin")!=="true"){
window.location.href="login.html";
}
}

function logout(){
localStorage.removeItem("admin");
window.location.href="index.html";
}

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
container.innerHTML+=`
<div class="product">
<img src="${p.image}">
<h3>${p.name}</h3>
<div>Stock: ${p.stock}</div>
<div class="price">₹${p.price}</div>
<button onclick="addToCart(${index})">Add to Cart</button>
</div>`;
});
}

function addToCart(index){
if(products[index].stock<=0){
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
let total=0;
let list=document.getElementById("cart-items");
list.innerHTML="";
cart.forEach((item,i)=>{
total+=item.price;
list.innerHTML+=`
<div>
${item.name} - ₹${item.price}
<button onclick="removeItem(${i})">X</button>
</div>`;
});
total-=discount;
document.getElementById("total").innerText="Total: ₹"+total;
}

function removeItem(i){
let item=cart[i];
let product=products.find(p=>p.name===item.name);
if(product) product.stock++;
cart.splice(i,1);
localStorage.setItem("cart", JSON.stringify(cart));
saveProducts();
displayCart();
}

/* ================= ORDER SAVE ================= */

function saveOrder(){
if(cart.length===0){alert("Cart empty");return;}
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
let image=document.getElementById("pimg").value;
let stock=parseInt(document.getElementById("pstock").value);

products.push({name,price,image,stock});
saveProducts();
renderAdmin();
}

function deleteProduct(i){
products.splice(i,1);
saveProducts();
renderAdmin();
}

function renderAdmin(){
let list=document.getElementById("admin-list");
if(!list) return;
list.innerHTML="";
products.forEach((p,i)=>{
list.innerHTML+=`
<div>
${p.name} - ₹${p.price}
<button onclick="deleteProduct(${i})">Delete</button>
</div>`;
});
}

/* ================= ORDER HISTORY ================= */

function renderOrders(){
let list=document.getElementById("order-list");
list.innerHTML="";
orders.forEach(o=>{
list.innerHTML+=`
<div>
Date: ${o.date}<br>
Items: ${o.items.map(i=>i.name).join(", ")}
<hr>
</div>`;
});
}

function exportCSV(){
let csv="Date,Items\n";
orders.forEach(o=>{
csv+=`${o.date},"${o.items.map(i=>i.name).join(" | ")}"\n`;
});
let blob=new Blob([csv],{type:"text/csv"});
let link=document.createElement("a");
link.href=URL.createObjectURL(blob);
link.download="orders.csv";
link.click();
}
/* ================= PRODUCT DETAIL PAGE ================= */

function openProduct(id){
localStorage.setItem("viewProduct", id);
window.location.href="product.html";
}

function renderProductDetail(){
let id = localStorage.getItem("viewProduct");
let product = products.find(p=>p.id == id);
if(!product) return;

document.getElementById("detail-img").src = product.image;
document.getElementById("detail-name").innerText = product.name;
document.getElementById("detail-desc").innerText = product.description;
document.getElementById("detail-price").innerText = "₹"+product.price;
}
function renderProducts(){
let container=document.getElementById("product-list");
if(!container) return;
container.innerHTML="";
products.forEach(p=>{
container.innerHTML+=`
<div class="product" onclick="openProduct(${p.id})">
<img src="${p.image}">
<h3>${p.name}</h3>
<div class="price">₹${p.price}</div>
<button onclick="event.stopPropagation();addToCart(${p.id})">Add to Cart</button>
</div>`;
});
}
