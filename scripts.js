// script.js

function searchVehicles() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryFilter').value;
  const allSections = document.querySelectorAll('.subcategory');

  allSections.forEach(section => {
    let hasVisibleItems = false;
    const items = section.querySelectorAll('.category-item');

    items.forEach(item => {
      const title = item.querySelector('strong')?.innerText.toLowerCase() || '';
      const description = item.innerText.toLowerCase();
      const category = item.getAttribute('data-category');

      const matchesSearch = title.includes(searchInput) || description.includes(searchInput);
      const matchesCategory =
        selectedCategory === 'all' || selectedCategory === category || selectedCategory === '';

      const shouldShow = (!searchInput && matchesCategory) || (matchesSearch && matchesCategory);

      item.style.display = shouldShow ? 'flex' : 'none';
      if (shouldShow) hasVisibleItems = true;
    });

    section.style.display = hasVisibleItems ? 'block' : 'none';
  });
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = '';
  document.querySelectorAll('.subcategory').forEach(section => {
    section.style.display = 'none';
    section.querySelectorAll('.category-item').forEach(item => {
      item.style.display = 'none';
    });
  });
}

function openPopup(element) {
  const title = element.querySelector('strong')?.innerText || '';
  const imgSrc = element.querySelector('img')?.src || '';

  const speed = element.getAttribute('data-speed') || '–';
  const weight = element.getAttribute('data-weight') || '–';
  const acceleration = element.getAttribute('data-acceleration') || '–';
  const category = element.getAttribute('data-category') || '';
  const price = element.getAttribute('data-price') || '';

  document.getElementById('popupTitle').innerText = title;
  document.getElementById('popupImg').src = imgSrc;
  document.getElementById('popupCategory').innerText = category;
  document.getElementById('popupPrice').innerText = `Preis: ${price}$`;
  document.getElementById('specSpeed').innerText = speed;
  document.getElementById('specAcceleration').innerText = acceleration;
  document.getElementById('specWeight').innerText = weight;

  document.getElementById('popup').classList.add('active');
}

function closePopup() {
  document.getElementById('popup').classList.remove('active');
}

window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  header.classList.toggle('shrink', window.scrollY > 50);
});

window.addEventListener('load', searchVehicles);
