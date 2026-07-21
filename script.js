const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ===== Certificate Preview Modal =====

const certs = {
    google: "cert_google.png",   // Change path if needed
    ibm: "cert_ibm.png"
};

const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certImage");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".cert-item").forEach(item => {

    item.addEventListener("click", () => {

        const cert = item.dataset.cert;

        if (certs[cert]) {
            modalImg.src = certs[cert];
            modal.style.display = "flex";
        }

    });

});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});