(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const phone = "523171020185";
  const email = "voracomsys@hotmail.com";

  const navToggle = $("#navToggle");
  const mainNav = $("#mainNav");
  const backToTop = $("#backToTop");
  const contactForm = $("#contactForm");
  const formNote = $("#formNote");
  const sendWhatsapp = $("#sendWhatsapp");
  const quoteModal = $("#quoteModal");
  const quoteText = $("#quoteText");
  const modalWhatsapp = $("#modalWhatsapp");

  const encode = (text) => encodeURIComponent(text || "");

  function closeMobileNav() {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    $$("#mainNav a").forEach((link) => {
      link.addEventListener("click", closeMobileNav);
    });
  }

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  window.addEventListener("scroll", () => {
    if (backToTop) {
      backToTop.classList.toggle("show", window.scrollY > 550);
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach((el) => revealObserver.observe(el));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      if (!id) return;

      $$("#mainNav a").forEach((a) => {
        const href = a.getAttribute("href");
        a.classList.toggle("active", href === `#${id}`);
      });
    });
  }, { rootMargin: "-35% 0px -58% 0px", threshold: 0 });

  $$("main section[id]").forEach((section) => sectionObserver.observe(section));

  $$(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      $$(".filter-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      $$(".sector-card").forEach((card) => {
        const shouldShow = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  function buildMessage() {
    const name = $("#name")?.value.trim();
    const company = $("#company")?.value.trim();
    const service = $("#service")?.value.trim();
    const message = $("#message")?.value.trim();

    return [
      "Hola Voracom Sys, me gustaría solicitar una asesoría.",
      name ? `Nombre: ${name}` : "",
      company ? `Empresa: ${company}` : "",
      service ? `Servicio de interés: ${service}` : "",
      message ? `Mensaje: ${message}` : ""
    ].filter(Boolean).join("\n");
  }

  function validateForm() {
    if (!contactForm) return false;

    const requiredFields = $$("[required]", contactForm);
    let isValid = true;

    requiredFields.forEach((field) => {
      const value = field.value.trim();
      const fieldIsValid = value.length > 0;
      field.toggleAttribute("aria-invalid", !fieldIsValid);
      field.style.borderColor = fieldIsValid ? "" : "#BF1120";
      isValid = isValid && fieldIsValid;
    });

    if (!isValid && formNote) {
      formNote.textContent = "Por favor completa los campos obligatorios antes de continuar.";
      formNote.style.color = "#BF1120";
    }

    return isValid;
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!validateForm()) return;

      const subject = "Solicitud de asesoría - Voracom Sys";
      const body = buildMessage();
      window.location.href = `mailto:${email}?subject=${encode(subject)}&body=${encode(body)}`;

      if (formNote) {
        formNote.textContent = "Se abrió tu aplicación de correo con el mensaje preparado.";
        formNote.style.color = "#116B35";
      }
    });
  }

  if (sendWhatsapp) {
    sendWhatsapp.addEventListener("click", () => {
      if (!validateForm()) return;
      const url = `https://wa.me/${phone}?text=${encode(buildMessage())}`;
      window.open(url, "_blank", "noopener");
    });
  }

  function openQuoteModal(plan) {
    const message = `Hola Voracom Sys, me gustaría solicitar una propuesta para: ${plan}.`;
    if (quoteText) {
      quoteText.textContent = `Seleccionaste: ${plan}. Puedes continuar por WhatsApp o ir al formulario de contacto.`;
    }
    if (modalWhatsapp) {
      modalWhatsapp.href = `https://wa.me/${phone}?text=${encode(message)}`;
    }
    if (quoteModal) {
      quoteModal.classList.add("show");
      quoteModal.setAttribute("aria-hidden", "false");
    }
  }

  function closeQuoteModal() {
    if (!quoteModal) return;
    quoteModal.classList.remove("show");
    quoteModal.setAttribute("aria-hidden", "true");
  }

  $$(".quote-btn").forEach((button) => {
    button.addEventListener("click", () => openQuoteModal(button.dataset.plan || "Servicio contable"));
  });

  $$("[data-close-modal]").forEach((control) => {
    control.addEventListener("click", closeQuoteModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeQuoteModal();
  });
})();
