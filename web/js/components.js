/**
 * Growth With Gray - Component Loader
 * Loads shared header and footer from partials via fetch
 */

async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}: ${response.status}`);
    const html = await response.text();
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = html;
  } catch (error) {
    console.error('Component load error:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('site-header', 'partials/header.html'),
    loadComponent('site-footer', 'partials/footer.html')
  ]);

  // Signal that components are loaded so other scripts can initialize
  document.dispatchEvent(new CustomEvent('components-loaded'));
});
