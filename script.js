// ---------- MENU MOBILE ----------
const btnMenu = document.getElementById("btnMenu");
const nav = document.getElementById("nav");

if (btnMenu) {
  btnMenu.addEventListener("click", () => {
    const open = nav.style.display === "flex";
    nav.style.display = open ? "none" : "flex";
  });
}

// ---------- LIGHTBOX ----------
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

if (gallery) {
  gallery.addEventListener("click", (e) => {
    const img = e.target;
    if (!img.classList.contains("gallery-thumb")) return;

    lbImg.src = img.src;
    lightbox.style.display = "flex";
  });
}

if (lbClose) {
  lbClose.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

// Fecha ao clicar fora
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

// ---------- FORMULÁRIO ----------
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.textContent = "Enviando...";
    statusEl.style.color = "#0A2540";

    const data = {
      nome: form.nome.value,
      email: form.email.value,
      mensagem: form.mensagem.value
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error();

      statusEl.textContent = "Mensagem enviada!";
      statusEl.style.color = "green";
      form.reset();

    } catch (err) {
      statusEl.textContent = "Erro ao enviar.";
      statusEl.style.color = "red";
    }
  });
}
