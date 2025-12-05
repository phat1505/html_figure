const productlist = document.getElementById("productlist");

function renderPublicProduct(){
    const products = JSON.parse(localStorage.getItem("products")) || [];
    productlist.innerHTML="";

    if(products.length === 0){
        productlist.innerHTML =
        `<p class="text-white">No products...</p>`
        return;
    }
    products.sort((a, b) => b.id - a.id);
    const latestEight = products.slice(0, 8);
    latestEight.forEach(product =>{
        const item = document.createElement("div");
        item.className = "bg-white p-3 rounded-xl flex flex-col";

        item.innerHTML=`
        <div class="overflow-hidden">
            <img src="${product.img}" class="w-full h-[250px] transform transition-transform hover:scale-110"/>
            </div>
        <h3 class="text-2xl">${product.name}</h3>
        <p>${product.des}</p>
        <p>${product.price}</p>
        <button class="w-24 bg-orange-500 p-1 rounded-2xl text-center mx-auto hover:bg-orange-700">View Detail</button>
        `;
        productlist.appendChild(item);
    });
}
renderPublicProduct();