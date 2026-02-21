let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;

let stockData = {
"Laptop Model X":5,
"WiFi 6 Router":10,
"24 Port Switch":8,
"Enterprise Firewall":3
};

function addToCart(name, price){
if(stockData[name] <= 0){
alert("Out of Stock");
return;
}
cart.push({name, price});
stockData[name]--;
localStorage.setItem("cart", JSON.stringify(cart));
alert("Added to cart");
updateStock();
}

function updateStock(){
document.querySelectorAll(".product").forEach(p=>{
let name = p.getAttribute("data-name");
if(stockData[name] !== undefined){
p.querySelector(".stock").innerText = "Stock: "+stockData[name];
}
});
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
let name = cart[index].name;
stockData[name]++;
cart.splice(index,1);
localStorage.setItem("cart", JSON.stringify(cart));
displayCart();
updateStock();
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
document.querySelectorAll(".product").forEach(p=>{
p.style.display = p.innerText.toLowerCase().includes(input) ? "block":"none";
});
}

function filterCategory(cat){
document.querySelectorAll(".product").forEach(p=>{
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

function downloadInvoice(){
let content = "INVOICE\n\n";
cart.forEach(item=>{
content += item.name+" - ₹"+item.price+"\n";
});
content += "\n"+document.getElementById("total").innerText;
let blob = new Blob([content],{type:"text/plain"});
let link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "invoice.txt";
link.click();
}
