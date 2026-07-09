
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
    observer.observe(item);
  });


  const storyPanels = document.querySelectorAll('.story-panel');
  storyPanels.forEach((panel) => {
    let touchStartY = null;
    let autoPlayed = false;

    const setSolved = (value) => panel.classList.toggle('solved', value);
    const toggleSolved = () => panel.classList.toggle('solved');

    panel.addEventListener('click', toggleSolved);

    panel.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) < 4) return;
      event.preventDefault();
      setSolved(event.deltaY > 0);
    }, { passive: false });

    panel.addEventListener('touchstart', (event) => {
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    panel.addEventListener('touchend', (event) => {
      if (touchStartY === null) return;
      const currentY = event.changedTouches[0].clientY;
      const deltaY = touchStartY - currentY;
      if (Math.abs(deltaY) > 24) {
        setSolved(deltaY > 0);
      }
      touchStartY = null;
    }, { passive: true });

    const panelObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !autoPlayed) {
          autoPlayed = true;
          setTimeout(() => setSolved(true), 750);
        }
      });
    }, { threshold: 0.55 });

    panelObserver.observe(panel);
  });

});
