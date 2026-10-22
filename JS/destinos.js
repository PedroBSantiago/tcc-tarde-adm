/* Destinos Page - Filter & Search Logic */

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.destino-card');
    const searchInput = document.getElementById('searchDestino');
    const emptyState = document.getElementById('emptyState');
    const grid = document.getElementById('destinosGrid');

    let currentFilter = 'todos';

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            applyFilters();
        });
    });

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFilters();
        });
    }

    function applyFilters() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        cards.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('.destino-info > p').textContent.toLowerCase();
            const location = card.querySelector('.destino-location').textContent.toLowerCase();

            const matchesFilter = currentFilter === 'todos' || category === currentFilter;
            const matchesSearch = !searchTerm || 
                title.includes(searchTerm) || 
                desc.includes(searchTerm) || 
                location.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
                card.style.animation = 'slide-up 0.4s ease forwards';
                card.style.animationDelay = `${visibleCount * 0.05}s`;
                visibleCount++;
            } else {
                card.classList.add('hidden');
                card.style.animation = '';
            }
        });

        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        if (grid) {
            grid.style.display = visibleCount === 0 ? 'none' : 'grid';
        }
    }

    // Favorite toggle
    document.querySelectorAll('.destino-fav').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('liked');
            btn.textContent = btn.classList.contains('liked') ? '♥' : '♡';
        });
    });
});
