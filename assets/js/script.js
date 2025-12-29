'use strict';

/*-----------------------------------*\
  #ANIMATION SYSTEM
\*-----------------------------------*/

// Page Loader - Robust implementation with fallback
function hideLoader() {
  const loader = document.getElementById('pageLoader');
  if (loader && !loader.classList.contains('fade-out')) {
    loader.classList.add('fade-out');
    // Remove from DOM after transition
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
}

// Safety timeout: Always hide loader after 3 seconds maximum
// This ensures the page is accessible even if external resources fail to load on mobile
const loaderSafetyTimeout = setTimeout(hideLoader, 3000);

// Hide loader when DOM is ready (doesn't wait for images/fonts)
document.addEventListener('DOMContentLoaded', function () {
  // Minimum display time of 800ms for smooth experience
  setTimeout(() => {
    clearTimeout(loaderSafetyTimeout);
    hideLoader();
  }, 800);
});

// Also hide on full page load if that happens first (for desktop)
window.addEventListener('load', function () {
  clearTimeout(loaderSafetyTimeout);
  setTimeout(hideLoader, 800);
});

// Scroll Reveal Animation with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollRevealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Optionally unobserve after revealing for performance
      scrollRevealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all scroll-reveal elements
document.addEventListener('DOMContentLoaded', function () {
  const revealElements = document.querySelectorAll('.scroll-reveal, .fade-left, .fade-right, .scale-up');
  revealElements.forEach(el => scrollRevealObserver.observe(el));
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Ripple Effect on Buttons
document.addEventListener('click', function (e) {
  const target = e.target;
  if (target.tagName === 'BUTTON' || target.closest('button')) {
    const button = target.tagName === 'BUTTON' ? target : target.closest('button');
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
});

// Skill Progress Bar Animation
const skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const targetWidth = progressBar.style.width;
      progressBar.style.setProperty('--target-width', targetWidth);
      progressBar.classList.add('animated');
      skillObserver.unobserve(progressBar);
    }
  });
}, { threshold: 0.5 });

// Observe skill progress bars
document.addEventListener('DOMContentLoaded', function () {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  skillBars.forEach(bar => skillObserver.observe(bar));
});

/*-----------------------------------*\
  #ORIGINAL FUNCTIONALITY
\*-----------------------------------*/

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Toast Notification System
function showToast(message, title = '', type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  };

  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-content">
      ${title ? `<div class="toast-title">${title}</div>` : ''}
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.classList.add('hide')" aria-label="Close">×</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

function sendMail(event) {
  event.preventDefault();

  let params = {
    name: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Add loading state to form
  const formElement = document.querySelector("[data-form]");
  const formBtn = document.querySelector("[data-form-btn]");

  formElement.classList.add("form-loading");
  formBtn.setAttribute("disabled", "");

  emailjs
    .send("service_mcqdcm7", "template_en7uyv7", params)
    .then(function (res) {
      // Remove loading state
      formElement.classList.remove("form-loading");
      formBtn.removeAttribute("disabled");

      // Show success toast
      showToast(
        "Your message has been sent successfully! I'll get back to you soon.",
        "Message Sent!",
        "success"
      );

      // Reset form
      form.reset();

      console.log("Success:", res.status, res.text);
    })
    .catch(function (err) {
      // Remove loading state
      formElement.classList.remove("form-loading");
      formBtn.removeAttribute("disabled");

      // Show error toast
      showToast(
        "Failed to send message. Please try again or contact me directly via email.",
        "Sending Failed",
        "error"
      );

      console.error("Error:", err);
    });

  return false;
}

