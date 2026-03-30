/**
 * app.js
 * Kalash Gulati Portfolio Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Fade in once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // 2. Fetch GitHub Projects
    const username = 'failedengineers';
    const gridContainer = document.getElementById('dynamic-projects-grid');
    
    // We fetch up to 15 updated projects
    const API_URL = `https://api.github.com/users/${username}/repos?sort=updated&per_page=15`;

    const fallbackProjects = [
        { name: 'GenZx', html_url: 'https://github.com/failedengineers/GenZx', description: 'A comprehensive student platform focusing on connectivity and interactive experiences.', tags: ['Full-Stack', 'Platform'] },
        { name: 'RAG Chatbot', html_url: 'https://github.com/failedengineers', description: 'An intelligent Retrieval-Augmented Generation chatbot built for dynamic querying.', tags: ['AI/ML', 'Python'] },
        { name: 'OTP Authentication', html_url: 'https://github.com/failedengineers', description: 'A secure, scalable OTP verification and authentication system focusing on backend robustness.', tags: ['Backend', 'Security'] },
        { name: 'Object Detection', html_url: 'https://github.com/failedengineers', description: 'Computer vision application capable of real-time object detection and classification.', tags: ['Computer Vision', 'AI'] },
        { name: 'Weather Web App', html_url: 'https://github.com/failedengineers', description: 'A dynamic, responsive weather application utilizing external API integration for real-time forecasting.', tags: ['Frontend', 'API'] },
        { name: 'Face Recognition Attendance', html_url: 'https://github.com/failedengineers', description: 'Automated attendance system using facial recognition ML models for seamless logging.', tags: ['ML', 'Python'] },
        { name: 'Stock Prediction ML', html_url: 'https://github.com/failedengineers', description: 'Machine learning model predicting stock trends using historical market data.', tags: ['ML', 'Data Science'] },
        { name: 'Summarizer Tool', html_url: 'https://github.com/failedengineers', description: 'Tool for summarizing long-form text using natural language processing techniques.', tags: ['NLP', 'Python'] }
    ];

    function renderCards(projects, isFallback = false) {
        gridContainer.innerHTML = '';
        
        projects.forEach(repo => {
            const card = document.createElement('a');
            card.className = 'project-card';
            card.href = repo.html_url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            
            // Collect tags
            let tagsHTML = '';
            if (isFallback) {
                repo.tags.forEach(tag => {
                    tagsHTML += `<span class="chip">${tag}</span>`;
                });
            } else {
                if (repo.language) {
                    tagsHTML += `<span class="chip">${repo.language}</span>`;
                }
                const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
                    month: 'short', year: 'numeric'
                });
                tagsHTML += `<span class="chip" style="background: transparent; color: var(--on-surface-variant); border-color: transparent;">Updated: ${updatedDate}</span>`;
            }

            card.innerHTML = `
                <div class="card-content">
                    <h3 class="card-title">${repo.name}</h3>
                    <p class="card-desc">${repo.description || "A project focused on backend or machine learning development."}</p>
                    <div class="hud-chips">
                        ${tagsHTML}
                    </div>
                </div>
            `;
            
            gridContainer.appendChild(card);
        });
    }

    async function fetchGitHubProjects() {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const repos = await response.json();
            
            if (repos.length === 0) {
                renderCards(fallbackProjects, true);
                return;
            }

            // Exclude forks or specific repos if needed, otherwise just show all
            const filteredRepos = repos.filter(repo => !repo.fork).slice(0, 15);
            
            if (filteredRepos.length > 0) {
                 renderCards(filteredRepos, false);
            } else {
                 renderCards(fallbackProjects, true);
            }

        } catch (error) {
            console.error('GitHub Fetch Error, using fallback:', error);
            renderCards(fallbackProjects, true);
        }
    }

    fetchGitHubProjects();
});
