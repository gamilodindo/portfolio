let images = [];
let currentIndex = 0;

function openGallery(el) {
const mediaData =
    el.getAttribute("data-media") ||
    el.getAttribute("data-images");

  if (!mediaData) {
    console.error("No media found");
    return;
  }

  images = mediaData
    .split(",")
    .map(item => item.trim());

  currentIndex = 0;

  document.getElementById("galleryModal").style.display = "flex";

  renderImage();
  renderThumbnails();
}

function renderImage() {

  const file = images[currentIndex];
  const ext = file.split('.').pop().toLowerCase();

  const viewer = document.getElementById("viewer");
  viewer.innerHTML = "";

  if (["mp4","webm","ogg"].includes(ext)) {

    viewer.innerHTML = `
      <video controls autoplay class="main-video">
        <source src="${file}" type="video/mp4">
      </video>
    `;

  } else {

    viewer.innerHTML = `
      <img src="${file}" class="main-image">
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
      renderImage();
    };
    container.appendChild(img);
  });
}

function changeImage(step) {
  currentIndex += step;

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  renderImage();
}

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