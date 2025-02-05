"use strict";

/**
 * Função genérica para dar toggle na classe "active"
 */
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

/* ================================
   SIDEBAR
   ================================ */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Toggle sidebar (uso em mobile)
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

/* ================================
   CUSTOM SELECT (usado no filtro “Select category”)
   ================================ */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Se existir o select no HTML
if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// Quando clicar em cada opção dentro do select dropdown
if (selectItems.length && selectValue) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

/* ================================
   FILTRO (projetos)
   ================================ */
const filterItems = document.querySelectorAll("[data-filter-item]");

/**
 * Função que exibe/esconde itens de acordo com a categoria
 */
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    // Se usuário clicou em “All”
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } 
    // Ou se categoria do item bate com selectedValue
    else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// Filtro para telas grandes (os botões de “All”, “Power BI”, etc.)
if (filterBtn.length) {
  let lastClickedBtn = filterBtn[0]; // o primeiro botão é “All”

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      // Toggle classe “active” no botão
      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

/* ================================
   FORM CONTATO (se existir)
   ================================ */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Se existir o form, valida cada input
if (form && formInputs.length && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

/* ================================
   NAVEGAÇÃO das páginas (About / Resume)
   ================================ */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length && pages.length) {
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      const btnText = this.innerHTML.toLowerCase().trim();

      for (let j = 0; j < pages.length; j++) {
        // data-page deve coincidir com o texto do botão
        if (btnText === pages[j].dataset.page) {
          pages[j].classList.add("active");
          navigationLinks[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
          navigationLinks[j].classList.remove("active");
        }
      }
    });
  }
}
