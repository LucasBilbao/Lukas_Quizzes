const url = document.URL;

function isNotInBoundingBox(
  { clientX: x, clientY: y },
  { left, right, top, bottom }
) {
  return x < left || x > right || y < top || y > bottom;
}

function indexScript() {
  const login = {
    btn: document.querySelector('[data-login-btn]'),
    form: document.querySelector('[data-login-form]'),
    toSignUpBtn: document.querySelector('[data-to-sign-up-btn]'),
  };

  const signUp = {
    btn: document.querySelector('[data-sign-up-btn]'),
    form: document.querySelector('[data-sign-up-form]'),
    toLoginBtn: document.querySelector('[data-to-login-btn]'),
  };

  const authModalContainer = document.querySelector(
    '[data-auth-modal-container]'
  );
  const authModal = document.querySelector('[data-authorization-modal]');
  const closeModal = document.querySelector('[data-close-modal]');

  function deactivateForms() {
    login.form.classList.add('inactive');
    signUp.form.classList.add('inactive');
  }

  login.btn.addEventListener('click', () => {
    authModalContainer.classList.remove('inactive');
    login.form.classList.remove('inactive');
    overlay.classList.remove('inactive');
  });

  signUp.btn.addEventListener('click', () => {
    authModalContainer.classList.remove('inactive');
    signUp.form.classList.remove('inactive');
    overlay.classList.remove('inactive');
  });

  login.toSignUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    login.form.classList.add('inactive');
    signUp.form.classList.remove('inactive');
  });

  signUp.toLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signUp.form.classList.add('inactive');
    login.form.classList.remove('inactive');
  });

  closeModal.addEventListener('click', () => {
    authModalContainer.classList.add('inactive');
    overlay.classList.add('inactive');
    deactivateForms();
  });

  authModalContainer.addEventListener('click', (e) => {
    const dialogDimensions = authModal.getBoundingClientRect();
    if (isNotInBoundingBox(e, dialogDimensions)) {
      authModalContainer.classList.add('inactive');
      overlay.classList.add('inactive');
      deactivateForms();
    }
  });
}

function pagesScript() {
  if (!isAuthorized) {
    window.location.href = url
      .split('/')
      .filter((_, index, arr) => {
        return index < arr.length - 2;
      })
      .join('/');
  }
}

// Profile

const dropdownNav = document.querySelector('.dropdown_menu');
const profileBtn = document.querySelector('[data-profile-btn]');
const overlay = document.querySelector('.overlay');
const logoutBtn = document.querySelector('[data-logout-btn]');

profileBtn.addEventListener('click', () => {
  dropdownNav.classList.add('active');
  overlay.classList.remove('opaque');
  overlay.classList.remove('inactive');
});

overlay.addEventListener('click', () => {
  dropdownNav.classList.remove('active');
  overlay.classList.add('inactive');
  overlay.classList.add('opaque');
});

// Authorization

const authorization = document.querySelector('.authorization');
const logout = {
  modal: document.querySelector('[data-logout-dialog]'),
  confirmBtn: document.querySelector('[data-confirm-logout]'),
  cancelBtn: document.querySelector('[data-cancel-logout]'),
};

let isAuthorized;

if (localStorage.getItem('isAuthorized') === null) {
  localStorage.setItem('isAuthorized', true);
  isAuthorized = true;
} else {
  isAuthorized = localStorage.getItem('isAuthorized') === 'true';
}

if (isAuthorized) {
  authorization.classList.add('authorized');
}

logoutBtn.addEventListener('click', () => {
  logout.modal.showModal();
  overlay.classList.remove('active');
  dropdownNav.classList.remove('active');
});

logout.confirmBtn.addEventListener('click', () => {
  isAuthorized = false;
  localStorage.setItem('isAuthorized', isAuthorized);
  authorization.classList.remove('authorized');

  logout.modal.close();

  if (url.includes('pages')) {
    window.location.href = url
      .split('/')
      .filter((_, index, arr) => {
        return index < arr.length - 2;
      })
      .join('/');
  }
});

logout.cancelBtn.addEventListener('click', () => {
  logout.modal.close();
});

logout.modal.addEventListener('click', (e) => {
  const dialogDimensions = logout.modal.getBoundingClientRect();

  if (isNotInBoundingBox(e, dialogDimensions)) {
    logout.modal.close();
  }
});

// Footer Contacts

const phone = document.querySelector('[data-phone]');
const email = document.querySelector('[data-email]');
const copyMessage = document.querySelector('[data-copied-hint]');

function addDataInfoToClipboard(e) {
  navigator.clipboard.writeText(this.dataset.info);
  copyMessage.classList.add('shown');
  setTimeout(() => {
    copyMessage.classList.remove('shown');
  }, 3000);
}

phone.addEventListener('click', addDataInfoToClipboard);
email.addEventListener('click', addDataInfoToClipboard);

if (!url.includes('pages')) {
  indexScript();
} else {
  pagesScript();
}

// Spinner

const spinner = document.querySelector('[data-spinner]');
overlay.classList.remove('inactive');
spinner.classList.remove('inactive');

setTimeout(() => {
  overlay.classList.add('inactive');
  spinner.classList.add('inactive');
}, 1000);
