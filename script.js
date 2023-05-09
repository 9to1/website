/* Navigation Active State */
let navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
  });
});

/* Smooth Scrolling */
$('a[href*="#"]').on('click', function(e) {
  e.preventDefault();

  $('html, body').animate(
    {
      scrollTop: $($(this).attr('href')).offset().top,
    },
    500,
    'linear'
  );
});

/* Filter Projects */
$('.filter-btn').on('click', function() {
  let type = $(this).attr('id');
  let projects = $('.projects-wrapper .project');

  if (type === 'all') {
    $(projects).show();
  } else {
    $(projects)
      .not('.' + type)
      .hide();
    $(projects)
      .filter('.' + type)
      .show();
  }

  // Set Active Class
  $('.filter-btn').removeClass('active');
  $(this).addClass('active');
});

/* Form Validation */
const form = document.querySelector('.contact-form');
const nameInput = form.querySelector('#name');
const emailInput = form.querySelector('#email');
const messageInput = form.querySelector('#message');
const submitBtn = form.querySelector('.submit-btn');

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (validateForm()) {
    alert('Form submitted successfully!');
  }
});

function validateForm() {
  let valid = true;
  if (nameInput.value === '') {
    setErrorFor(nameInput, 'Name is required');
    valid = false;
  } else {
    setSuccessFor(nameInput);
  }

  if (emailInput.value === '') {
    setErrorFor(emailInput, 'Email is required');
    valid = false;
  } else if (!isValidEmail(emailInput.value)) {
    setErrorFor(emailInput, 'Email is not valid');
    valid = false;
  } else {
    setSuccessFor(emailInput);
  }

  if (messageInput.value === '') {
    setErrorFor(messageInput, 'Message is required');
    valid = false;
  } else {
    setSuccessFor(messageInput);
  }

  return valid;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector('.error-message');
  errorMessage.innerText = message;
  formControl.classList.add('error');
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
}

function isValidEmail(email) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
