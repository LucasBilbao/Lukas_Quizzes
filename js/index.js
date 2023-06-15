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
    if (
      isNotInBoundingBox(e, dialogDimensions) &&
      e.currentTarget === authModalContainer
    ) {
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

function quizScript() {
  const questionsList = document.querySelector('[data-quizzes]');
  const questions = document.querySelectorAll('[data-question]');
  const allOptions = document.querySelectorAll('[data-option]');
  const questionBalls = document.querySelectorAll('[data-question-ball]');
  const quizActionBtns = {
    check: document.querySelector('[data-check-btn]'),
    next: document.querySelector('[data-next-btn]'),
    finish: document.querySelector('[data-finish-btn]'),
    tryAgain: document.querySelector('[data-try-again-btn]'),
    start: document.querySelector('[data-start-btn]'),
  };
  const scoreDisplay = document.querySelector('[data-score]');
  const questionBallsList = document.querySelector('[data-question-balls]');
  const score = {
    total: 0,
    max: questionBalls.length,
  };
  let activeQuizIndex = 0;
  let quizzes = [];

  quizActionBtns.start.addEventListener('click', function () {
    this.classList.add('inactive');
    scoreDisplay.classList.add('inactive');
    quizActionBtns.check.classList.remove('inactive');
    questionBallsList.classList.remove('inactive');
    questionsList.classList.remove('inactive');
  });

  questions.forEach((question, index) => {
    const options = [];
    let answer;
    for (let i = index * 4; i <= index * 4 + 3; ++i) {
      options.push(allOptions[i]);
      if (allOptions[i].dataset.correct !== undefined) {
        answer = allOptions[i];
      }
    }
    quizzes.push({
      questionDom: question,
      ball: questionBalls[index],
      answer,
      chosen: undefined,
      options,
    });
  });
  quizzes[activeQuizIndex].ball.classList.add('current');

  questionsList.addEventListener('click', (e) => {
    if (e.target.dataset.option === undefined) {
      return;
    }

    const currentQuiz = quizzes[activeQuizIndex];

    if (e.target === currentQuiz.chosen) {
      return;
    }
    if (currentQuiz.chosen) {
      currentQuiz.chosen.classList.remove('chosen');
    }

    currentQuiz.chosen = e.target;
    currentQuiz.chosen.classList.add('chosen');
    quizActionBtns.check.disabled = false;
  });

  quizActionBtns.check.addEventListener('click', function () {
    if (
      !quizzes[activeQuizIndex].options.includes(
        quizzes[activeQuizIndex].chosen
      )
    ) {
      return;
    }
    this.classList.add('inactive');
    this.disabled = true;
    if (activeQuizIndex === quizzes.length - 1) {
      quizActionBtns.finish.classList.remove('inactive');
    } else {
      quizActionBtns.next.classList.remove('inactive');
    }
    const currentQuiz = quizzes[activeQuizIndex];
    currentQuiz.answer.classList.add('correct', 'raised');

    currentQuiz.options.forEach((option) => {
      option.disabled = true;
    });

    if (currentQuiz.chosen !== currentQuiz.answer) {
      currentQuiz.chosen.classList.add('incorrect', 'shaken');
      currentQuiz.ball.classList.add('incorrect');
    } else {
      score.total++;
      currentQuiz.ball.classList.add('correct');
    }
  });

  quizActionBtns.next.addEventListener('click', function () {
    this.classList.add('inactive');
    quizActionBtns.check.classList.remove('inactive');
    quizzes[activeQuizIndex].ball.classList.remove('current');
    quizzes[activeQuizIndex].questionDom.classList.remove('expanded');
    activeQuizIndex++;
    quizzes[activeQuizIndex].questionDom.classList.add('expanded');
    quizzes[activeQuizIndex].ball.classList.add('current');
    setTimeout(() => {
      quizzes.forEach((quiz) => {
        quiz.questionDom.style.transform = `translateX(calc(${
          activeQuizIndex * -100
        }% - ${2 * activeQuizIndex}rem))`;
      });
    }, 800);
  });

  quizActionBtns.finish.addEventListener('click', function () {
    this.classList.add('inactive');
    questionsList.classList.add('inactive');
    document.querySelector('[data-question-balls]').classList.add('inactive');
    quizActionBtns.tryAgain.classList.remove('inactive');
    questionBallsList.classList.add('inactive');
    scoreDisplay.classList.remove('inactive');
    scoreDisplay.innerText = `Your score is ${score.total}/${score.max} (${
      (score.total / score.max) * 100
    }%)`;
  });

  quizActionBtns.tryAgain.addEventListener('click', () => {
    location.reload();
  });
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
  spinner.classList.add('inactive');
  overlay.classList.add('inactive');
}, 1000);

// Quiz

if (url.includes('quiz')) {
  quizScript();
}
