document.addEventListener('DOMContentLoaded', function() {
// Initialize FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
const question = item.querySelector('.faq-question');
question.addEventListener('click', () => {
    item.classList.toggle('active');
});
});

// Category switching
const categories = document.querySelectorAll('.faq-category');
categories.forEach(category => {
category.addEventListener('click', () => {
    // Remove active class from all categories and contents
    document.querySelectorAll('.faq-category').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.faq-category-content').forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked category and corresponding content
    category.classList.add('active');
    const contentId = category.dataset.category;
    document.getElementById(contentId).classList.add('active');
});
});

updateHeaderUI();
});
