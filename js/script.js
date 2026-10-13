document.addEventListener("DOMContentLoaded", () => {
  // Navigation Dropdown
  const navDropdown = document.getElementById("navDropdown");
  const navDropdownBtn = document.getElementById("navDropdownBtn");

  if (navDropdown && navDropdownBtn) {
    navDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navDropdown.classList.toggle("open");
      navDropdownBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove("open");
        navDropdownBtn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navDropdown.classList.contains("open")) {
        navDropdown.classList.remove("open");
        navDropdownBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Hero Carousel
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".hero-dot")];
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  const heroSection = document.getElementById("hero");

  if (slides.length > 0) {
    let current = 0;
    let timer = null;

    const showSlide = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    };

    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        showSlide(current + 1);
      }, 5000);
    };

    const stopTimer = () => {
      clearInterval(timer);
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(current - 1);
        startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(current + 1);
        startTimer();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        showSlide(i);
        startTimer();
      });
    });

    if (heroSection) {
      heroSection.addEventListener("mouseenter", stopTimer);
      heroSection.addEventListener("mouseleave", startTimer);
    }

    startTimer();
  }

  // Login Demo Form
  const loginForm = document.getElementById("login-form");
  const password = document.getElementById("password");
  const togglePassword = document.getElementById("toggle-password");
  const message = document.getElementById("form-message");

  if (togglePassword && password) {
    togglePassword.addEventListener("click", () => {
      const isPassword = password.type === "password";
      password.type = isPassword ? "text" : "password";
      togglePassword.textContent = isPassword ? "Hide" : "Show";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!loginForm.reportValidity()) return;
      if (message) {
        message.style.color = "#16a34a";
        message.textContent = "Login successful! (Demo simulation)";
      }
    });
  }

  const forgotLink = document.getElementById("forgot-link");
  if (forgotLink) {
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (message) {
        message.style.color = "#d97706";
        message.textContent = "Password recovery is a demo feature.";
      }
    });
  }

  const createAccount = document.getElementById("create-account");
  if (createAccount) {
    createAccount.addEventListener("click", (e) => {
      e.preventDefault();
      if (message) {
        message.style.color = "#d97706";
        message.textContent = "Account creation is not enabled in this frontend demo.";
      }
    });
  }

  // Course Details Modal
  const modal = document.getElementById("course-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalIcon = document.getElementById("modal-icon");

  const courseDetails = {
    HTML: {
      icon: "</>",
      description: "Learn how to structure web pages with semantic elements, headings, paragraphs, images, links, and forms. HTML is the foundation of every modern website."
    },
    CSS: {
      icon: "✳",
      description: "Learn how to style web pages with colors, typography, spacing, borders, Flexbox, Grid, and responsive layouts that look stunning across all screen sizes."
    },
    Bootstrap: {
      icon: "B",
      description: "Learn to build responsive interfaces faster with Bootstrap's grid system, navigation bars, buttons, cards, and pre-built UI components."
    },
    JavaScript: {
      icon: "JS",
      description: "Learn the fundamentals of JavaScript, including variables, functions, events, and DOM manipulation to make websites dynamic and interactive."
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  };

  document.querySelectorAll("[data-course]").forEach((button) => {
    button.addEventListener("click", () => {
      const courseKey = button.getAttribute("data-course");
      const course = courseDetails[courseKey];
      if (!course || !modal) return;

      if (modalTitle) modalTitle.textContent = courseKey;
      if (modalDescription) modalDescription.textContent = course.description;
      if (modalIcon) modalIcon.textContent = course.icon;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");

      const closeBtn = document.getElementById("modal-close");
      if (closeBtn) closeBtn.focus();
    });
  });

  const modalX = document.getElementById("modal-x");
  const modalCloseBtn = document.getElementById("modal-close");
  if (modalX) modalX.addEventListener("click", closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
