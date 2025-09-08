// 🍔 Menu Mobile
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Toggle menu mobile
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.querySelector('i').classList.toggle('fa-times');
        burger.querySelector('i').classList.toggle('fa-bars');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.querySelector('i').classList.remove('fa-times');
            burger.querySelector('i').classList.add('fa-bars');
        });
    });

    // Header scrolled effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animation au scroll pour les sections
    const sections = document.querySelectorAll('.section');
    const checkSections = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialisation des animations
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Déclencher au scroll et au chargement
    window.addEventListener('scroll', checkSections);
    checkSections();

    // Formulaire de contact (simulation)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Merci pour votre message ! Nous vous répondrons bientôt.');
            contactForm.reset();
        });
    }
});

// ========== PALMARÈS FILTERS ==========
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.palmares-page')) {
        const saisonFilter = document.getElementById('saison-filter');
        const terrainFilter = document.getElementById('terrain-filter');
        const categorieFilter = document.getElementById('categorie-filter');

        function filterPalmares() {
            const selectedSaison = saisonFilter.value;
            const selectedTerrain = terrainFilter.value;
            const selectedCategorie = categorieFilter.value;

            // Reset : tout afficher
            document.querySelectorAll('.saison, .terrain-group, .categorie').forEach(element => {
                element.classList.remove('hidden');
            });

            // Appliquer tous les filtres en une passe
            document.querySelectorAll('.saison').forEach(saison => {
                // Filtrer cette saison
                const saisonMatch = selectedSaison === 'all' || saison.dataset.saison === selectedSaison;

                if (!saisonMatch) {
                    saison.classList.add('hidden');
                    return; // Passer à la saison suivante
                }

                // Vérifier les terrains de cette saison
                let saisonHasVisibleContent = false;

                saison.querySelectorAll('.terrain-group').forEach(terrain => {
                    const terrainMatch = selectedTerrain === 'all' || terrain.dataset.terrain === selectedTerrain;

                    if (!terrainMatch) {
                        terrain.classList.add('hidden');
                        return;
                    }

                    // Vérifier les catégories de ce terrain
                    let terrainHasVisibleContent = false;

                    terrain.querySelectorAll('.categorie').forEach(categorie => {
                        const categorieMatch = selectedCategorie === 'all' || categorie.dataset.categorie === selectedCategorie;

                        if (!categorieMatch) {
                            categorie.classList.add('hidden');
                        } else {
                            terrainHasVisibleContent = true;
                            saisonHasVisibleContent = true;
                        }
                    });

                    // Si le terrain n'a plus de catégories visibles, le cacher
                    if (!terrainHasVisibleContent) {
                        terrain.classList.add('hidden');
                    }
                });

                // Si la saison n'a plus de contenu visible, la cacher
                if (!saisonHasVisibleContent) {
                    saison.classList.add('hidden');
                }
            });
        }

        // Écouteurs d'événements
        saisonFilter.addEventListener('change', filterPalmares);
        terrainFilter.addEventListener('change', filterPalmares);
        categorieFilter.addEventListener('change', filterPalmares);
    }
});




