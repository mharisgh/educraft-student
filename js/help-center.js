document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('helpDrawer');
  const backdrop = document.getElementById('helpDrawerBackdrop');
  const content = document.getElementById('helpDrawerContent');
  const searchInput = document.getElementById('helpSearchInput');
  const launcher = document.getElementById('helpLauncher');
  const closeBtn = document.getElementById('helpDrawerClose');
  const headerBackBtn = document.getElementById('helpDrawerBack');
  const syncButtons = document.querySelectorAll('[data-help-open]');

  if (!drawer || !backdrop || !content || !searchInput) {
    return;
  }

  const state = {
    data: null,
    history: [{ view: 'home' }],
    search: '',
    drawerOpen: window.innerWidth >= 1024,
    feedback: {},
    educyMessages: [
      {
        role: 'assistant',
        text: "Hello. I'm Educy, here to help with courses, quizzes, assignments, progress, and other student questions."
      }
    ]
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const iconMap = {
    'help.svg': 'ph:flag-banner-fold',
    'book.svg': 'ph:book-open',
    'chat-regular.svg': 'ph:chat-circle-text',
    'certificate.svg': 'ph:medal',
    'ai-star.svg': 'ph:sparkle',
    'quiz.svg': 'ph:notepad',
    'clasroom.svg': 'ph:users-three',
    'settings.svg': 'ph:gear-six',
    'home.svg': 'ph:house',
    'my-courses.svg': 'ph:books',
    'learning-journey.svg': 'ph:path',
    'logout.svg': 'ph:sign-out'
  };

  function iconSizeValue(className) {
    const match = String(className).match(/h-(\d+)/);
    if (!match) {
      return '1.75rem';
    }

    return `${Number(match[1]) / 4}rem`;
  }

  function iconMarkup(icon, className = 'h-10 w-10') {
    const iconName = iconMap[icon] || icon;
    const size = iconSizeValue(className);
    return `<span class="help-ph-icon-shell ${className}"><iconify-icon icon="${escapeHtml(iconName)}" class="help-ph-icon" width="${size}" height="${size}" style="font-size: ${size};"></iconify-icon></span>`;
  }

  function buttonActionAttrs(action) {
    if (!action) {
      return '';
    }

    if (action.type === 'knowledge-base') {
      return 'data-open-knowledge="true"';
    }

    if (action.type === 'category') {
      return `data-category-id="${escapeHtml(action.target)}"`;
    }

    if (action.type === 'article') {
      return `data-article-id="${escapeHtml(action.target)}"`;
    }

    return '';
  }

  function currentView() {
    return state.history[state.history.length - 1] || { view: 'home' };
  }

  function navigate(view) {
    state.history.push(view);
    clearSearch();
    render();
    openDrawer();
  }

  function navigateHome() {
    state.history = [{ view: 'home' }];
    clearSearch();
    render();
  }

  function goBack() {
    if (state.history.length > 1) {
      state.history.pop();
    } else {
      state.history = [{ view: 'home' }];
    }

    clearSearch();
    render();
  }

  function openDrawer() {
    state.drawerOpen = true;
    drawer.dataset.open = 'true';
    backdrop.dataset.open = 'true';
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('pointer-events-none', 'opacity-0');
    backdrop.classList.add('opacity-100');

    if (launcher) {
      launcher.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      launcher.classList.remove('opacity-100', 'translate-y-0');
    }
  }

  function closeDrawer() {
    state.drawerOpen = false;
    drawer.dataset.open = 'false';
    backdrop.dataset.open = 'false';
    drawer.classList.add('translate-x-full');
    backdrop.classList.add('pointer-events-none', 'opacity-0');
    backdrop.classList.remove('opacity-100');

    if (launcher) {
      launcher.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      launcher.classList.add('opacity-100', 'translate-y-0');
    }
  }

  function clearSearch() {
    state.search = '';
    searchInput.value = '';
  }


  function syncHeaderBackButton() {
    if (!headerBackBtn) {
      return;
    }

    const showBackButton = state.history.length > 1;
    headerBackBtn.classList.toggle('hidden', !showBackButton);
    headerBackBtn.classList.toggle('inline-flex', showBackButton);
  }
  function getCategory(categoryId) {
    return state.data.categories.find((category) => category.id === categoryId);
  }

  function getArticle(articleId) {
    return state.data.articles.find((article) => article.id === articleId);
  }

  function getArticlesByCategory(categoryId) {
    return state.data.articles.filter((article) => article.categoryId === categoryId);
  }

  function countArticles(categoryId) {
    return getArticlesByCategory(categoryId).length;
  }

  function isWhatsNewCategory(category) {
    return Boolean(category && category.id === 'whats-new');
  }

  function isEducyChatCategory(category) {
    return Boolean(category && category.id === 'ai-educy-chat');
  }

  function getEducyReply(message) {
    const normalized = message.toLowerCase();

    if (normalized.includes('course')) {
      return 'Open My Courses from the sidebar, choose the course you want, and use Start Learning to continue from the correct lesson.';
    }

    if (normalized.includes('quiz')) {
      return 'You can usually open quizzes from a lesson or classroom activity list. Read each question carefully, then submit and review the result.';
    }

    if (normalized.includes('assignment') || normalized.includes('homework')) {
      return 'For assignments, open the course or classroom task, attach your work, and confirm the submission message before leaving the page.';
    }

    if (normalized.includes('badge') || normalized.includes('reward') || normalized.includes('certificate')) {
      return 'Progress rewards usually appear after completing lessons, milestones, or streak-based goals. You can also check the Progress & Rewards help section for more detail.';
    }

    return 'I can help with courses, quizzes, assignments, progress, and common student tasks. If you want a step-by-step guide, try the knowledge base too.';
  }

  function renderBreadcrumb(items) {
    return `
      <nav class="flex flex-wrap items-center gap-2 text-xs text-slate-400">
        ${items.map((item, index) => {
      const label = escapeHtml(item.label);
      const action = item.action || '';
      const isLast = index === items.length - 1;
      const separator = isLast ? '' : '<span class="text-slate-300">/</span>';
      const classes = isLast ? 'font-semibold text-slate-900' : 'hover:text-primaryDark transition';

      return `${item.action
        ? `<button type="button" ${action} class="${classes}">${label}</button>`
        : `<span class="${classes}">${label}</span>`}${separator}`;
    }).join('')}
      </nav>
    `;
  }

  function renderCategoryPills(categoryIds) {
    return categoryIds.map((categoryId) => {
      const category = getCategory(categoryId);

      if (!category) {
        return '';
      }

      return `
        <button
          type="button"
          data-category-id="${escapeHtml(category.id)}"
          class="rounded-full border border-[#eadcca] bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-primary hover:text-primaryDark"
        >
          ${escapeHtml(category.title)}
        </button>
      `;
    }).join('');
  }

  function renderHome() {
    const home = state.data.home;

    return `
      <div class="min-h-full bg-[linear-gradient(180deg,#ffffff_0%,#fff9f1_45%,#fff7ec_100%)] px-6 py-4 lg:px-8">
        <div class="max-w-4xl">

          
            <p class="text-xs font-semibold text-slate-600">Popular categories</p>
            <div class="mt-3 flex flex-wrap gap-3">
              ${renderCategoryPills(home.popularCategoryIds)}
            </div>
          

          <div class="mt-4 grid gap-4 lg:grid-cols-3">
            ${home.cards.map((card) => `
              <button
                type="button"
                ${buttonActionAttrs(card.action)}
                class="group rounded-[28px] border border-[#efe2d5] bg-white px-4 py-4 text-left shadow-[0_20px_45px_rgba(191,75,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(191,75,0,0.12)]"
              >
                <div class="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#fff2e5] text-primaryDark">
                  ${iconMarkup(card.icon, 'h-8 w-8')}
                </div>
                <h3 class="mt-4 text-lg font-semibold tracking-tight text-slate-950">${escapeHtml(card.title)}</h3>
                <p class="mt-2 text-sm leading-6 text-slate-500">${escapeHtml(card.description)}</p>
              </button>
            `).join('')}
          </div>

          <div class="mt-10">
            
              
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-primaryDark/80">More to explore</p>
                
              
            
            <div class="mt-5 grid gap-4 md:grid-cols-2">
              ${home.quickLinks.map((link) => `
                <button
                  type="button"
                  ${buttonActionAttrs(link.action)}
                  class="group flex items-center justify-between rounded-[24px] border border-[#eadcca] bg-white px-5 py-5 text-left transition hover:border-primary"
                >
                  <div class="flex items-center gap-4">
                    <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff2e5] text-primaryDark">
                      ${iconMarkup(link.icon, 'h-8 w-8')}
                    </span>
                    <div>
                      <p class="text-lg font-semibold text-slate-950">${escapeHtml(link.title)}</p>
                      <p class="mt-1 text-xs text-slate-500">${escapeHtml(link.description)}</p>
                    </div>
                  </div>
                  <img src="../assets/icons/arrow-right.svg" alt="" class="h-5 w-5 transition group-hover:translate-x-1" />
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderKnowledgeBase() {
    return `
      <div class="min-h-full bg-[#fffaf2] px-6 py-2 lg:px-4">
        ${renderBreadcrumb([
      { label: 'Help Center', action: 'data-go-home="true"' },
      { label: 'Knowledge base' }
    ])}

        <div class="mt-4">
          
          <h2 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Select your issue category</h2>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          ${state.data.categories.map((category) => `
            <button
              type="button"
              data-category-id="${escapeHtml(category.id)}"
              class="group rounded-[28px] border border-[#ece0d4] bg-white px-6 py-6 text-left shadow-[0_16px_40px_rgba(191,75,0,0.06)] transition hover:-translate-y-1 hover:border-primary hover:shadow-[0_22px_50px_rgba(191,75,0,0.12)]"
            >
              <div class="flex items-start justify-between gap-5">
                <div>
                  <h3 class="text-xl font-semibold text-slate-950">${escapeHtml(category.title)}</h3>
                  <p class="mt-1 text-xs font-medium text-slate-400">${countArticles(category.id)} articles</p>
                  <p class="mt-3 max-w-[16rem] text-xs leading-5 text-slate-500">${escapeHtml(category.description)}</p>
                </div>
                <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff2e5] text-primaryDark">
                  ${iconMarkup(category.icon, 'h-11 w-11')}
                </span>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderCategoryView(category) {
    const articles = getArticlesByCategory(category.id);

    if (isWhatsNewCategory(category)) {
      return renderWhatsNewView(category, articles);
    }

    if (isEducyChatCategory(category)) {
      return renderEducyChatView(category);
    }

    return `
      <div class="min-h-full bg-[#fffaf2] px-6 py-8 lg:px-8">
        ${renderBreadcrumb([
      { label: 'Help Center', action: 'data-go-home="true"' },
      { label: category.title }
    ])}

        <div class="mt-4">
          <h2 class="text-xl font-semibold tracking-tight text-slate-950">${escapeHtml(category.title)}</h2>
          <p class="mt-1 text-sm text-slate-500">${articles.length} articles</p>
          <p class="mt-4 max-w-2xl text-sm leading-6 text-slate-500">${escapeHtml(category.description)}</p>
        </div>

        <div class="mt-8 space-y-4">
          ${articles.map((article) => `
            <button
              type="button"
              data-article-id="${escapeHtml(article.id)}"
              class="group flex w-full items-center justify-between gap-4 rounded-[24px] border border-[#ece0d4] bg-white px-5 py-5 text-left transition hover:border-primary hover:shadow-[0_18px_40px_rgba(191,75,0,0.08)]"
            >
              <div class="flex items-center gap-4">
                <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6f3ee] text-slate-700">
                  ${iconMarkup(category.icon, 'h-9 w-9')}
                </span>
                <div>
                  <h3 class="text-xl font-semibold text-slate-950">${escapeHtml(article.title)}</h3>
                  <p class="mt-1 text-base text-slate-500">${escapeHtml(article.summary)}</p>
                </div>
              </div>
              <img src="../assets/icons/arrow-right.svg" alt="" class="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderEducyChatView(category) {
    return `
      <div class="min-h-full bg-[#fffaf2] px-6 py-8 lg:px-8">
        ${renderBreadcrumb([
      { label: 'Help Center', action: 'data-go-home="true"' },
      { label: category.title }
    ])}

        <div class="mt-4 flex min-h-[calc(100vh-245px)] flex-col">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight text-slate-950">Chat assistant</h2>
            <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-500">${escapeHtml(category.description)}</p>
          </div>

          <div class="mt-8 flex-1 space-y-6">
            ${state.educyMessages.map((message) => {
      if (message.role === 'user') {
        return `
                <div class="flex justify-end">
                  <div class="max-w-[18rem] rounded-2xl bg-[#efefef] px-4 py-3 text-sm text-slate-950 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">${escapeHtml(message.text)}</div>
                </div>
              `;
      }

      return `
              <div class="max-w-3xl text-base leading-8 text-slate-900">${escapeHtml(message.text)}</div>
            `;
    }).join('')}
          </div>

          <div class="sticky bottom-0 mt-8 bg-[#fffaf2] pb-2 pt-4">
            <form data-educy-form class="flex items-center gap-3">
              <input
                data-educy-input
                type="text"
                placeholder="Type your query here..."
                class="min-w-0 flex-1 rounded-2xl border border-[#f2d3b8] bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary"
              />
              <button
                type="submit"
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#161616] text-white transition hover:bg-black"
              >
                <img src="../assets/icons/arrow.svg" alt="send" class="h-4 w-4 rotate-[-90deg] brightness-[10] saturate-0" />
              </button>
            </form>
            <p class="mt-3 text-xs leading-5 text-slate-500">
              Answers are generated by AI and may contain inaccuracies. Check our
              <button type="button" data-open-knowledge="true" class="font-medium text-primaryDark underline-offset-2 hover:underline">knowledge base</button>
              for in-depth materials.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  function renderWhatsNewView(category, articles) {
    return `
      <div class="min-h-full bg-[#fffaf2] px-6 py-8 lg:px-8">
        ${renderBreadcrumb([
      { label: 'Help Center', action: 'data-go-home="true"' },
      { label: category.title }
    ])}

        <div class="mt-4">
          <h2 class="text-xl font-semibold tracking-tight text-slate-950">What's new</h2>
          <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-500">${escapeHtml(category.description)}</p>
        </div>

        <div class="mt-8 space-y-8">
          ${articles.map((article) => `
            <button
              type="button"
              data-article-id="${escapeHtml(article.id)}"
              class="group block w-full rounded-[28px] border border-[#ece0d4] bg-[#fffdfa] p-5 text-left shadow-[0_16px_40px_rgba(191,75,0,0.05)] transition hover:border-primary hover:shadow-[0_20px_48px_rgba(191,75,0,0.10)]"
            >
              <div class="flex items-center gap-2 text-sm font-medium text-slate-500">
                <span>${escapeHtml(article.releaseDate || article.updated || 'Recently')}</span>
                <span class="h-2 w-2 rounded-full bg-[#ef4444]"></span>
              </div>
              <h3 class="mt-4 text-2xl font-semibold tracking-tight text-slate-950">${escapeHtml(article.title)}</h3>
              <p class="mt-3 max-w-4xl text-base leading-7 text-slate-600">${escapeHtml(article.summary)}</p>
              <div class="mt-5 overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top,#4a1b62_0%,#111827_38%,#020617_100%)] p-3">
                ${article.coverImage
                  ? `<img src="${escapeHtml(article.coverImage)}" alt="${escapeHtml(article.title)}" class="h-[220px] w-full rounded-[20px] object-cover object-center opacity-95 transition duration-300 group-hover:scale-[1.01]" />`
                  : `<div class="flex h-[220px] items-center justify-center rounded-[20px] border border-white/10 text-white/90">${iconMarkup(category.icon, 'h-14 w-14')}</div>`}
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderArticleView(article) {
    const category = getCategory(article.categoryId);
    const feedbackChoice = state.feedback[article.id];

    return `
      <div class="min-h-full bg-[#fffaf2] px-6 py-8 lg:px-8">
        <div>
          ${renderBreadcrumb([
      { label: 'Help Center', action: 'data-go-home="true"' },
      { label: category ? category.title : 'Category', action: category ? `data-category-id="${escapeHtml(category.id)}"` : '' },
      { label: article.title }
    ])}
        </div>

        <div class="mt-6">
          <h2 class="text-3xl font-semibold tracking-tight text-slate-950">${escapeHtml(article.title)}</h2>
          
        </div>

        <div class="mt-8 space-y-5">
          ${article.steps.map((step, index) => `
            <article class="overflow-hidden rounded-[28px] border border-[#ece0d4] bg-white shadow-[0_12px_30px_rgba(191,75,0,0.05)]">
              <div class="px-6 py-6 lg:px-7">
                <div class="flex items-start gap-4">
                  <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white shadow-[0_10px_24px_rgba(248,116,11,0.28)]">${index + 1}</span>
                  <div class="pt-1">
                    <h3 class="text-xl font-semibold text-slate-950">${escapeHtml(step.title)}</h3>
                    <p class="mt-3 text-sm leading-6 text-slate-500">${escapeHtml(step.description)}</p>
                  </div>
                </div>
                ${step.image ? `
                  <div class="mt-6 overflow-hidden rounded-[22px] border border-[#f1e6d9] bg-[#fff7ef] p-3">
                    <img src="${escapeHtml(step.image)}" alt="${escapeHtml(step.title)}" class="h-auto w-full rounded-[18px] object-cover" />
                  </div>
                ` : ''}
              </div>
            </article>
          `).join('')}
        </div>

        ${article.tip ? `
          <section class="mt-6 rounded-[28px] border border-[#ffd8b5] bg-[#fff7ee] px-6 py-6 shadow-[0_12px_24px_rgba(248,116,11,0.06)]">
            <div class="flex items-start gap-4">
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0df] text-primaryDark">
                ${iconMarkup('ai-star.svg', 'h-8 w-8')}
              </span>
              <div>
                <p class="text-lg font-semibold text-slate-950">Tip</p>
                <p class="mt-2 text-sm leading-6 text-slate-500">${escapeHtml(article.tip)}</p>
              </div>
            </div>
          </section>
        ` : ''}

        <section class="mt-6 rounded-[28px] border border-[#ece0d4] bg-white px-6 py-7 text-center shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
          <h3 class="text-xl font-semibold text-slate-950">Was this helpful?</h3>
          <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              data-feedback="yes"
              data-article-feedback-id="${escapeHtml(article.id)}"
              class="rounded-2xl border px-6 py-3 text-sm font-semibold transition ${feedbackChoice === 'yes' ? 'border-primary bg-[#fff2e5] text-primaryDark' : 'border-[#eadcca] bg-[#fcfaf7] text-slate-700 hover:border-primary'}"
            >
              Yes
            </button>
            <button
              type="button"
              data-feedback="no"
              data-article-feedback-id="${escapeHtml(article.id)}"
              class="rounded-2xl border px-6 py-3 text-sm font-semibold transition ${feedbackChoice === 'no' ? 'border-primary bg-[#fff2e5] text-primaryDark' : 'border-[#eadcca] bg-[#fcfaf7] text-slate-700 hover:border-primary'}"
            >
              No
            </button>
          </div>
          ${feedbackChoice ? `<p class="mt-4 text-xs text-slate-500">Thanks for the feedback. We will use it to improve this guide.</p>` : ''}
        </section>
      </div>
    `;
  }

  function renderSearchResults() {
    const term = state.search.trim().toLowerCase();

    const matchingCategories = state.data.categories.filter((category) => {
      return `${category.title} ${category.description}`.toLowerCase().includes(term);
    });

    const matchingArticles = state.data.articles.filter((article) => {
      const haystack = [
        article.title,
        article.summary,
        article.updated,
        ...(article.steps || []).map((step) => `${step.title} ${step.description}`)
      ].join(' ').toLowerCase();

      return haystack.includes(term);
    });

    return `
      <div class="min-h-full bg-[#fffaf2] px-6 py-8 lg:px-8">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-primaryDark/80">Search</p>
          <h2 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Results for "${escapeHtml(state.search)}"</h2>
          <p class="mt-3 text-sm text-slate-500">${matchingArticles.length} guides and ${matchingCategories.length} categories matched your search.</p>
        </div>

        ${matchingCategories.length ? `
          <div class="mt-8">
            <h3 class="text-xl font-semibold text-slate-950">Categories</h3>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              ${matchingCategories.map((category) => `
                <button type="button" data-category-id="${escapeHtml(category.id)}" class="rounded-[24px] border border-[#ece0d4] bg-white px-5 py-5 text-left transition hover:border-primary">
                  <div class="flex items-center gap-4">
                    <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff2e5] text-primaryDark">
                      ${iconMarkup(category.icon, 'h-9 w-9')}
                    </span>
                    <div>
                      <p class="text-lg font-semibold text-slate-950">${escapeHtml(category.title)}</p>
                      <p class="mt-1 text-xs text-slate-500">${countArticles(category.id)} articles</p>
                    </div>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="mt-8">
          <h3 class="text-xl font-semibold text-slate-950">Guides</h3>
          <div class="mt-4 space-y-4">
            ${matchingArticles.length ? matchingArticles.map((article) => {
      const category = getCategory(article.categoryId);

      return `
                <button
                  type="button"
                  data-article-id="${escapeHtml(article.id)}"
                  class="group flex w-full items-center justify-between gap-4 rounded-[24px] border border-[#ece0d4] bg-white px-5 py-5 text-left transition hover:border-primary"
                >
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primaryDark/75">${escapeHtml(category ? category.title : 'Guide')}</p>
                    <h4 class="mt-2 text-xl font-semibold text-slate-950">${escapeHtml(article.title)}</h4>
                    <p class="mt-1 text-sm text-slate-500">${escapeHtml(article.summary)}</p>
                  </div>
                  <img src="../assets/icons/arrow-right.svg" alt="" class="h-5 w-5 transition group-hover:translate-x-1" />
                </button>
              `;
    }).join('') : `
              <div class="rounded-[24px] border border-dashed border-[#eadcca] bg-white px-6 py-10 text-center">
                <p class="text-xl font-semibold text-slate-900">No guides matched that search</p>
                <p class="mt-3 text-sm text-slate-500">Try a simpler keyword like course, quiz, badges, or avatar.</p>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function renderLoading() {
    content.innerHTML = `
      <div class="flex min-h-full items-center justify-center bg-[#fffaf2] px-6 py-20">
        <div class="text-center">
          <div class="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#ffd4b3] border-t-primary"></div>
          <p class="mt-5 text-sm font-medium text-slate-500">Loading help content...</p>
        </div>
      </div>
    `;
  }

  function renderError() {
    content.innerHTML = `
      <div class="flex min-h-full items-center justify-center bg-[#fffaf2] px-6 py-20">
        <div class="max-w-lg rounded-[28px] border border-[#ffd8b5] bg-white px-8 py-10 text-center shadow-[0_20px_40px_rgba(248,116,11,0.08)]">
          <p class="text-2xl font-semibold text-slate-950">Help content could not be loaded</p>
          <p class="mt-3 text-sm leading-6 text-slate-500">Please make sure <code class="rounded bg-[#fff2e5] px-2 py-1 text-primaryDark">data/help-content.json</code> is available from the current page.</p>
          <button type="button" data-go-home="true" class="mt-6 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primaryDark">Try again</button>
        </div>
      </div>
    `;
  }

  function render() {
    if (!state.data) {
      renderLoading();
      return;
    }

    syncHeaderBackButton();

    if (state.search.trim()) {
      content.innerHTML = renderSearchResults();
      return;
    }

    const view = currentView();

    if (view.view === 'knowledge-base') {
      content.innerHTML = renderKnowledgeBase();
      return;
    }

    if (view.view === 'category') {
      const category = getCategory(view.categoryId);
      content.innerHTML = category ? renderCategoryView(category) : renderHome();
      return;
    }

    if (view.view === 'article') {
      const article = getArticle(view.articleId);
      content.innerHTML = article ? renderArticleView(article) : renderHome();
      return;
    }

    content.innerHTML = renderHome();
  }

  function handleAction(target) {
    const homeBtn = target.closest('[data-go-home]');
    if (homeBtn) {
      navigateHome();
      return;
    }

    const openKnowledgeBtn = target.closest('[data-open-knowledge]');
    if (openKnowledgeBtn) {
      navigate({ view: 'knowledge-base' });
      return;
    }

    const categoryBtn = target.closest('[data-category-id]');
    if (categoryBtn) {
      navigate({ view: 'category', categoryId: categoryBtn.dataset.categoryId });
      return;
    }

    const articleBtn = target.closest('[data-article-id]');
    if (articleBtn) {
      navigate({ view: 'article', articleId: articleBtn.dataset.articleId });
      return;
    }

    const backBtn = target.closest('[data-go-back]');
    if (backBtn) {
      goBack();
      return;
    }

    const feedbackBtn = target.closest('[data-feedback][data-article-feedback-id]');
    if (feedbackBtn) {
      state.feedback[feedbackBtn.dataset.articleFeedbackId] = feedbackBtn.dataset.feedback;
      render();
    }
  }

  content.addEventListener('click', (event) => {
    handleAction(event.target);
  });

  content.addEventListener('submit', (event) => {
    const form = event.target.closest('[data-educy-form]');
    if (!form) {
      return;
    }

    event.preventDefault();
    const input = form.querySelector('[data-educy-input]');

    if (!input) {
      return;
    }

    const message = input.value.trim();
    if (!message) {
      return;
    }

    state.educyMessages.push(
      { role: 'user', text: message },
      { role: 'assistant', text: getEducyReply(message) }
    );

    render();

    window.requestAnimationFrame(() => {
      const nextInput = content.querySelector('[data-educy-input]');
      if (nextInput) {
        nextInput.focus();
      }

      content.scrollTop = content.scrollHeight;
    });
  });

  syncButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (button.tagName === 'A' && button.getAttribute('href') && button.getAttribute('href') !== '#') {
        return;
      }

      event.preventDefault();
      openDrawer();
    });
  });

  if (launcher) {
    launcher.addEventListener('click', openDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  backdrop.addEventListener('click', closeDrawer);

  if (headerBackBtn) {
    headerBackBtn.addEventListener('click', goBack);
  }

  searchInput.addEventListener('input', (event) => {
    state.search = event.target.value;

    if (state.search.trim()) {
      openDrawer();
    }

    render();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.drawerOpen) {
      closeDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024 && state.drawerOpen) {
      drawer.classList.add('max-w-full');
    } else {
      drawer.classList.remove('max-w-full');
    }
  });

  renderLoading();

  fetch('../data/help-content.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Unable to load help content');
      }

      return response.json();
    })
    .then((data) => {
      state.data = data;
      render();

      if (state.drawerOpen) {
        openDrawer();
      } else {
        closeDrawer();
      }
    })
    .catch(() => {
      renderError();
      openDrawer();
    });
});
















