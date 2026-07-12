(() => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const menuButton = Array.from(nav.querySelectorAll('button')).find((button) =>
    button.classList.contains('md:hidden') || button.querySelector('[data-icon="menu"], .material-symbols-outlined')
  );
  if (!menuButton) return;

  const mobileQuery = window.matchMedia('(max-width: 767px)');
  const links = Array.from(nav.querySelectorAll('a[href]'))
    .map((link) => ({ href: link.getAttribute('href'), label: link.textContent.trim() }))
    .filter((link) => /\.html(?:$|[?#])/.test(link.href) && link.label);
  const uniqueLinks = links.filter((link, index) =>
    links.findIndex((candidate) => candidate.href === link.href) === index
  );

  const inquiry = Array.from(nav.querySelectorAll('a[href="contact.html"]')).find((link) =>
    /inquire/i.test(link.textContent)
  );
  if (inquiry) inquiry.classList.add('mobile-inquiry');

  const panel = document.createElement('div');
  panel.className = 'mobile-nav-panel';
  panel.id = 'mobile-site-menu';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Mobile navigation');
  panel.innerHTML = uniqueLinks.map(({ href, label }) =>
    `<a href="${href}">${label}</a>`
  ).join('') + '<a href="contact.html">Start an inquiry</a>';
  document.body.appendChild(panel);

  menuButton.classList.add('mobile-nav-trigger');
  menuButton.setAttribute('type', 'button');
  menuButton.setAttribute('aria-controls', panel.id);
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open site menu');

  const closeMenu = () => {
    panel.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open site menu');
    const icon = menuButton.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = 'menu';
  };
  const toggleMenu = () => {
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'Close site menu' : 'Open site menu');
    const icon = menuButton.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = willOpen ? 'close' : 'menu';
  };

  menuButton.addEventListener('click', toggleMenu);
  panel.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!panel.hidden && !panel.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  mobileQuery.addEventListener('change', (event) => {
    if (!event.matches) closeMenu();
  });
  document.body.classList.add('mobile-ready');
})();
