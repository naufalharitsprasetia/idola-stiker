/** @format */

// WHATSAPP
function generateWhatsAppLink(event) {
  event.preventDefault();
  const nama = document.getElementById("namaInput").value;
  const nomorHp = document.getElementById("nomorHpInput").value;
  const email = document.getElementById("emailInput").value;
  const pesan = document.getElementById("pesanInput").value;
  const whatsappMessage = `Halo nama saya "${nama}" | Nomor hp: "${nomorHp}" | Email: "${email}" | Pesan: "${pesan}"`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=6282256491037&text=${encodeURIComponent(
    whatsappMessage
  )}`;
  window.open(whatsappLink, "_blank");
}
// Get the button
let mybutton = document.getElementById("myBtnTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
