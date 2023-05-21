const loginBtn = document.querySelector('[data-login-btn]');
const signUpBtn = document.querySelector('[data-sign-up-btn]');
const modal = document.querySelector('[data-modal]');
const loginForm = document.querySelector('[data-login-form]');
const signUpForm = document.querySelector('[data-sign-up-form]');
const closeModal = document.querySelector('[data-close-modal]');
const fromLoginToSignUpBtn = document.querySelector('[data-to-sign-up-btn]');
const fromSignUpToLoginBtn = document.querySelector('[data-to-login-btn]');

function deactivateForms() {
  if (!loginForm.classList.contains('inactive')) {
    loginForm.classList.add('inactive');
  }
  if (!signUpForm.classList.contains('inactive')) {
    signUpForm.classList.add('inactive');
  }
}

loginBtn.addEventListener('click', () => {
  modal.showModal();
  loginForm.classList.remove('inactive');
});

signUpBtn.addEventListener('click', () => {
  modal.showModal();
  signUpForm.classList.remove('inactive');
});

fromLoginToSignUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('inactive');
  signUpForm.classList.remove('inactive');
});

fromSignUpToLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signUpForm.classList.add('inactive');
  loginForm.classList.remove('inactive');
});

closeModal.addEventListener('click', () => {
  modal.close();
  deactivateForms();
});

modal.addEventListener('click', (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
    deactivateForms();
  }
});
