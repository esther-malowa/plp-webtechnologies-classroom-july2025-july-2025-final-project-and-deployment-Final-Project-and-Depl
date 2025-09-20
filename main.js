const logo = document.querySelector('.logo');
        logo.addEventListener('mouseover', () => {
            logo.style.animation = 'bounce 0.5s';
        });
        logo.addEventListener('mouseout', () => {
            logo.style.animation = 'spin 2s linear infinite';
        });
        const texts = ["Welcome To Malowa Beauty Collections!",  "Join Us Today"];
        let index = 0;
        const typingText = document.getElementById('typing-text');
    
        function typeText() {
            typingText.textContent = '';
            let text = texts[index];
            let i = 0;
    
            function type() {
                if (i < text.length) {
                    typingText.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else {
                    setTimeout(() => {
                        index = (index + 1) % texts.length;
                        typeText();
                    }, 2000);
                }
            }
            type();
        }
    
        function slideShow() {
            const slides = document.querySelector('.slides');
            let currentIndex = 0;
    
            setInterval(() => {
                currentIndex = (currentIndex + 1) % 3;
                slides.style.transform = `translateX(-${currentIndex * 100}vw)`;

            }, 5000);
        }
    
        typeText();
        slideShow();
        function zoomImage(img) {
            const zoomedImg = document.createElement('img');
            zoomedImg.src = img.src;
            zoomedImg.style.position = 'fixed';
            zoomedImg.style.top = '50%';
            zoomedImg.style.left = '50%';
            zoomedImg.style.transform = 'translate(-50%, -50%)';
            zoomedImg.style.width = '80%';
            zoomedImg.style.height = 'auto';
            zoomedImg.style.zIndex = '1000';
            zoomedImg.onclick = function() {
                document.body.removeChild(zoomedImg);
            };
            document.body.appendChild(zoomedImg);
        }
        document.querySelectorAll('#cart-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                alert('Product added to cart!');
            });
        });
// Modal functionality
const modal = document.getElementById("booking-modal");
const bookBtn = document.getElementById("book-btn");
const closeBtn = document.getElementsByClassName("close")[0];

bookBtn.onclick = function() {
    modal.style.display = "block";
};

closeBtn.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
// Select the menu icon and header elements
const menuIcon = document.getElementById('menu-icon');
const header = document.querySelector('header');

// Toggle the 'nav-active' class on the header when the menu icon is clicked
menuIcon.addEventListener('click', () => {
    header.classList.toggle('nav-active');
});
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const cartIcons = document.querySelectorAll(".bx-cart");
    const cartCount = document.getElementById("cart-count");
    const wishlistContainer = document.getElementById("wishlist-items");

    // Initialize cart and wishlist from local storage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    updateCartCount();
    displayWishlist();

    // Event listeners for adding items to cart
    cartIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            const productBox = icon.closest(".shop-box");
            const productName = productBox.querySelector("h3").innerText;
            const productPrice = productBox.querySelector("h2").innerText;
            const productImage = productBox.querySelector("img").src;

            const product = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            cartItems.push(product);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartCount();
            alert(`${productName} has been added to your cart!`);
        });
    });

    // Update cart count display
    function updateCartCount() {
        cartCount.innerText = cartItems.length;
    }

    // Display wishlist items on page load
    function displayWishlist() {
        wishlistContainer.innerHTML = '';
        if (wishlistItems.length === 0) {
            wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        } else {
            wishlistItems.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("wishlist-item");
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <p>${item.name} - ${item.price}</p>
                    <button onclick="removeFromWishlist('${item.name}')">Remove</button>
                `;
                wishlistContainer.appendChild(itemDiv);
            });
        }
    }

    // Remove item from wishlist
    window.removeFromWishlist = function (productName) {
        wishlistItems = wishlistItems.filter(item => item.name !== productName);
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
        displayWishlist();
    };

    // Newsletter subscription form submission
    document.getElementById("subscription-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("subscribe-email").value;
        if (email) {
            alert("Subscribed successfully!");
            // Additional logic to handle email subscriptions can be added here
        } else {
            alert("Please enter a valid email.");
        }
    });

    // Logout function
    window.logout = function () {
        alert("You have been logged out.");
        window.location.href = "index.html";
    };
});
