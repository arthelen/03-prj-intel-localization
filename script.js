// Function to validate email input format
function validateEmail(email) {
  const email = document.getElementById('email').value;
  const emailRegex = /^[^\\s@]+@[^\\s@]+\.[^\\s@]+$/;
  return emailRegex.test(email);
}

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
  const existingLink = document.querySelector('link[href*="bootstrap"]');
  if (existingLink) existingLink.remove(); // Remove existing Bootstrap stylesheet

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = isRTL
    ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css'
    : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
  document.head.appendChild(link);
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
