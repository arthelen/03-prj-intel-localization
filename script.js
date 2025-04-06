// Function to apply RTL mode dynamically
function applyRTLMode(isRTL) {
  const htmlElement = document.documentElement;
  if (isRTL) {
    htmlElement.setAttribute('dir', 'rtl'); // Set direction to RTL
    htmlElement.classList.add('rtl'); // Add a class for additional styling if needed
  } else {
    htmlElement.setAttribute('dir', 'ltr'); // Set direction to LTR
    htmlElement.classList.remove('rtl'); // Remove the RTL class
  }
}

// Function to detect language and apply RTL if necessary
function detectLanguageAndApplyRTL() {
  const lang = document.documentElement.lang; // Get the current language from the <html> tag
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']; // List of RTL languages
  applyRTLMode(rtlLanguages.includes(lang));
}

// Run the detection on page load
document.addEventListener('DOMContentLoaded', detectLanguageAndApplyRTL);
