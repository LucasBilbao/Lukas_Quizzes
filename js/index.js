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

function isInBoundingBox(
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
  if (isInBoundingBox(e, dialogDimensions)) {
    authModal.close();
    deactivateForms();
  }
});

// Profile

const dropdownNav = document.querySelector('.dropdown_menu');
const profileBtn = document.querySelector('[data-profile-btn]');
const overlay = document.querySelector('.overlay');

profileBtn.addEventListener('click', () => {
  dropdownNav.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  dropdownNav.classList.remove('active');
  overlay.classList.remove('active');
});
