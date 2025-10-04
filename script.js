const categoryContainer = document.getElementById('category_container');
const cardContainer = document.getElementById('card_container');
const Bookmark = document.getElementById('Bookmark-Container')
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(resp => resp.json())
    .then(data =>{
        const categories = data.categories
        showCategory(categories);
        showAll();
    })
    .catch(err => {
    console.log(err);
 })
}

const showCategory = (categories) => {
    categoryContainer.innerHTML = ''; 

    categories.forEach(cat => {
        const li = document.createElement('li');
        li.className = 'mt-5 cursor-pointer w-[170px] h-[35px] rounded-md flex items-center justify-start px-4 transition-colors duration-300 hover:bg-[#15803d] hover:text-white hover:w-[170px] hover:h-[35px] hover:rounded-md hover:transition duration-300';

        li.textContent = cat.category_name;
        li.id = cat.id;  // Set ID for later use

        li.addEventListener('click', (e) => {
            const allLi = categoryContainer.querySelectorAll('li'); // scope to category container
            allLi.forEach(li => li.classList.remove('bg-[#15803d]', 'w-[170px]', 'h-[35px]', 'rounded-md', 'text-white'));

            e.target.classList.add('bg-[#15803d]', 'w-[170px]', 'h-[35px]', 'rounded-md', 'text-white');
            loadTreebyCategory(e.target.id);
        });

        categoryContainer.appendChild(li);
    });
}

const showAll = () =>{
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(respon => respon.json())
    .then(data => {
        const CategoryTree = data.plants;
        ShowTreeByCategory(CategoryTree);

    })
    .catch(err => {
        console.log(err);
    })
}

const loadTreebyCategory = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
        
        ShowTreeByCategory(data.plants);
    })
    .catch(err => {
    console.log(err);
});
}

const ShowTreeByCategory = (plants) =>{
    cardContainer.innerHTML = ""
        plants.forEach(plants => {
            cardContainer.innerHTML += `<div class="bg-white rounded-xl max-h-[490px] p-4">
           <div>
           <img class="w-[310px] h-[185px] mt-[8px] rounded-xl" src ="${plants.image}"/>
           </div>
        <h1 class="font-bold mt-[8px] mb-[12px] text-[14px]"> ${plants.name} </h1>
        <div>
        <p class="text-sm max-w-[310px] max-h-[60px] mb-[12px] text-[#1f2937">${plants.description}</p>
        </div>
        <div class="flex justify-between mt-[62px]">
        <div class="bg-[#dcfce7] rounded-4xl min-w-[86px] min-h-[28px] p-2.5 text-center">
        <h4 class="text-[14px] text-[#5d9373]">${plants.category}</h4>
        </div>
        <p>৳${plants.price}</p>
        </div>
        <div>
        <button class="btn mt-[25px] h-[43px] w-full rounded-4xl bg-[#15803d] text-white data-name="${plants.name}"
  data-price="${plants.price}"">Add to Cart</button>
        </div>
        </div>`
        })
}
  cardContainer.addEventListener('click', (e) => {
    if (e.target.innerText === "Add to Cart") {
        const name = e.target.closest('.rounded-xl').querySelector('h1').innerText.trim();
        const price = parseInt(e.target.dataset.price);

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartUI();
    }
});

  const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'bg-[#dcfce7] p-3 rounded-lg flex justify-between items-center';

        itemDiv.innerHTML = `
            <div>
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-sm text-gray-600">৳${item.price} × ${item.quantity}</p>
            </div>
            <button class="text-gray-500 hover:text-red-600 font-bold text-lg remove-item" data-name="${item.name}">×</button>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotal.innerText = `৳${total}`;
}
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const name = e.target.dataset.name;
        cart = cart.filter(item => item.name !== name);
        updateCartUI();
    }
});


loadCategory();