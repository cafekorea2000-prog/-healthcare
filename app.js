document.addEventListener('DOMContentLoaded', () => {
    // Icons
    feather.replace();

    // DOM Elements
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.view-section');
    const goalSlider = document.getElementById('goal-slider');
    const goalDisplay = document.getElementById('goal-display');
    const dayListEl = document.getElementById('day-list');
    
    // Tab Switching Logic
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Nav
            document.querySelector('.nav-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            // Update View
            const targetId = btn.getAttribute('data-target');
            sections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.classList.remove('hidden');
                    sec.classList.add('animate-fade-in');
                } else {
                    sec.classList.add('hidden');
                    sec.classList.remove('animate-fade-in');
                }
            });

            // Re-render icons if needed
            feather.replace();
        });
    });

    // --- State ---
    let currentTargetKg = 5;
    let currentPlanData = null;
    let selectedDayIndex = 0;
    let currentLang = 'ko'; // Default language ('ko' or 'en')

    // --- i18n Logic ---
    function applyTranslations() {
        // Update static texts
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.db.i18n[currentLang][key]) {
                el.innerHTML = window.db.i18n[currentLang][key];
            }
        });
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (window.db.i18n[currentLang][key]) {
                el.placeholder = window.db.i18n[currentLang][key];
            }
        });

        // Update Toggle Buttons UI
        const btnKo = document.getElementById('lang-ko');
        const btnEn = document.getElementById('lang-en');
        if (currentLang === 'ko') {
            btnKo.classList.replace('text-gray-500', 'bg-urban-accent');
            btnKo.classList.replace('hover:text-white', 'text-urban-900');
            btnEn.classList.replace('bg-urban-accent', 'text-gray-500');
            btnEn.classList.replace('text-urban-900', 'hover:text-white');
        } else {
            btnEn.classList.replace('text-gray-500', 'bg-urban-accent');
            btnEn.classList.replace('hover:text-white', 'text-urban-900');
            btnKo.classList.replace('bg-urban-accent', 'text-gray-500');
            btnKo.classList.replace('text-urban-900', 'hover:text-white');
        }
    }

    // Language Toggle Event Listeners
    document.getElementById('lang-ko').addEventListener('click', () => {
        if (currentLang !== 'ko') {
            currentLang = 'ko';
            applyTranslations();
            renderDayList();
            renderDayDetails();
            renderStories();
            renderMindset();
            renderFeeds();
        }
    });

    document.getElementById('lang-en').addEventListener('click', () => {
        if (currentLang !== 'en') {
            currentLang = 'en';
            applyTranslations();
            renderDayList();
            renderDayDetails();
            renderStories();
            renderMindset();
            renderFeeds();
        }
    });

    // --- VIEW: Plan & Protocol ---
    function renderDayList() {
        if (!currentPlanData) return;
        dayListEl.innerHTML = '';
        currentPlanData.plans.forEach((plan, i) => {
            const btn = document.createElement('button');
            btn.className = `day-item-btn ${i === selectedDayIndex ? 'active' : ''}`;
            btn.innerHTML = `
                <div class="flex flex-col">
                    <span class="font-bold text-white">Day ${plan.day}</span>
                    <span class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">${plan.title[currentLang]}</span>
                </div>
                <i data-feather="chevron-right" class="w-4 h-4 opacity-50"></i>
            `;
            btn.addEventListener('click', () => {
                selectedDayIndex = i;
                renderDayList();
                renderDayDetails();
            });
            dayListEl.appendChild(btn);
        });
        feather.replace();
    }

    function renderDayDetails() {
        if (!currentPlanData) return;
        const plan = currentPlanData.plans[selectedDayIndex];
        
        document.getElementById('day-title').textContent = plan.title[currentLang];
        document.getElementById('calorie-badge').innerHTML = `🔥 <span data-i18n="targetCal">${window.db.i18n[currentLang].targetCal}</span>: ${plan.calories}`;
        document.getElementById('current-day-large').textContent = plan.day.toString().padStart(2, '0');
        document.getElementById('workout-text').textContent = plan.workout[currentLang];
        document.getElementById('tip-text').textContent = plan.tip[currentLang];

        const mealGrid = document.getElementById('meal-grid');
        mealGrid.innerHTML = `
            <div class="bg-gray-800/50 rounded-xl p-4 border border-white/5">
                <span class="text-xs text-gray-400 block mb-1 uppercase tracking-wider font-bold" data-i18n="breakfast">${window.db.i18n[currentLang].breakfast}</span>
                <p class="text-white text-sm">${plan.breakfast[currentLang]}</p>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4 border border-white/5">
                <span class="text-xs text-gray-400 block mb-1 uppercase tracking-wider font-bold" data-i18n="lunch">${window.db.i18n[currentLang].lunch}</span>
                <p class="text-white text-sm">${plan.lunch[currentLang]}</p>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4 border border-white/5">
                <span class="text-xs text-gray-400 block mb-1 uppercase tracking-wider font-bold" data-i18n="dinner">${window.db.i18n[currentLang].dinner}</span>
                <p class="text-white text-sm">${plan.dinner[currentLang]}</p>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4 border border-white/5">
                <span class="text-xs text-gray-400 block mb-1 uppercase tracking-wider font-bold" data-i18n="snack">${window.db.i18n[currentLang].snack}</span>
                <p class="text-white text-sm">${plan.snack[currentLang]}</p>
            </div>
        `;

        // Slight animation trigger
        const detailContainer = document.querySelector('.w-2\\/3.glass-panel');
        detailContainer.style.opacity = '0.8';
        detailContainer.style.transform = 'scale(0.99)';
        setTimeout(() => {
            detailContainer.style.opacity = '1';
            detailContainer.style.transform = 'scale(1)';
        }, 150);
    }

    // Slider Event
    goalSlider.addEventListener('input', (e) => {
        currentTargetKg = parseInt(e.target.value);
        goalDisplay.textContent = `${currentTargetKg} KG`;
        
        currentPlanData = window.db.generatePlans(currentTargetKg);
        document.getElementById('protocol-tier-text').textContent = currentPlanData.strategy.tier[currentLang];
        
        selectedDayIndex = 0; // reset
        renderDayList();
        renderDayDetails();
    });

    // Initialize initial data
    applyTranslations();
    currentPlanData = window.db.generatePlans(currentTargetKg);
    document.getElementById('protocol-tier-text').textContent = currentPlanData.strategy.tier[currentLang];
    renderDayList();
    renderDayDetails();


    // --- VIEW: Success Stories ---
    const storiesGrid = document.getElementById('stories-grid');
    function renderStories() {
        storiesGrid.innerHTML = '';
        window.db.stories.forEach(s => {
            const div = document.createElement('div');
            div.className = 'glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-urban-accent/30 transition-colors';
            div.innerHTML = `
                <div class="absolute -right-10 -top-10 w-32 h-32 rounded-full ${s.avatar} opacity-20 blur-3xl group-hover:bg-urban-accent transition-colors"></div>
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-full ${s.avatar} flex items-center justify-center font-bold text-white text-lg">
                        ${s.name['en'].charAt(0)}
                    </div>
                    <div>
                        <h4 class="text-white font-bold text-lg">${s.name[currentLang]}</h4>
                        <p class="text-sm text-urban-accent flex items-center gap-1"><i data-feather="trending-down" class="w-3 h-3"></i> ${s.target} in ${s.duration[currentLang]}</p>
                    </div>
                </div>
                <p class="text-gray-300 relative z-10 leading-relaxed italic">"${s.text[currentLang]}"</p>
            `;
            storiesGrid.appendChild(div);
        });
        feather.replace();
    }
    renderStories();

    // --- VIEW: Mindset Clinic ---
    const mindsetList = document.getElementById('mindset-list');
    function renderMindset() {
        mindsetList.innerHTML = '';
        window.db.mindset.forEach((m, idx) => {
            const div = document.createElement('div');
            div.className = 'glass-panel rounded-2xl p-6 border-l-4 border-l-transparent hover:border-l-urban-accent transition-all cursor-default';
            div.innerHTML = `
                <div class="flex gap-6 items-start">
                    <span class="text-4xl font-extrabold text-white/5 mt-1">0${idx+1}</span>
                    <div>
                        <h4 class="text-xl font-bold text-white mb-2">${m.title[currentLang]}</h4>
                        <p class="text-gray-400 leading-relaxed">${m.content[currentLang]}</p>
                    </div>
                </div>
            `;
            mindsetList.appendChild(div);
        });
    }
    renderMindset();

    // --- VIEW: Community (SNS with Local File Handling) ---
    const feedContainer = document.getElementById('community-feed');
    const btnUpload = document.getElementById('btn-upload');
    const fileUpload = document.getElementById('file-upload');
    const uploadPanel = document.getElementById('upload-panel');
    const previewContainer = document.getElementById('preview-container');
    const btnCancelPost = document.getElementById('btn-cancel-post');
    const btnSubmitPost = document.getElementById('btn-submit-post');
    const postText = document.getElementById('post-text');

    let currentFile = null;
    let currentPreviewUrl = null;

    function renderFeeds() {
        feedContainer.innerHTML = '';
        window.db.communityFeeds.forEach(feed => {
            const div = document.createElement('div');
            div.className = 'glass-panel rounded-2xl p-6';
            
            let mediaHTML = '';
            if (feed.media !== 'none' && feed.type === 'image') {
                mediaHTML = `<img src="${feed.media}" class="post-image rounded-xl mt-4 border border-white/5">`;
            } else if (feed.media !== 'none' && feed.type === 'video') {
                mediaHTML = `<video src="${feed.media}" controls class="post-image rounded-xl mt-4 border border-white/5 bg-black" autoplay muted loop></video>`;
            }

            div.innerHTML = `
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white text-sm">
                        ${feed.user.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h4 class="text-white font-bold text-sm">${feed.user}</h4>
                        <p class="text-xs text-gray-500">${typeof feed.time === 'object' ? feed.time[currentLang] : feed.time}</p>
                    </div>
                </div>
                <p class="text-gray-300 text-[15px] leading-relaxed">${typeof feed.content === 'object' ? feed.content[currentLang] : feed.content}</p>
                ${mediaHTML}
                <div class="flex items-center gap-6 mt-6 pt-4 border-t border-white/5">
                    <button class="flex items-center gap-2 text-gray-400 hover:text-urban-accent transition-colors text-sm font-medium">
                        <i data-feather="heart" class="w-4 h-4"></i> ${feed.likes}
                    </button>
                    <button class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                        <i data-feather="message-circle" class="w-4 h-4"></i> ${feed.replies} <span data-i18n="repliesText">${window.db.i18n[currentLang].repliesText}</span>
                    </button>
                    <button class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium ml-auto">
                        <i data-feather="share-2" class="w-4 h-4"></i> <span data-i18n="shareAction">${window.db.i18n[currentLang].shareAction}</span>
                    </button>
                </div>
            `;
            feedContainer.appendChild(div);
        });
        feather.replace();
    }

    renderFeeds();

    // Upload interactions
    btnUpload.addEventListener('click', () => {
        fileUpload.click();
    });

    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        currentFile = file;
        currentPreviewUrl = URL.createObjectURL(file);

        uploadPanel.classList.remove('hidden');
        previewContainer.classList.remove('hidden');
        previewContainer.innerHTML = '';

        if (file.type.startsWith('image/')) {
            previewContainer.innerHTML = `<img src="${currentPreviewUrl}" class="w-full h-full object-cover">`;
        } else if (file.type.startsWith('video/')) {
            previewContainer.innerHTML = `<video src="${currentPreviewUrl}" class="w-full h-full object-cover bg-black" muted autoplay></video>`;
        }
    });

    btnCancelPost.addEventListener('click', () => {
        uploadPanel.classList.add('hidden');
        postText.value = '';
        currentFile = null;
        if (currentPreviewUrl) URL.revokeObjectURL(currentPreviewUrl);
        currentPreviewUrl = null;
        fileUpload.value = ''; // reset
    });

    btnSubmitPost.addEventListener('click', () => {
        const text = postText.value.trim();
        if (!text && !currentFile) return;

        const newPost = {
            id: Date.now(),
            user: "Guest User",
            time: "Just now",
            content: text,
            media: currentPreviewUrl || "none",
            type: currentFile ? (currentFile.type.startsWith('image/') ? 'image' : 'video') : 'none',
            likes: 0,
            replies: 0
        };

        window.db.communityFeeds.unshift(newPost);
        renderFeeds();

        // Show Toast
        const toast = document.getElementById('toast');
        toast.classList.remove('translate-y-20', 'opacity-0');
        setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);

        // Reset
        uploadPanel.classList.add('hidden');
        postText.value = '';
        currentFile = null;
        currentPreviewUrl = null;
        fileUpload.value = '';
    });
});
