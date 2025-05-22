/**
 * ShopEase - About Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize header UI
  updateHeaderUI();
  
  // Add animation to stats when they come into view
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }
});

// Animate stats numbers
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-card h3');
  
  statNumbers.forEach(stat => {
    const finalValue = parseInt(stat.textContent);
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = finalValue / (duration / 16); // 60fps
    
    function updateValue() {
      if (currentValue < finalValue) {
        currentValue += increment;
        if (currentValue > finalValue) currentValue = finalValue;
        
        // Format the number based on its content
        let displayValue = Math.floor(currentValue);
        if (stat.textContent.includes('K')) {
          displayValue = (currentValue / 1000).toFixed(1) + 'K';
        } else if (stat.textContent.includes('%')) {
          displayValue = Math.floor(currentValue) + '%';
        } else if (stat.textContent.includes('/')) {
          displayValue = '24/7';
        }
        
        stat.textContent = displayValue;
        
        if (currentValue < finalValue) {
          requestAnimationFrame(updateValue);
        }
      }
    }
    
    updateValue();
  });
}