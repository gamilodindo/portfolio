/* =========================
   CAROUSEL
========================= */

let carouselIndex = 0;

function moveCarousel(direction) {
  const track = document.getElementById("carouselTrack");
  const cards = track.children;

  const cardWidth = cards[0].offsetWidth + 20;
  const visibleCards = 3;

  const maxIndex = Math.max(0, cards.length - visibleCards);

  carouselIndex += direction;

  if (carouselIndex < 0) carouselIndex = 0;
  if (carouselIndex > maxIndex) carouselIndex = maxIndex;

  track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
}

/* =========================
   GALLERY (IMAGES + VIDEO FIXED)
========================= */

let images = [];
let currentIndex = 0;

function openGallery(el) {

  const media =
    el.getAttribute("data-images") ||
    el.getAttribute("data-media");

  if (!media) {
    console.error("No media found in card");
    return;
  }

  images = media.split(",").map(i => i.trim());
  currentIndex = 0;

  document.getElementById("galleryModal").style.display = "flex";

  renderMedia();
  renderThumbnails();
}

function renderMedia() {
  const viewer = document.getElementById("viewer");
  const file = images[currentIndex];

  viewer.innerHTML = "";

  const ext = file.split(".").pop().toLowerCase();

  if (["mp4", "webm", "ogg"].includes(ext)) {
    viewer.innerHTML = `
      <video controls autoplay class="main-media">
        <source src="${file}" type="video/mp4">
      </video>
    `;
  } else {
    viewer.innerHTML = `
      <img src="${file}" class="main-media">
    `;
  }
}

function renderThumbnails() {
  const container = document.getElementById("thumbnails");
  container.innerHTML = "";

  images.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => {
      currentIndex = i;
      renderMedia();
    };
    container.appendChild(img);
  });
}

function changeImage(step) {
  currentIndex += step;

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  renderMedia();
}

/* CLOSE MODAL */
function closeGallery() {
  document.getElementById("galleryModal").style.display = "none";
}

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("galleryModal");
  if (modal.style.display !== "flex") return;

  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowRight") changeImage(1);
  if (e.key === "ArrowLeft") changeImage(-1);
});