/**
 * TradeSafe Access Manager docs — app shell, nav, routing, search UI.
 */
(function () {
	'use strict';

	const data = window.DOCS_CONTENT;
	if (!data || !data.sections) return;

	const searchIndex = window.DocsSearch.buildIndex(data.sections);
	let highlightIndex = -1;

	const els = {
		nav: document.getElementById('docs-nav'),
		article: document.getElementById('docs-article'),
		searchInput: document.getElementById('docs-search-input'),
		searchDropdown: document.getElementById('docs-search-dropdown'),
		menuBtn: document.getElementById('docs-menu-btn'),
		sidebar: document.getElementById('docs-sidebar'),
		overlay: document.getElementById('docs-overlay'),
		version: document.getElementById('docs-version'),
	};

	function groupByCategory(sections) {
		const groups = {};
		sections.forEach(function (s) {
			if (!groups[s.category]) groups[s.category] = [];
			groups[s.category].push(s);
		});
		return groups;
	}

	function renderNav(activeId) {
		const groups = groupByCategory(data.sections);
		let html = '';
		Object.keys(groups).forEach(function (cat) {
			html += '<div class="docs-nav-group">';
			html += '<div class="docs-nav-group__label">' + escapeHtml(cat) + '</div>';
			groups[cat].forEach(function (s) {
				const active = s.id === activeId ? ' is-active' : '';
				html +=
					'<a class="docs-nav-link' +
					active +
					'" href="#' +
					s.id +
					'" data-section="' +
					s.id +
					'">' +
					escapeHtml(s.title) +
					'</a>';
			});
			html += '</div>';
		});
		els.nav.innerHTML = html;
	}

	function renderSection(id) {
		const section = data.sections.find(function (s) {
			return s.id === id;
		});
		if (!section) {
			renderSection(data.sections[0].id);
			return;
		}
		els.article.innerHTML =
			'<article class="doc-article">' + section.content + '</article>';
		document.title = section.title + ' — ' + data.pluginName + ' Docs';
		renderNav(id);
		window.scrollTo({ top: 0, behavior: 'smooth' });
		closeSidebar();
	}

	function escapeHtml(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function getSectionFromHash() {
		const hash = (location.hash || '').replace(/^#/, '');
		if (hash && data.sections.some(function (s) { return s.id === hash; })) {
			return hash;
		}
		return data.sections[0].id;
	}

	function renderSearchResults(results) {
		if (!results.length) {
			els.searchDropdown.innerHTML =
				'<div class="docs-search__empty">No results for "' +
				escapeHtml(els.searchInput.value) +
				'"</div>';
			els.searchDropdown.classList.add('is-open');
			highlightIndex = -1;
			return;
		}
		let html = '';
		results.forEach(function (r, i) {
			const hi = i === highlightIndex ? ' is-highlighted' : '';
			html +=
				'<a class="docs-search__item' +
				hi +
				'" href="#' +
				r.item.id +
				'" data-section="' +
				r.item.id +
				'" role="option">' +
				'<div class="docs-search__item-title">' +
				escapeHtml(r.item.title) +
				'</div>' +
				'<div class="docs-search__item-meta">' +
				escapeHtml(r.item.category) +
				'</div>' +
				'<div class="docs-search__item-snippet">' +
				escapeHtml(r.item.snippet) +
				'</div></a>';
		});
		els.searchDropdown.innerHTML = html;
		els.searchDropdown.classList.add('is-open');
	}

	function closeSearchDropdown() {
		els.searchDropdown.classList.remove('is-open');
		highlightIndex = -1;
	}

	function onSearchInput() {
		const q = els.searchInput.value.trim();
		if (q.length < 1) {
			closeSearchDropdown();
			return;
		}
		const results = window.DocsSearch.search(searchIndex, q, 8);
		renderSearchResults(results);
	}

	function navigateToSection(id) {
		location.hash = id;
		renderSection(id);
		closeSearchDropdown();
		els.searchInput.value = '';
		els.searchInput.blur();
	}

	function openSidebar() {
		els.sidebar.classList.add('is-open');
		els.overlay.classList.add('is-visible');
	}

	function closeSidebar() {
		els.sidebar.classList.remove('is-open');
		els.overlay.classList.remove('is-visible');
	}

	// Events
	window.addEventListener('hashchange', function () {
		renderSection(getSectionFromHash());
	});

	els.nav.addEventListener('click', function (e) {
		const link = e.target.closest('[data-section]');
		if (link) {
			e.preventDefault();
			navigateToSection(link.getAttribute('data-section'));
		}
	});

	els.searchInput.addEventListener('input', onSearchInput);
	els.searchInput.addEventListener('focus', onSearchInput);

	els.searchDropdown.addEventListener('click', function (e) {
		const item = e.target.closest('[data-section]');
		if (item) {
			e.preventDefault();
			navigateToSection(item.getAttribute('data-section'));
		}
	});

	els.searchInput.addEventListener('keydown', function (e) {
		const items = els.searchDropdown.querySelectorAll('.docs-search__item');
		if (!els.searchDropdown.classList.contains('is-open') || !items.length) {
			if (e.key === 'Escape') closeSearchDropdown();
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlightIndex = Math.min(highlightIndex + 1, items.length - 1);
			onSearchInput();
			items[highlightIndex]?.scrollIntoView({ block: 'nearest' });
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightIndex = Math.max(highlightIndex - 1, 0);
			onSearchInput();
			items[highlightIndex]?.scrollIntoView({ block: 'nearest' });
		} else if (e.key === 'Enter' && highlightIndex >= 0) {
			e.preventDefault();
			const id = items[highlightIndex].getAttribute('data-section');
			navigateToSection(id);
		} else if (e.key === 'Escape') {
			closeSearchDropdown();
		}
	});

	document.addEventListener('click', function (e) {
		if (!e.target.closest('.docs-search')) closeSearchDropdown();
	});

	document.addEventListener('keydown', function (e) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			els.searchInput.focus();
			els.searchInput.select();
		}
	});

	els.menuBtn.addEventListener('click', function () {
		if (els.sidebar.classList.contains('is-open')) closeSidebar();
		else openSidebar();
	});

	els.overlay.addEventListener('click', closeSidebar);

	if (els.version) els.version.textContent = 'v' + data.version;

	renderSection(getSectionFromHash());
})();
