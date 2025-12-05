const productlist = document.getElementById("productlist");
const form = document.getElementById("addproduct");
const searchInput = document.getElementById("searchInput");

function openForm() {
  form.classList.remove("hidden");
  form.classList.add("flex");
}

function closeForm() {
  form.classList.add("hidden");
  form.classList.remove("flex");
}

function addProduct() {
  const nameEl = document.getElementById("productname");
  const desEl = document.getElementById("productdes");
  const priceEl = document.getElementById("productprice");
  const imgFile = document.getElementById("productimg").files[0];

  if (!nameEl.value || !desEl.value || !priceEl.value || !imgFile) {
    alert("Please fill all fields!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const newProduct = {
      id: Date.now(),
      name: nameEl.value,
      des: desEl.value,
      price: priceEl.value,
      img: e.target.result
    };

    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    nameEl.value = "";
    desEl.value = "";
    priceEl.value = "";
    document.getElementById("productimg").value = "";

    closeForm();
    renderProducts();
  };

  reader.readAsDataURL(imgFile);
}

function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function editProduct(id) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const p = products.find(x => x.id === id);
  if (!p) return;

  document.getElementById("productname").value = p.name;
  document.getElementById("productdes").value = p.des;
  document.getElementById("productprice").value = p.price;

  const remaining = products.filter(x => x.id !== id);
  localStorage.setItem("products", JSON.stringify(remaining));

  openForm();
}

function renderProducts(filter = "") {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  productlist.innerHTML = "";

  if (filtered.length === 0) {
    productlist.innerHTML = `<div class="col-span-3 text-white">No products yet.</div>`;
    return;
  }

  filtered.forEach(product => {
    const item = document.createElement("div");
    item.className = "bg-white p-3 rounded-xl shadow-xl flex flex-col";
    item.innerHTML = `
      <div class="overflow-hidden rounded-lg">
    <img src="${product.img}" class="w-full h-[250px] transform transition-transform hover:scale-110"/>
    </div>
      <h3 class="font-bold text-xl ">${product.name}</h3>
      <p class="text-sm mb-2">${product.des}</p>
      <p class="text-red-500 font-bold mb-3">${product.price}</p>
      <div class="mt-auto flex gap-2">
        <button class="px-3 py-1 bg-yellow-500 rounded" onclick="editProduct(${product.id})">Edit</button>
        <button class="px-3 py-1 bg-red-500 text-white rounded" onclick="deleteProduct(${product.id})">Delete</button>
      </div>
    `;

    productlist.appendChild(item);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    renderProducts(e.target.value);
  });
}

renderProducts();
