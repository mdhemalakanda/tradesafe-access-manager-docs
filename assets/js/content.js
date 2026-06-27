/**
 * TradeSafe Access Manager — documentation content & search index.
 */
window.DOCS_CONTENT = {
	version: '1.0.4',
	pluginName: 'TradeSafe Access Manager',
	sections: [
		{
			id: 'introduction',
			title: 'Introduction',
			category: 'Getting Started',
			keywords: ['overview', 'what is', 'tradesafe', 'access manager', 'mvp', 'private site'],
			content: `
<h1>Introduction</h1>
<p class="doc-article__lead">TradeSafe Access Manager is a WordPress plugin that turns your WooCommerce store into a private, invite-only platform with role-based product visibility.</p>

<div class="doc-callout doc-callout--info">
<strong>Who is this for?</strong>
Site administrators, support staff, and developers who need to control who can register, which products customers can see, and how access codes are issued and tracked.
</div>

<h2>What the plugin does</h2>
<ul>
<li><strong>Private site mode</strong> — Logged-out visitors are redirected to login; the catalog is not browsable without an account.</li>
<li><strong>Invite-only registration</strong> — New accounts require a valid registration invite code (separate from product access codes).</li>
<li><strong>Access code redemption</strong> — Customers unlock product access roles at <em>My Account → Access</em>.</li>
<li><strong>Ghost Mode</strong> — Products and categories the user cannot access are completely hidden from shop, search, URLs, related products, sitemaps, and feeds.</li>
<li><strong>Full admin toolkit</strong> — Generate codes, manage groups, map WooCommerce categories to roles, audit usage logs, and look up users.</li>
</ul>

<h2>Typical workflow</h2>
<ol class="doc-steps">
<li>Enable <strong>Private Site Mode</strong> and <strong>Require Invite Code</strong> in Settings.</li>
<li>Generate <strong>registration invite codes</strong> (Generate Codes → Registration Invite).</li>
<li>Share invite codes with approved registrants.</li>
<li>Generate <strong>access unlock codes</strong> tied to product access roles.</li>
<li>Map WooCommerce categories to roles on <strong>Category Access</strong>.</li>
<li>Customers redeem access codes at <strong>My Account → Access</strong> and see only mapped products.</li>
</ol>

<h2>Admin menu overview</h2>
<p>All plugin screens live under the <strong>TRADESAFE</strong> top-level menu in wp-admin:</p>
<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>#</th><th>Screen</th><th>Purpose</th></tr></thead><tbody>
<tr><td>1</td><td>Access Manager</td><td>Dashboard, stats, quick actions, MVP reference tabs</td></tr>
<tr><td>2</td><td>Codes</td><td>Search, filter, export, edit, disable, and audit all codes</td></tr>
<tr><td>3</td><td>Generate Codes</td><td>Create single or bulk registration/access codes</td></tr>
<tr><td>4</td><td>Code Groups</td><td>Presets for code type, default roles, and redirect URLs</td></tr>
<tr><td>5</td><td>Usage Logs</td><td>Redemption attempts, rate limits, and admin audit trail</td></tr>
<tr><td>6</td><td>User Lookup</td><td>Find users and add/remove access roles manually</td></tr>
<tr><td>7</td><td>Category Access</td><td>Map WooCommerce categories → required access roles</td></tr>
<tr><td>8</td><td>Settings</td><td>Private site, Ghost Mode, rate limits, roles, retention</td></tr>
<tr><td>9</td><td>Frontend Preview</td><td>Visual mockup of registration and access flows</td></tr>
</tbody></table></div>
`,
		},
		{
			id: 'installation',
			title: 'Installation & Requirements',
			category: 'Getting Started',
			keywords: ['install', 'activate', 'requirements', 'woocommerce', 'php', 'wordpress', 'zip'],
			content: `
<h1>Installation & Requirements</h1>
<p class="doc-article__lead">Install the plugin on any WordPress site that meets the requirements below. No Composer or vendor folder is needed in production.</p>

<h2>Requirements</h2>
<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Component</th><th>Minimum</th></tr></thead><tbody>
<tr><td>WordPress</td><td>6.0+</td></tr>
<tr><td>PHP</td><td>7.4+</td></tr>
<tr><td>WooCommerce</td><td>Required for product visibility, My Account, and category mapping</td></tr>
</tbody></table></div>

<h2>Install from zip</h2>
<ol>
<li>Download <code>zeroday-access-manager-{version}.zip</code> (production build — no <code>vendor/</code> folder).</li>
<li>In wp-admin go to <strong>Plugins → Add New → Upload Plugin</strong>.</li>
<li>Upload the zip and click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
<li>Open <strong>TRADESAFE → Access Manager</strong> to confirm the dashboard loads.</li>
</ol>

<h2>Manual install</h2>
<ol>
<li>Extract the zip and upload the <code>zeroday-access-manager</code> folder to <code>/wp-content/plugins/</code>.</li>
<li>Activate via the <strong>Plugins</strong> menu.</li>
</ol>

<div class="doc-callout doc-callout--warn">
<strong>First activation</strong>
Custom database tables are created automatically via dbDelta. Default code groups and category mappings seed on first run.
</div>

<h2>After install checklist</h2>
<ul>
<li>Review <strong>Settings</strong> — enable Private Site Mode if desired.</li>
<li>Configure <strong>Product Access Roles</strong> (slug + display name).</li>
<li>Create or verify <strong>Code Groups</strong> for your campaigns.</li>
<li>Map WooCommerce <strong>Category Access</strong> to roles.</li>
<li>Generate test invite and access codes; verify redemption on the storefront.</li>
<li>Flush permalinks if My Account → Access returns 404 (<strong>Settings → Permalinks → Save</strong>).</li>
</ul>
`,
		},
		{
			id: 'quick-start',
			title: 'Quick Start Guide',
			category: 'Getting Started',
			keywords: ['quick start', 'setup', 'first code', 'getting started', 'workflow'],
			content: `
<h1>Quick Start Guide</h1>
<p class="doc-article__lead">Follow these steps to go from a fresh install to a working private store with role-based catalog visibility.</p>

<figure class="doc-figure">
<img src="assets/img/dashboard.png" alt="Access Manager dashboard with stat cards and quick actions" />
<figcaption>Access Manager dashboard — live stats and shortcuts to common tasks.</figcaption>
</figure>

<ol class="doc-steps">
<li><strong>Configure settings</strong><br/>TRADESAFE → Settings. Enable Private Site Mode, Require Invite Code, and review Ghost Mode options. Save.</li>
<li><strong>Define access roles</strong><br/>In Settings → Product Access Roles, add slugs like <code>tradesafe_access</code> with display names your team understands.</li>
<li><strong>Map categories</strong><br/>TRADESAFE → Category Access → Add Mapping. Pick a WooCommerce category and the role required to see it.</li>
<li><strong>Create a code group</strong> (optional)<br/>TRADESAFE → Code Groups → Add New Group. Set default roles and redirect URL for a campaign.</li>
<li><strong>Generate invite codes</strong><br/>TRADESAFE → Generate Codes → Registration Invite. Generate one or bulk codes; export CSV/TXT for distribution.</li>
<li><strong>Generate access codes</strong><br/>Generate Codes → Access Unlock. Select roles, group, expiration, and max uses. Share codes with registered customers.</li>
<li><strong>Test registration</strong><br/>Log out, register with an invite code, then visit My Account → Access to redeem an access code.</li>
<li><strong>Verify Ghost Mode</strong><br/>Browse shop and direct product URLs as a user without the role — products should be hidden or return 404.</li>
</ol>
`,
		},
		{
			id: 'core-concepts',
			title: 'Core Concepts',
			category: 'Core Concepts',
			keywords: ['invite code', 'access code', 'roles', 'ghost mode', 'private site', 'capabilities'],
			content: `
<h1>Core Concepts</h1>
<p class="doc-article__lead">Understanding these concepts is essential before generating codes or mapping categories.</p>

<h2>Two code types — never mix them up</h2>
<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Type</th><th>Used where</th><th>Grants</th></tr></thead><tbody>
<tr><td><strong>Registration Invite</strong></td><td>Sign-up / registration form only</td><td>Account creation + default WP role (customer/subscriber) — <em>not</em> product access</td></tr>
<tr><td><strong>Access Unlock</strong></td><td>My Account → Access only</td><td>One or more product access roles (capabilities)</td></tr>
</tbody></table></div>
<div class="doc-callout doc-callout--warn">
<strong>Common mistake</strong>
Entering an access unlock code on the registration invite field shows a clear error. Invite codes cannot grant product access; access codes cannot create accounts.
</div>

<h2>Product access roles</h2>
<p>Access roles are stored as <strong>WordPress user capabilities</strong> (custom caps), not standard WP roles like Editor. A user can hold multiple access roles simultaneously.</p>
<ul>
<li>Configure slugs and labels in <strong>Settings → Product Access Roles</strong>.</li>
<li>Labels appear in admin pills, Generate Codes checkboxes, and User Lookup.</li>
<li>Legacy slugs still in the database remain available even if removed from settings.</li>
</ul>

<h2>Registration account roles</h2>
<p>Separate from product access: <strong>customer</strong> or <strong>subscriber</strong> only. Set default in Settings and customize display names under Registration Role Names.</p>

<h2>Private site mode</h2>
<p>When enabled, anonymous visitors are redirected to login. Allowed without login: login, register, lost password, and WooCommerce account pages.</p>

<h2>Ghost Mode (default-deny visibility)</h2>
<p>Users without a matching access role for a mapped category cannot see those products anywhere:</p>
<ul>
<li>Shop and category archives</li>
<li>Search (WooCommerce and mixed site search)</li>
<li>Direct product and category URLs (404 when configured)</li>
<li>Related / upsell / cross-sell suggestions</li>
<li>Sitemaps and product feeds</li>
</ul>
<p>Category Access mappings define which role unlocks which WooCommerce category. Unmapped demo products are also hidden from users with no roles.</p>

<h2>Code statuses</h2>
<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Status</th><th>Meaning</th></tr></thead><tbody>
<tr><td>Unused</td><td>Zero redemptions</td></tr>
<tr><td>Active</td><td>Partially used; max uses not reached</td></tr>
<tr><td>Used</td><td>Max uses exhausted</td></tr>
<tr><td>Expired</td><td>Past expiration date</td></tr>
<tr><td>Disabled</td><td>Manually disabled; revokes access from prior redeemers</td></tr>
</tbody></table></div>

<h2>Rate limiting</h2>
<p>Failed redemption attempts are tracked per IP and per logged-in user. Default: 5 failures within 10 minutes blocks further attempts. Events appear in Usage Logs as <code>rate_limited</code>.</p>

<h2>Code normalization</h2>
<p>Codes are case-insensitive. Spaces and dashes can be ignored on lookup (configurable in Settings). Display format: <code>XXXX-XXXX-XXXX</code> or with prefix <code>TSG-XXXX-XXXX</code>.</p>
`,
		},
		{
			id: 'dashboard',
			title: 'Access Manager Dashboard',
			category: 'Admin Guide',
			keywords: ['dashboard', 'stats', 'export all', 'quick actions', 'acceptance criteria'],
			content: `
<h1>Access Manager Dashboard</h1>
<p class="doc-article__lead">The landing page under TRADESAFE shows live statistics, MVP reference documentation, export shortcuts, and quick actions.</p>

<figure class="doc-figure">
<img src="assets/img/dashboard.png" alt="TradeSafe Access Manager dashboard" />
<figcaption>Dashboard with stat cards, info tabs, and Quick Actions.</figcaption>
</figure>

<h2>Stat cards</h2>
<p>Eight cards pull live counts from the database:</p>
<ul>
<li><strong>Total Codes</strong> — All codes regardless of type</li>
<li><strong>Invite Codes</strong> — Registration invite type only</li>
<li><strong>Access Codes</strong> — Access unlock type only</li>
<li><strong>Failed Attempts</strong> — Failed redemption events in logs</li>
<li><strong>Batches</strong> — Distinct batch names</li>
<li><strong>Active Codes</strong> — Codes with partial usage</li>
<li><strong>Protected Categories</strong> — Category access mappings</li>
<li><strong>Rate Limited</strong> — Rate limit events logged</li>
</ul>

<h2>Information tabs</h2>
<ul>
<li><strong>Required Behavior</strong> — Core rules the plugin enforces</li>
<li><strong>Acceptance Criteria</strong> — MVP definition-of-done checklist</li>
<li><strong>Strategy & Exports</strong> — Auth strategy and re-export options (Selected / Filtered / All codes)</li>
</ul>

<h2>Export All</h2>
<p>Download every stored code as CSV or TXT from the dashboard. This does not regenerate codes — exports are convenience copies; the database remains the source of truth.</p>

<h2>Quick Actions</h2>
<ul>
<li><strong>Generate Codes</strong> — Jump to code generator</li>
<li><strong>Search Key</strong> — Opens Codes page to search by email, username, or IP</li>
<li><strong>Map Categories</strong> — Opens Category Access</li>
</ul>
`,
		},
		{
			id: 'codes',
			title: 'Codes',
			category: 'Admin Guide',
			keywords: ['codes table', 'export', 'disable', 'enable', 'edit', 'bulk', 'datatables', 'filters'],
			content: `
<h1>Codes</h1>
<p class="doc-article__lead">The Codes screen is your command center for every invite and access code in the database.</p>

<figure class="doc-figure">
<img src="assets/img/codes.png" alt="Codes admin table with filters and view tabs" />
<figcaption>Codes table with view tabs, Tom Select filters, search, and row actions.</figcaption>
</figure>

<h2>View tabs</h2>
<p>Filter by type: All, Invite Codes, Access Codes, Unused, Active, Used, Expired, Disabled. Tab counts update from the database.</p>

<h2>Filters</h2>
<ul>
<li><strong>Code Group</strong> — Multi-select Tom Select filter</li>
<li><strong>Batch</strong> — Multi-select by batch name</li>
<li><strong>Search</strong> — Matches code value, redeemed user email/username, or IP (click Search or press Enter)</li>
</ul>

<h2>Row actions</h2>
<p>Soft pill buttons per row:</p>
<ul>
<li><strong>Logs</strong> — View redemption history for this code</li>
<li><strong>Edit</strong> — Change max uses, expiration, roles, notes</li>
<li><strong>Copy</strong> — Copy code to clipboard (also click the code badge)</li>
<li><strong>CSV / TXT</strong> — Export single code metadata</li>
<li><strong>Disable / Enable / Delete</strong> — Status management</li>
</ul>

<div class="doc-callout doc-callout--warn">
<strong>Disable side effect</strong>
Disabling an access code revokes product access roles from users who redeemed it (unless they still hold the role via another active code). Re-enabling does not auto-regrant — users must redeem again if uses remain.
</div>

<h2>Bulk actions</h2>
<p>Select checkboxes, then Disable, Enable, or Delete selected codes from the toolbar.</p>

<h2>Export</h2>
<ul>
<li><strong>With checkboxes selected</strong> — Exports only selected rows</li>
<li><strong>No selection</strong> — Exports all rows matching current filters</li>
<li>Formats: CSV (full metadata) or TXT (code list)</li>
</ul>

<h2>Columns</h2>
<p>Code, Type, Group, Batch, Roles, Status, Uses (used/max), Remaining, Expiration, Created, and Actions.</p>
`,
		},
		{
			id: 'generate-codes',
			title: 'Generate Codes',
			category: 'Admin Guide',
			keywords: ['generate', 'single', 'bulk', 'batch', 'flatpickr', 'prefix', 'tsg'],
			content: `
<h1>Generate Codes</h1>
<p class="doc-article__lead">Create registration invite codes or access unlock codes in single or bulk mode. Codes persist to the database immediately on generate.</p>

<figure class="doc-figure">
<img src="assets/img/generate-codes.png" alt="Generate Codes form" />
<figcaption>Generate Codes — code type, group, roles, expiration, and preview output.</figcaption>
</figure>

<h2>Code type</h2>
<ul>
<li><strong>Registration Invite</strong> — Hides role checkboxes; sets account role (customer/subscriber)</li>
<li><strong>Access Unlock</strong> — Shows product access role checkboxes and redirect URL</li>
</ul>

<h2>Generation mode</h2>
<ul>
<li><strong>Single code</strong> — Default; generates one code</li>
<li><strong>Bulk</strong> — Enter amount (e.g. 100); each code is unique with collision retry</li>
</ul>

<h2>Key fields</h2>
<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Field</th><th>Description</th></tr></thead><tbody>
<tr><td>Code Group</td><td>Applies group defaults (roles, redirect) on change</td></tr>
<tr><td>Batch Name</td><td>Campaign label for filtering (e.g. TradeSafe Batch Name)</td></tr>
<tr><td>Prefix</td><td>Optional display prefix (default TSG-)</td></tr>
<tr><td>Max Uses</td><td>Per-code redemption limit; unlimited when empty</td></tr>
<tr><td>Expiration</td><td>Never, 7/30/90 days, or custom date (Flatpickr)</td></tr>
<tr><td>Redirect URL</td><td>After access redemption (access codes only)</td></tr>
</tbody></table></div>

<h2>After generate</h2>
<ul>
<li>Preview panel lists generated codes</li>
<li><strong>Copy</strong> — All codes to clipboard</li>
<li><strong>Export CSV / TXT</strong> — Download for distribution</li>
<li>Success alert confirms save to database</li>
</ul>

<h2>Formatting</h2>
<p>12-character body: <code>XXXX-XXXX-XXXX</code>. With prefix: <code>TSG-XXXX-XXXX</code>. Charset avoids ambiguous characters (no 0/O, 1/I/L).</p>
`,
		},
		{
			id: 'code-groups',
			title: 'Code Groups',
			category: 'Admin Guide',
			keywords: ['code groups', 'default roles', 'redirect', 'delete', 'edit', 'vip', 'reseller'],
			content: `
<h1>Code Groups</h1>
<p class="doc-article__lead">Groups are long-lived presets that speed up code generation with default type, roles, and redirect URLs. <strong>Every group is fully editable and deletable</strong> — rename, change roles, or remove any row including starter groups like LagFix or TradeSafe.</p>

<figure class="doc-figure">
<img src="assets/img/code-groups.png" alt="Code Groups table" />
<figcaption>Code Groups — checkbox, Edit, and Delete on every row.</figcaption>
</figure>

<h2>Starter groups (fresh install)</h2>
<p>New installs seed Registration Invites, LagFix, TradeSafe, WinKings, VIP Access, and Reseller Access automatically. After that, you control the list — renamed or deleted starter groups are <em>not</em> recreated on every page load.</p>

<h2>Columns</h2>
<p>Name, Type (invite/access), Default Role(s), Redirect URL, Code count, Edit/Delete actions.</p>

<h2>Delete behavior</h2>
<p>Deleting a group also permanently deletes all codes linked to that group. Use bulk select + Delete for multiple groups.</p>

<h2>Add New Group</h2>
<p>TRADESAFE → Add New Group. Set name, code type, default account role (invites) or default roles granted (access), redirect URL, and notes. Saved via AJAX.</p>

<h2>Generate Codes integration</h2>
<p>Changing the Code Group dropdown on Generate Codes auto-fills that group's default roles and redirect URL.</p>
`,
		},
		{
			id: 'usage-logs',
			title: 'Usage Logs',
			category: 'Admin Guide',
			keywords: ['logs', 'audit', 'rate limited', 'failed', 'retention', 'events'],
			content: `
<h1>Usage Logs</h1>
<p class="doc-article__lead">Every redemption attempt, rate-limit event, and admin role change is recorded here for auditing and support.</p>

<figure class="doc-figure">
<img src="assets/img/usage-logs.png" alt="Usage Logs table" />
<figcaption>Usage Logs — filter by event/result, search, and bulk delete.</figcaption>
</figure>

<h2>Retention notice</h2>
<p>Top notice reflects your Settings → Log Retention choice (indefinite by default or time-limited when configured).</p>

<h2>Filters</h2>
<ul>
<li><strong>Event</strong> — redemption, registration, admin_action, rate_limited, etc.</li>
<li><strong>Result</strong> — success, failed</li>
<li><strong>Search</strong> — Code, user, IP (Enter or Search button)</li>
</ul>

<h2>Columns</h2>
<p>Time, Code/Key, Event, User, IP, Result (badge), Roles/Reason, Delete.</p>

<h2>Admin audit entries</h2>
<p>User Lookup add/remove role actions log as <code>admin_action</code> with event types <code>role_added</code> / <code>role_removed</code>, showing admin user → target user.</p>

<h2>Bulk delete</h2>
<p>Select log rows and delete from toolbar. Use carefully — deleted logs cannot be recovered.</p>
`,
		},
		{
			id: 'user-lookup',
			title: 'User Lookup',
			category: 'Admin Guide',
			keywords: ['user lookup', 'search user', 'add role', 'remove role', 'profile', 'codes used'],
			content: `
<h1>User Lookup</h1>
<p class="doc-article__lead">Find any user by email, username, or redeemed code — then inspect or modify their access roles.</p>

<figure class="doc-figure">
<img src="assets/img/user-lookup.png" alt="User Lookup search and profile" />
<figcaption>User Lookup — search card, profile meta, access panel, and Codes Used table.</figcaption>
</figure>

<h2>Search</h2>
<p>Enter email, username, or a code the user redeemed. Click <strong>Search User</strong> or press Enter.</p>

<h2>Profile card</h2>
<p>Shows display name, email, username, registration date, and WordPress account role.</p>

<h2>Access panel</h2>
<ul>
<li><strong>Product access roles</strong> — Pills showing current caps; Add Role / Remove Role buttons</li>
<li><strong>Approved groups</strong> — Code groups tied to redeemed codes</li>
</ul>
<p>Manual add/remove writes audit rows to Usage Logs.</p>

<h2>Codes Used table</h2>
<p>Lists codes this user redeemed with event details. Click row logs for full history modal.</p>

<div class="doc-callout doc-callout--info">
<strong>Custom capabilities</strong>
Access roles stored as user caps (not registered WP roles) display and remove correctly — including roles added only via redemption.
</div>
`,
		},
		{
			id: 'category-access',
			title: 'Category Access',
			category: 'Admin Guide',
			keywords: ['category', 'mapping', 'woocommerce', 'ghost', '404', 'visibility'],
			content: `
<h1>Category Access</h1>
<p class="doc-article__lead">Connect WooCommerce product categories to product access roles. This is how Ghost Mode knows what each user may see.</p>

<figure class="doc-figure">
<img src="assets/img/category-access.png" alt="Category Access mappings table" />
<figcaption>Category Access — warning notice, Add Mapping, and role requirements per category.</figcaption>
</figure>

<h2>How it works</h2>
<ol>
<li>Each row maps one WooCommerce category to one required access role.</li>
<li>Users with that role see products in the category everywhere (shop, archives, search).</li>
<li>Users without the role see nothing — products are excluded at query level (Ghost Mode).</li>
<li>Direct category/product URLs return HTTP 404 when Ghost 404 is enabled.</li>
</ol>

<div class="doc-callout doc-callout--warn">
<strong>MVP behavior</strong>
No Access Behavior is fixed to Ghost Mode (404) in the mapping modal. Redirect-on-deny is a Settings-level option for other contexts, not per-mapping in MVP.
</div>

<h2>Add / Edit mapping</h2>
<p>Modal with Tom Select for category and required role. Warning shown when all categories are already mapped.</p>

<h2>Bulk delete</h2>
<p>Select mappings and delete from toolbar. Removing a mapping immediately affects visibility for all users.</p>
`,
		},
		{
			id: 'settings',
			title: 'Settings',
			category: 'Admin Guide',
			keywords: ['settings', 'private site', 'rate limit', 'endpoint', 'normalization', 'uninstall'],
			content: `
<h1>Settings</h1>
<p class="doc-article__lead">All plugin behavior is controlled from this screen. Changes save via AJAX and take effect immediately (rewrite rules flush when endpoint slug changes).</p>

<figure class="doc-figure">
<img src="assets/img/settings.png" alt="Settings form" />
<figcaption>Settings — site mode, invite code, Ghost Mode, rate limiting, and retention.</figcaption>
</figure>

<h2>Site access</h2>
<ul>
<li><strong>Private Site Mode</strong> — Redirect logged-out users to login</li>
<li><strong>Public Pages</strong> — Static list of always-allowed pages (informational)</li>
<li><strong>Require Invite Code</strong> — Registration must include valid invite</li>
</ul>

<h2>My Account</h2>
<ul>
<li><strong>Endpoint slug</strong> — URL segment for access page (default <code>access</code> → /my-account/access/)</li>
<li><strong>No Access Behavior</strong> — Ghost 404 vs redirect when hitting protected URLs</li>
</ul>

<h2>Registration</h2>
<ul>
<li><strong>Default New User Role</strong> — customer or subscriber</li>
<li><strong>Registration Role Names</strong> — Customize display labels for account roles</li>
</ul>

<h2>Code normalization</h2>
<ul>
<li>Ignore spaces in codes</li>
<li>Ignore dashes in codes</li>
<li>Case-insensitive matching (always on)</li>
</ul>

<h2>Rate limiting</h2>
<p>Enable/disable, max attempts, and window in minutes. Separate scopes for IP and logged-in user.</p>

<h2>Ghost Mode visibility</h2>
<p>Checkboxes control query exclusions, 404 on direct URLs, and stripping related/upsell products.</p>

<h2>Other</h2>
<ul>
<li><strong>Sitemap / Feed Protection</strong> — Hide mapped products from sitemaps and feeds</li>
<li><strong>Log Retention</strong> — Indefinite or time-limited (when implemented)</li>
<li><strong>Uninstall Behavior</strong> — Keep or drop custom tables on plugin delete</li>
</ul>

<h2>Implementation Notes</h2>
<p>Bottom card explains technical details for developers — endpoint registration, cap-based roles, and Ghost Mode query filters.</p>
`,
		},
		{
			id: 'product-access-roles',
			title: 'Product Access Roles',
			category: 'Configuration',
			keywords: ['access roles', 'slug', 'label', 'add role', 'remove role', 'hemal'],
			content: `
<h1>Product Access Roles</h1>
<p class="doc-article__lead">Define the access role slugs and human-readable labels used across the entire plugin.</p>

<figure class="doc-figure">
<img src="assets/img/settings-access-roles.png" alt="Product Access Roles editor" />
<figcaption>Product Access Roles — card layout with Add Role and Remove actions.</figcaption>
</figure>

<h2>Fields per role</h2>
<ul>
<li><strong>Slug</strong> — Machine identifier (lowercase, underscores). Stored as user capability.</li>
<li><strong>Display Name</strong> — Shown in admin pills, Generate Codes, User Lookup, and frontend where applicable.</li>
</ul>

<h2>Adding a role</h2>
<ol>
<li>Click <strong>Add Role</strong> (+ icon button).</li>
<li>Enter slug and display name.</li>
<li>Click <strong>Save Settings</strong>.</li>
<li>Role appears in Generate Codes checkboxes and Category Access dropdown.</li>
</ol>

<h2>Removing a role</h2>
<p>Click <strong>Remove</strong> on a row and save. Existing user caps and database references are not deleted — legacy slugs remain available with slug fallback labels.</p>

<div class="doc-callout doc-callout--success">
<strong>Save fix (v1.0.3)</strong>
Access roles now serialize correctly as indexed arrays. If save previously failed with "Add at least one product access role", update to 1.0.3+.
</div>

<h2>Default MVP roles</h2>
<p>TradeSafe Access, LagFix Access, VIP Access, Reseller Access, and others seed on install. Customize labels without changing slugs to preserve existing mappings.</p>
`,
		},
		{
			id: 'frontend-preview',
			title: 'Frontend Preview',
			category: 'Admin Guide',
			keywords: ['frontend preview', 'mockup', 'register', 'notices', 'preview'],
			content: `
<h1>Frontend Preview</h1>
<p class="doc-article__lead">Visual reference for storefront flows. Preview buttons open live pages in a new tab; cards themselves are not the live UI.</p>

<figure class="doc-figure">
<img src="assets/img/frontend-preview.png" alt="Frontend Preview mockup cards" />
<figcaption>Frontend Preview — registration, My Account Access, and notice examples.</figcaption>
</figure>

<h2>Cards</h2>
<ul>
<li><strong>Private Site Redirect</strong> — What logged-out users experience</li>
<li><strong>Register</strong> — Email, password, invite code fields (editable mockup)</li>
<li><strong>My Account → Access</strong> — Approved roles, unlock form, success notice</li>
<li><strong>Notice Examples</strong> — Success, error, warning, rate-limited copy</li>
</ul>

<h2>Live links</h2>
<p><strong>Register</strong> and <strong>Unlock Access</strong> buttons open the real WooCommerce registration and My Account → Access pages in a new browser tab.</p>
`,
		},
		{
			id: 'frontend-flows',
			title: 'Storefront User Flows',
			category: 'Frontend Experience',
			keywords: ['registration', 'my account', 'redeem', 'unlock', 'customer', 'storefront'],
			content: `
<h1>Storefront User Flows</h1>
<p class="doc-article__lead">What your customers experience on the public site — from first visit to unlocked catalog access.</p>

<h2>1. Logged-out visitor</h2>
<p>With Private Site Mode on, browsing the shop redirects to login. Only login, register, and password reset remain reachable.</p>

<h2>2. Registration</h2>
<ol>
<li>User opens WooCommerce My Account registration (or wp-login register when WC registration disabled).</li>
<li>Fills email, password, and <strong>invite code</strong>.</li>
<li>Valid invite creates account with default role (customer) — no product access yet.</li>
<li>Invalid/expired/used invite shows specific error message.</li>
</ol>

<h2>3. My Account → Access</h2>
<figure class="doc-figure">
<img src="assets/img/my-account-access.png" alt="My Account Access page on storefront" />
<figcaption>Live My Account → Access — approved roles, unlock form, and notices.</figcaption>
</figure>

<ul>
<li>Lists currently approved access roles as pills</li>
<li>User can remove their own access (logged as self_removed)</li>
<li>Unlock form accepts access codes only</li>
<li>Success grants roles without removing existing ones</li>
<li>Warning shown if roles exist but no products exist in mapped categories</li>
</ul>

<h2>4. Browsing the catalog</h2>
<p>After redemption, Ghost Mode reveals only categories mapped to the user's roles. Search, related products, and direct URLs respect the same rules.</p>

<h2>Redemption messages</h2>
<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Situation</th><th>User sees</th></tr></thead><tbody>
<tr><td>Invalid code</td><td>Clear invalid-code message</td></tr>
<tr><td>Expired / disabled</td><td>Specific expired or disabled message</td></tr>
<tr><td>Already has access</td><td>Success-style duplicate message; use still consumed if applicable</td></tr>
<tr><td>Rate limited</td><td>Wait time and retry-after timestamp</td></tr>
</tbody></table></div>
`,
		},
		{
			id: 'database',
			title: 'Database Reference',
			category: 'Developer Reference',
			keywords: ['database', 'tables', 'zdam', 'schema', 'dbdelta'],
			content: `
<h1>Database Reference</h1>
<p class="doc-article__lead">Four custom tables store all plugin data. WordPress options hold settings under <code>zeroday_am_settings</code>.</p>

<h2>Tables</h2>
<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Table</th><th>Purpose</th></tr></thead><tbody>
<tr><td><code>{prefix}zdam_code_groups</code></td><td>Group presets (type, default roles, redirect)</td></tr>
<tr><td><code>{prefix}zdam_codes</code></td><td>All invite and access codes</td></tr>
<tr><td><code>{prefix}zdam_code_logs</code></td><td>Redemptions, failures, admin audit</td></tr>
<tr><td><code>{prefix}zdam_category_access</code></td><td>WooCommerce category → role mappings</td></tr>
</tbody></table></div>

<h2>Code types (column)</h2>
<p><code>registration_invite</code> or <code>access_unlock</code></p>

<h2>Important columns on codes</h2>
<ul>
<li><code>code_normalized</code> — Unique lookup key</li>
<li><code>roles_granted</code> — JSON array (access codes)</li>
<li><code>max_uses</code> / <code>used_count</code> — Redemption limits</li>
<li><code>status</code> — unused, active, used, expired, disabled</li>
</ul>

<h2>Install & upgrade</h2>
<p>Tables created on activation via dbDelta. Schema version in <code>Db_Constants::DB_VERSION</code>; bumped versions trigger automatic upgrade on <code>plugins_loaded</code>.</p>

<h2>Uninstall</h2>
<p>Controlled by Settings → Uninstall Behavior. Can preserve or drop all custom tables and the endpoint slug option.</p>
`,
		},
		{
			id: 'architecture',
			title: 'Architecture Overview',
			category: 'Developer Reference',
			keywords: ['architecture', 'php', 'singleton', 'namespace', 'services', 'repositories'],
			content: `
<h1>Architecture Overview</h1>
<p class="doc-article__lead">Modular OOP WordPress plugin using PSR-4 autoloading and singleton services.</p>

<h2>Namespace</h2>
<p><code>ZeroDay\\AccessManager\\{Area}\\{Class_Name}</code></p>

<h2>Key areas</h2>
<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Folder</th><th>Contains</th></tr></thead><tbody>
<tr><td><code>includes/admin/</code></td><td>One class per admin screen + AJAX handlers</td></tr>
<tr><td><code>includes/frontend/</code></td><td>Private site, registration, My Account, Ghost Mode</td></tr>
<tr><td><code>includes/services/</code></td><td>Business logic (redemption, settings, roles, rate limit)</td></tr>
<tr><td><code>includes/repositories/</code></td><td>Database queries for codes, logs, mappings</td></tr>
<tr><td><code>includes/database/</code></td><td>Table schemas and installer</td></tr>
<tr><td><code>includes/api/</code></td><td>REST routes (health check endpoint)</td></tr>
</tbody></table></div>

<h2>Frontend modules</h2>
<ul>
<li><code>Private_Site</code> — Login redirect</li>
<li><code>Registration_Invite</code> — Invite field + validation</li>
<li><code>My_Account_Access</code> — WC endpoint + redemption form</li>
<li><code>Ghost_Mode</code> + <code>Category_Visibility_Service</code> — Product hiding</li>
<li><code>Sitemap_Protection</code> — Feed/sitemap exclusions</li>
</ul>

<h2>Admin assets</h2>
<p>DataTables, Tom Select, and Flatpickr load from CDN. Page-specific CSS/JS in <code>assets/</code>. No runtime Composer dependencies in production.</p>

<h2>Testing</h2>
<p>CLI test suites in plugin <code>tools/run-*-tests.php</code> (dev only, not shipped in release zip).</p>
`,
		},
		{
			id: 'troubleshooting',
			title: 'Troubleshooting & FAQ',
			category: 'Troubleshooting',
			keywords: ['faq', '404', 'not working', 'fix', 'permalink', 'email', 'save error'],
			content: `
<h1>Troubleshooting & FAQ</h1>
<p class="doc-article__lead">Common issues and how to resolve them.</p>

<h2>My Account → Access shows 404</h2>
<ol>
<li>Go to <strong>Settings → Permalinks</strong> and click Save (flushes rewrite rules).</li>
<li>Confirm endpoint slug in plugin Settings matches your URL.</li>
<li>Ensure WooCommerce My Account page exists and endpoint is registered.</li>
</ol>

<h2>Settings save fails for access roles</h2>
<p>Update to v1.0.3+. Earlier builds had a jQuery serialization bug. Ensure at least one role row has both slug and label filled.</p>

<h2>User registered but sees no products</h2>
<ul>
<li>Invite codes do not grant product access — user must redeem an <strong>access unlock</strong> code.</li>
<li>Verify Category Access mappings exist for your product categories.</li>
<li>Confirm products are assigned to mapped WooCommerce categories.</li>
<li>Check user has the correct access role in User Lookup.</li>
</ul>

<h2>Products still visible to unauthorized users</h2>
<ul>
<li>Confirm Ghost Mode checkboxes are enabled in Settings.</li>
<li>Verify category mapping required role matches the access role slug exactly.</li>
<li>Unmapped products are hidden from users with zero access roles — mapped products need role match.</li>
</ul>

<h2>Registration emails not arriving (local dev)</h2>
<p>On Local WP sites, use Mailpit or similar. Safari HTTPS-Only mode may block local HTTP mail links — see plugin <code>docs/LOCAL-DEV.md</code>.</p>

<h2>Rate limited during testing</h2>
<p>Wait for the window to expire or check Usage Logs for <code>rate_limited</code> events. Adjust limits in Settings for dev environments.</p>

<h2>Admin CSS/JS missing</h2>
<p>Ensure you are on a TRADESAFE submenu page. v1.0.1+ fixed screen detection after rebrand to <code>tradesafe</code> parent slug.</p>

<h2>Export empty or wrong rows</h2>
<p>Toolbar export respects checkboxes first, then filters. Dashboard Export All always exports entire database.</p>

<h2>Where to get help</h2>
<ul>
<li>Review Usage Logs for failed redemption reasons</li>
<li>Use User Lookup to inspect a specific account</li>
<li>Run dev test suites if you have plugin source with <code>tools/</code> folder</li>
</ul>
`,
		},
		{
			id: 'e2e-qa',
			title: 'E2E QA Report & Video',
			category: 'Reference',
			keywords: ['qa', 'testing', 'e2e', 'video', 'screenshots', 'quality assurance', 'verification'],
			content: `
<h1>E2E QA Report & Video</h1>
<p class="doc-article__lead">Full end-to-end quality assurance run with step-by-step browser tests, screenshots for every check, CLI suite results, and a screen recording you can share with stakeholders.</p>

<div class="doc-callout doc-callout--info">
<strong>Latest report</strong>
Open the <a href="e2e-qa/index.html"><strong>E2E QA Report</strong></a> for pass/fail details, embedded video, and per-feature screenshots.
</div>

<h2>What is covered</h2>
<ul>
<li>REST API health check</li>
<li>All 9 TRADESAFE admin screens (dashboard, codes, generate, groups, logs, user lookup, category access, settings, frontend preview)</li>
<li>Live code generation, settings save, user lookup search</li>
<li>Storefront: private site redirect, registration invite field, My Account Access, code redemption, shop Ghost Mode</li>
<li>12 CLI automated test suites from <code>tools/run-*-tests.php</code></li>
</ul>

<h2>Re-run locally</h2>
<pre><code>cd wp-content/plugins/Zeroday-all-assets/docs-site
npm run qa</code></pre>
<p>Output: <code>e2e-qa/index.html</code>, screenshots in <code>e2e-qa/assets/screenshots/</code>, video in <code>e2e-qa/assets/video/</code>.</p>
`,
		},
		{
			id: 'changelog',
			title: 'Changelog',
			category: 'Reference',
			keywords: ['changelog', 'version', '1.0.4', '1.0.3', 'release notes'],
			content: `
<h1>Changelog</h1>
<p class="doc-article__lead">Release history for TradeSafe Access Manager.</p>

<h2>1.0.4 <span class="doc-badge">Current</span></h2>
<ul>
<li>Code Groups: all groups fully editable and deletable; no duplicate re-seeding after rename</li>
<li>Checkbox + Delete on every code group row including former built-ins</li>
<li>E2E QA report and video published on documentation site</li>
</ul>

<h2>1.0.3</h2>
<ul>
<li>Configurable Product Access Roles (slug + display name)</li>
<li>Customizable Registration Role Names</li>
<li>Polished Product Access Roles UI (card layout, Add Role, pill Remove)</li>
<li>Fixed access roles save serialization bug</li>
<li>New Access_Roles_Service; legacy slug fallback labels</li>
</ul>

<h2>1.0.2</h2>
<ul>
<li>TradeSafe/TSG branding defaults in Generate Codes and Frontend Preview</li>
<li>Removed legacy ZeroDay R6S seeds; migration for existing installs</li>
</ul>

<h2>1.0.1</h2>
<ul>
<li>TradeSafe rebrand; fixed admin asset loading after parent menu slug change</li>
</ul>

<h2>1.0.0</h2>
<ul>
<li>Initial MVP release — full admin toolkit, Ghost Mode, live code generation, usage logs, category access, settings persistence, frontend flows</li>
</ul>
`,
		},
	],
};
