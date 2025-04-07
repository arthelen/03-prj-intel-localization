// Function to validate email input format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.querySelector('form').addEventListener('submit', function (e) {
  const emailField = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const isValid = validateEmail(emailField.value);

  if (!isValid) {
    e.preventDefault(); // prevent form submission
    emailField.setAttribute('aria-invalid', 'true');
    emailField.classList.add('is-invalid');
    emailError.classList.remove('visually-hidden');
    emailField.focus();
  } else {
    emailField.removeAttribute('aria-invalid');
    emailField.classList.remove('is-invalid');
    emailError.classList.add('visually-hidden');
  }
});


// Function to apply RTL mode dynamically
function applyRTLMode(isRTL) {
  const htmlElement = document.documentElement;
  htmlElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  htmlElement.classList.toggle('rtl', isRTL);
  loadBootstrapStylesheet(isRTL);
  adjustTextAlignment(isRTL);
}

// Function to dynamically load Bootstrap RTL or LTR stylesheet
function loadBootstrapStylesheet(isRTL) {
  const existingLink = document.querySelector('#bootstrap-stylesheet');
  if (existingLink) {
    existingLink.href = isRTL
      ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css'
      : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
  }
}

// Function to adjust text alignment dynamically
function adjustTextAlignment(isRTL) {
  const body = document.body;
  body.style.textAlign = isRTL ? 'right' : 'left';

  const formLabels = document.querySelectorAll('form .form-label, form .form-check-label');
  formLabels.forEach(label => {
    label.style.textAlign = isRTL ? 'right' : 'left';
  });

  const buttons = document.querySelectorAll('form .btn-primary');
  buttons.forEach(button => {
    button.style.float = isRTL ? 'left' : 'right';
  });

  const additionalInfoSection = document.querySelector('#additional-info-section');
  if (additionalInfoSection) {
    additionalInfoSection.style.textAlign = isRTL ? 'right' : 'left';
  }
}

// Function to detect language and apply RTL if necessary
function detectLanguageAndApplyRTL() {
  const lang = document.documentElement.lang; // Get the current language from the <html> tag
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']; // List of RTL languages
  applyRTLMode(rtlLanguages.includes(lang));
}

// Function to observe language changes and apply RTL dynamically
function observeLanguageChanges() {
  const htmlElement = document.documentElement;
  const observer = new MutationObserver(() => {
    const lang = htmlElement.lang; // Get the updated language
    const rtlLanguages = ['ar', 'he', 'fa', 'ur']; // List of RTL languages
    applyRTLMode(rtlLanguages.includes(lang));
  });

  observer.observe(htmlElement, { attributes: true, attributeFilter: ['lang'] });
}

// Run the detection and observer on page load
document.addEventListener('DOMContentLoaded', () => {
  detectLanguageAndApplyRTL(); // Initial detection
  observeLanguageChanges(); // Start observing changes
});
