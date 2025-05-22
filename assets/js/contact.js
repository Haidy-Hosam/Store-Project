/*[⚠️ Suspicious Content] /**
 * ShopEase - Contact Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize header UI
  updateHeaderUI();
  
  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmission);
  }
});

// Handle contact form submission
function handleContactSubmission(e) {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Validate form data
  if (!validateForm(formData)) {
    return;
  }
  
  // In a real application, this would send the data to a server
  // For now, we'll just show a success message
  showSuccessMessage();
  
  // Reset form
  e.target.reset();
}

// Validate form data
function validateForm(data) {
  let isValid = true;
  
  // Name validation
  if (data.name.trim().length < 2) {
    showNotification('Please enter a valid name', 'error');
    isValid = false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showNotification('Please enter a valid email address', 'error');
    isValid = false;
  }
  
  // Subject validation
  if (data.subject.trim().length < 2) {
    showNotification('Please enter a subject', 'error');
    isValid = false;
  }
  
  // Message validation
  if (data.message.trim().length < 10) {
    showNotification('Please enter a message (minimum 10 characters)', 'error');
    isValid = false;
  }
  
  return isValid;
}

// Show success message
function showSuccessMessage() {
  showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
}