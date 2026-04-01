const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');

    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');

  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

const backToTopButton = document.querySelector('.back-to-top');
let isBackToTopRendered = false;

const alterStyles = (visible) => {
  if (!backToTopButton) return;
  backToTopButton.style.visibility = visible ? 'visible' : 'hidden';
  backToTopButton.style.opacity = visible ? 1 : 0;
  backToTopButton.style.transform = visible ? 'scale(1)' : 'scale(0)';
};

window.addEventListener('scroll', () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

const revealElements = () => {
  const sections = document.querySelectorAll('section');

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  };

  sections.forEach((section) => {
    if (isInViewport(section) && !section.classList.contains('animated')) {
      section.style.opacity = '1';
      section.classList.add('animated');
    }
  });

  revealProjectCards();
};

window.addEventListener('load', revealElements);
window.addEventListener('scroll', revealElements);

function toggleProjectDetails(projectId) {
  const modal = document.getElementById(projectId);

  if (modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  } else {
    document.querySelectorAll('.project-details.active').forEach((openModal) => {
      openModal.classList.remove('active');
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('project-details')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.project-details.active');
    if (openModal) {
      openModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});

const revealProjectCards = () => {
  const projectCards = document.querySelectorAll('.project-card');

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  };

  projectCards.forEach((card, index) => {
    if (isInViewport(card) && !card.classList.contains('animated')) {
      setTimeout(() => {
        card.style.opacity = '1';
        card.classList.add('animated');
      }, index * 150);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header__text');
  if (header) {
    header.style.opacity = '1';
  }

  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
    }, 100 * (index + 1));
  });
});
