document.addEventListener("DOMContentLoaded", function () {

    /* ================= NAVBAR INJECT ================= */
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

    /* ================= OFFER POPUP ================= */
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
        const popup = document.getElementById("offerPopup");
        if(popup){
            popup.style.display="flex";
        }
    }, 1500);

});

/* ================= CLOSE POPUP ================= */
function closePopup() {
    const popup = document.getElementById("offerPopup");
    if(popup){
        popup.style.display="none";
    }
}

/* ================= PRODUCT CARD RENDER FUNCTION ================= */

function renderProductCard(container, data) {

    const isHomePage = document.body.classList.contains("home-page");

    container.innerHTML += `
        <div class="card">
            <img src="${data.image}">
            <h3>${data.name}</h3>
            <p>${data.description}</p>
            ${!isHomePage ? `<p class="price">₹ ${data.price}</p>` : ""}
        </div>
    `;
}
