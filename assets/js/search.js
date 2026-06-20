/**
 * Fuzzy search with suggestion dropdown for docs.
 */
(function () {
	'use strict';

	function stripHtml(html) {
		const tmp = document.createElement('div');
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || '';
	}

	function normalize(str) {
		return (str || '').toLowerCase().trim();
	}

	function scoreMatch(query, text) {
		const q = normalize(query);
		const t = normalize(text);
		if (!q) return 0;
		if (t === q) return 100;
		if (t.startsWith(q)) return 80;
		if (t.includes(q)) return 60;
		const words = q.split(/\s+/).filter(Boolean);
		let wordScore = 0;
		words.forEach(function (w) {
			if (t.includes(w)) wordScore += 20;
		});
		return wordScore;
	}

	function buildIndex(sections) {
		return sections.map(function (section) {
			const plain = stripHtml(section.content);
			return {
				id: section.id,
				title: section.title,
				category: section.category,
				keywords: (section.keywords || []).join(' '),
				content: plain,
				snippet: plain.slice(0, 160).replace(/\s+/g, ' ').trim() + '…',
			};
		});
	}

	function search(index, query, limit) {
		if (!query || query.length < 1) return [];
		const results = [];
		index.forEach(function (item) {
			const titleScore = scoreMatch(query, item.title) * 2;
			const kwScore = scoreMatch(query, item.keywords) * 1.5;
			const catScore = scoreMatch(query, item.category);
			const contentScore = scoreMatch(query, item.content) * 0.5;
			const total = Math.max(titleScore, kwScore, catScore, contentScore);
			if (total > 0) {
				results.push({ item: item, score: total });
			}
		});
		results.sort(function (a, b) {
			return b.score - a.score;
		});
		return results.slice(0, limit || 8);
	}

	window.DocsSearch = {
		stripHtml: stripHtml,
		buildIndex: buildIndex,
		search: search,
	};
})();
