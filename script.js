// Navbar Inject
document.addEventListener("DOMContentLoaded", function () {

document.body.insertAdjacentHTML("afterbegin", `
<nav class="navbar">
<div class="logo">HEXA COMPUTRONICS</div>
<ul>
<li><a href="index.html">Home</a></li>
<li><a href="digital-products.html">Digital</a></li>
<li><a href="security.html">Security</a></li>
<li><a href="refurbished.html">Refurbished</a></li>
<li><a href="contact.html">Contact</a></li>
</ul>
</nav>
`);

// Offer Popup
document.body.insertAdjacentHTML("beforeend", `
<div class="popup" id="offerPopup">
<div class="popup-content">
<span onclick="closePopup()" class="close">&times;</span>
<h2>🔥 Special Offer</h2>
<img src="images/offer.jpg" width="100%">
</div>
</div>
`);

setTimeout(function(){
document.getElementById("offerPopup").style.display="flex";
}, 1500);

});

function closePopup() {
document.getElementById("offerPopup").style.display="none";
}
