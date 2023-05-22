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

const authModal = document.querySelector('[data-authorization-modal]');
const closeModal = document.querySelector('[data-close-modal]');

function deactivateForms() {
  login.form.classList.add('inactive');
  signUp.form.classList.add('inactive');
}

function isNotInBoundingBox(
  { clientX: x, clientY: y },
  { left, right, top, bottom }
) {
  return x < left || x > right || y < top || y > bottom;
}

login.btn.addEventListener('click', () => {
  authModal.showModal();
  login.form.classList.remove('inactive');
});

signUp.btn.addEventListener('click', () => {
  authModal.showModal();
  signUp.form.classList.remove('inactive');
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
  authModal.close();
  deactivateForms();
});

authModal.addEventListener('click', (e) => {
  const dialogDimensions = authModal.getBoundingClientRect();
  if (isNotInBoundingBox(e, dialogDimensions)) {
    authModal.close();
    deactivateForms();
  }
});

// Profile

const dropdownNav = document.querySelector('.dropdown_menu');
const profileBtn = document.querySelector('[data-profile-btn]');
const overlay = document.querySelector('.overlay');
const logoutBtn = document.querySelector('[data-logout-btn]');

profileBtn.addEventListener('click', () => {
  dropdownNav.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  dropdownNav.classList.remove('active');
  overlay.classList.remove('active');
});

// Authorization

const authorization = document.querySelector('.authorization');
const logout = {
  modal: document.querySelector('[data-logout-dialog]'),
  confirmBtn: document.querySelector('[data-confirm-logout]'),
  cancelBtn: document.querySelector('[data-cancel-logout]'),
};

if (localStorage.getItem('isAuthorized') === null) {
  localStorage.setItem('isAuthorized', true);
}

let isAuthorized = true;

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
});

logout.cancelBtn.addEventListener('click', () => {
  logout.modal.close();
});

logout.modal.addEventListener('click', (e) => {
  const dialogDimensions = authModal.getBoundingClientRect();

  if (isNotInBoundingBox(e, dialogDimensions)) {
    logout.modal.close();
  }
});
