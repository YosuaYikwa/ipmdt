   // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        if (!targetId) return;
        // Show loading overlay
        const navLoadingOverlay = document.getElementById('nav-loading-overlay');
        navLoadingOverlay?.classList?.add('active');
        // Close mobile menu if open
        navLinks.classList.remove('open');
        // After 2 seconds, scroll and hide loading
        setTimeout(() => {
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.focus({preventScroll:true});
            window.scrollTo({
              top: targetSection.offsetTop - 60,
              behavior: 'smooth'
            });
          }
          // Update active class
          document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
          navLoadingOverlay?.classList?.remove('active');
        }, 2000);
      });
    });

    // Keyboard accessibility for hamburger
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navLinks.classList.toggle('open');
      }
    });

    // Simple form validation and submission simulation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !subject || !message) {
        alert('Mohon lengkapi semua bidang sebelum mengirim pesan.');
        return;
      }
      // Basic email format check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Mohon masukkan alamat email yang valid.');
        return;
      }

      alert('Terima kasih, pesan Anda telah terkirim!');
      form.reset();
    });

    // Tabs functionality for Usaha Dana
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active from all buttons and contents
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
          btn.setAttribute('tabindex', '-1');
        });
        tabContents.forEach(content => {
          content.classList.remove('active');
          content.setAttribute('hidden', '');
          content.setAttribute('tabindex', '-1');
        });
        // Activate clicked button and content
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        button.setAttribute('tabindex', '0');
        const contentId = button.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (content) {
          content.classList.add('active');
          content.removeAttribute('hidden');
          content.setAttribute('tabindex', '0');
          content.focus();
        }
      });
    });

    // Handle Pesan Sekarang button clicks with WhatsApp link
    document.querySelectorAll('.item-button').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.getAttribute('data-item');
        const price = button.getAttribute('data-price');
        const waNumber = '6282324722570'; // WhatsApp number without + or 0
        const message = encodeURIComponent(`Halo, saya ingin memesan:\n\n${item}\nHarga: ${price}\n\nTerima kasih.`);
        const waUrl = `https://wa.me/${waNumber}?text=${message}`;
        window.open(waUrl, '_blank');
      });
    });

    // Accessibility: close dropdowns on focusout
    const dropdowns = document.querySelectorAll('nav ul li.dropdown, nav ul li .dropdown-menu li.dropdown-sub');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          dropdown.blur();
        }
      });
    });