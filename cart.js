/** @format */

// Array / Object
const barang = [
  {
    promo: "New",
    kategori: "Spion",
    nama: "Spion Rizmo SH-5003",
    bintang: "4.4",
    ulasan: 134,
    hargaDiskon: 110.0,
    hargaAsli: 200.0,
    img: "img/spion1.jpg",
  },
  {
    promo: "New",
    kategori: "Jok",
    nama: "Sarung Jok Motor Universal/One Piece",
    bintang: "4.7",
    ulasan: 159,
    hargaDiskon: 89.0,
    hargaAsli: 123.0,
    img: "img/jok1.jpg",
  },
  {
    promo: "New",
    kategori: "Oli",
    nama: "Oli Motor Shell 4T",
    bintang: "4.8",
    ulasan: 141,
    hargaDiskon: 41.0,
    hargaAsli: 70.0,
    img: "img/oli1.jpg",
  },
];

// Looping Card
const frame = document.getElementById("frame-produk");
document.addEventListener("DOMContentLoaded", function () {
  let numberOfClones = barang.length; // Ganti dengan jumlah klon yang sesuai jumlah barang

  for (let i = 0; i < numberOfClones; i++) {
    // Mengambil elemen yang akan diklon
    let no = i;
    let originalElement = document.getElementById("produkCard1");

    // Membuat salinan elemen
    let clonedElement = originalElement.cloneNode(true);

    // Mengubah teks di dalam elemen klon
    clonedElement.querySelector(".promo-span").innerText = barang[no].promo;
    clonedElement.querySelector(".kategori-produk").innerText =
      barang[no].kategori;
    clonedElement.querySelector(".bintang-produk").innerText =
      barang[no].bintang;
    clonedElement.querySelector(".nama-produk").innerText = barang[no].nama;
    clonedElement.querySelector(
      ".ulasan-produk"
    ).innerText = `(${barang[no].ulasan})`;
    clonedElement.querySelector(
      ".hargaAsli-produk"
    ).innerText = `Rp.${barang[no].hargaAsli}.000`;
    clonedElement.querySelector(
      ".hargaDiskon-produk"
    ).innerText = `Rp.${barang[no].hargaDiskon}.000`;

    let newImg = barang[no].img; // Ganti SRC nya
    let image = clonedElement.querySelector(".image-produk");
    image.setAttribute("src", newImg);
    let newId = "tombol-produk" + (i + 2); // Ganti ID nya tambahin no dari 2-terakhir
    let id = clonedElement.querySelector("#tombol-produk1");
    id.setAttribute("id", newId);
    let newCardId = "productCard" + (i + 2); // Ganti ID nya tambahin no dari 2-terakhir
    id.setAttribute("onclick", `addToCart('${newCardId}')`);
    clonedElement.setAttribute("id", newCardId);

    console.log("berhasil");
    // Menambahkan elemen klon ke dalam dokumen
    frame.appendChild(clonedElement);
  }
});
// CART
let dataCart = [];

function cartSpan() {
  const cart = document.getElementById("cart-span");
  cart.innerHTML = dataCart.length;
}

// Load dataCart from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Load existing data from localStorage
  const storedData = localStorage.getItem("dataCart");

  if (storedData) {
    dataCart = JSON.parse(storedData);
    cartSpan(); // Update the cart count
    updateTable(); // Update the table with the loaded data
  }
});

// add to CART
function addToCart(cardId) {
  Swal.fire("Berhasil", "Produk ditambahkan ke keranjang!", "success");

  let product = {};
  // Mendapatkan elemen card berdasarkan ID
  let cardElement = document.getElementById(cardId);
  // Ambil data
  let kategoriProduk = cardElement.querySelector(".kategori-produk").innerText;
  let namaProduk = cardElement.querySelector(".nama-produk").innerText;
  let hargaDiskon = cardElement.querySelector(".hargaDiskon-produk").innerText;
  // Push ke Array
  product.nama = namaProduk;
  product.harga = hargaDiskon;
  product.kategori = kategoriProduk;
  // push
  dataCart.push(product);
  console.log(dataCart);
  cartSpan();
  // Update localStorage
  localStorage.setItem("dataCart", JSON.stringify(dataCart));
  updateTable(); // Update the table with the new data
  // Jika Anda ingin menampilkan pemberitahuan, Anda dapat menggunakan SweetAlert atau cara lain
}

// Update the table with dataCart
function updateTable() {
  const tbody = document.querySelector(".table tbody");
  tbody.innerHTML = ""; // Clear the existing table rows

  // Loop through dataCart and create table rows
  dataCart.forEach((product, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td class="kategori-barang">${product.kategori}</td>
      <td class="nama-barang">${product.nama}</td>
      <td class="harga-barang">${product.harga}</td>
    `;
    tbody.appendChild(tr);
  });

  // Update the total row
  updateTotalRow();
}

// Update the total row in the table
function updateTotalRow() {
  const totalRow = document.querySelector(".table .total td:last-child");
  const totalHarga = dataCart.reduce(
    (total, product) => total + Number(product.harga.replace(/\D/g, "")),
    0
  );
  totalRow.textContent = `Rp. ${totalHarga.toLocaleString()}`;
}

const clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  localStorage.clear();
  updateTotalRow();
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      setTimeout(function () {
        // alert("Halaman berhasil direload!");
        location.reload();
      }, 1000); // Angka 100 adalah waktu dalam milidetik sebelum alert muncul setelah reload
    }
  });
});
