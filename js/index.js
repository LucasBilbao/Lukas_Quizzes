const loginBtn = document.querySelector('[data_login_btn]');
const signUpBtn = document.querySelector('[data_sign_up_btn]');
const modal = document.querySelector('[data_modal]');
const loginForm = document.querySelector('[data_login_form]');
const signUpForm = document.querySelector('[data_sign_up_form]');
const closeModal = document.querySelector('[data_close_modal]');
const fromLoginToSignUpBtn = document.querySelector('[data_to_sign_up_btn]');
const fromSignUpToLoginBtn = document.querySelector('[data_to_login_btn]');

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
