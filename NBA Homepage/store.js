if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}
function ready(){
    var removeCartItemButtons =document.getElementsByClassName('remove')
    console.log(removeCartItemButtons)
    for(var i=0 ; i<removeCartItemButtons.length ; i++){
        var button=removeCartItemButtons[i]
        button.addEventListener('click', removeClicked)
    }

    var quantityInputs = document.getElementsByClassName('quantity-input')
    for(var i=0 ; i<quantityInputs.length ; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged )
    }

    var addToCartButtons=document.getElementsByClassName('product-btn')
for(var i=0 ; i<addToCartButtons.length ; i++){
var button=addToCartButtons[i]
button.addEventListener('click',addToCartClicked)
}
document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked)
const carouselSlide=document.querySelector('.carousel-slide');
const carouselImages=document.querySelectorAll('.carousel-slide img');
const prevBtn=document.querySelector('#previousbtn');
const nextBtn=document.querySelector('#nextbtn');
let counter=1;
const size=carouselImages[0].clientWidth;
carouselSlide.style.transform='translateX(' + (-size*counter) + 'px)';

nextBtn.addEventListener('click', function(){
    if(counter>=carouselImages.length - 1)
    return;
carouselSlide.style.transition = "transform 0.5s ease-in-out";
counter++;
carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px)';
});
prevBtn.addEventListener('click', function(){
    if(counter<=0)
    return;
    carouselSlide.style.transition = "transform 0.5s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px)';
 });

 carouselSlide.addEventListener('transitionend', function(){
    if(carouselImages[counter].id=="lastClone") {
        carouselSlide.style.transition = 'none';
        counter=carouselImages.length-2;
        carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px)';
    }
    if(carouselImages[counter].id=="firstClone") {
        carouselSlide.style.transition = 'none';
        counter=carouselImages.length-counter;
        carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px)';
    }
 })
}


function quantityChanged(event){
var input= event.target
if(isNaN(input.value) || input.value <= 0){
input.value=1
}
updateCart()
}
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('product')[0].innerText
    var price = shopItem.getElementsByClassName('itemPrice')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('productImg')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCart()
}
function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart')[0]
    var cartItemsName = cartItems.getElementsByClassName('cart-item-title')
    for(var i=0; i<cartItemsName.length ; i++){
        if(cartItemsName[i].innerText == title){
            alert('Item Already added to the cart!')
            return
        }
    }
    var cartRowContent = `<div class="cart-row"><img src="${imageSrc}" style="width: auto; height: auto;"></img>
<p class="cart-item-title">${title}</p>
<b> Price:</b> &nbsp;<label class="cart-price">${price}</label><br><br><b>Quantity</b>&nbsp;<input type="number" style="width: 30px;" class="quantity-input" value="1"><br><br><button class="remove">Remove</button></div>`
cartRow.innerHTML=cartRowContent
cartItems.append(cartRow)
cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeClicked)
    cartRow.getElementsByClassName('quantity-input')[0].addEventListener('change', quantityChanged)
}
function purchaseClicked(){
    alert('Thank you for your purchase!')
    var cartItems=document.getElementsByClassName('cart')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCart()
    document.getElementsByClassName('total-price')[0].innerText='No items have been added to the cart yet'
}
function removeClicked(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCart()
}
function updateCart(){
    var cartItemContainer = document.getElementsByClassName('cart')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total=0
    for(var i=0 ; i<cartRows.length; i+=2){
        var cartRow=cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace(' EGP', ''))
        var quantity=quantityElement.value
        console.log(price)
        console.log(quantity)
        total = (total + (price*quantity))
    }

    document.getElementsByClassName('total-price')[0].innerText='Total Price: ' + total + ' EGP'
    }


