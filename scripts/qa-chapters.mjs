/**
 * E2E QA video chapters — display titles and narration scripts.
 */
export const CHAPTERS = [
	{
		id: 'api',
		displayTitle: 'REST API Health Check',
		subtitle: 'TradeSafe Access Manager v1.0.4',
		narration: 'We begin by verifying the plugin REST API. A request to the status endpoint confirms version one point zero point four is active and the service responds healthy.',
	},
	{
		id: 'plugin',
		displayTitle: 'Plugin Installation',
		subtitle: 'WordPress Plugins Screen',
		narration: 'Next we confirm TradeSafe Access Manager is installed and activated on the WordPress plugins screen. The deactivate link proves the plugin is running correctly.',
	},
	{
		id: 'dashboard',
		displayTitle: 'Access Manager Dashboard',
		subtitle: 'Live Stats & Quick Actions',
		narration: 'The Access Manager dashboard loads with eight live stat cards from the database. We switch through the Acceptance Criteria and Strategy tabs, and verify export buttons plus quick action shortcuts.',
	},
	{
		id: 'codes',
		displayTitle: 'Codes Management',
		subtitle: 'Search, Filter & Export',
		narration: 'On the Codes screen, the DataTables grid loads every stored code. We run a toolbar search, confirm CSV and TXT export buttons, and verify bulk disable, enable, and delete actions are available.',
	},
	{
		id: 'generate',
		displayTitle: 'Generate Codes Process',
		subtitle: 'Single, Bulk & Invite Types',
		narration: 'This is the Generate Codes workflow. We toggle bulk generation mode, preview the registration invite type, then live-generate a single access code with a Q A E two E prefix. The copy button confirms the code was saved to the database.',
	},
	{
		id: 'code-groups',
		displayTitle: 'Code Groups',
		subtitle: 'Edit, Delete & Add New',
		narration: 'Code Groups lists every preset with edit and delete on all rows. We search for TradeSafe, then open the Add New Group form to confirm create and edit flows are ready.',
	},
	{
		id: 'usage-logs',
		displayTitle: 'Usage Logs',
		subtitle: 'Audit Trail & Filters',
		narration: 'Usage Logs shows redemption attempts, rate limits, and admin audit entries. Event and result filters use Tom Select dropdowns, and the retention notice explains log storage policy.',
	},
	{
		id: 'user-lookup',
		displayTitle: 'User Lookup',
		subtitle: 'Profiles, Roles & Codes Used',
		narration: 'User Lookup finds the admin account by username. The profile card shows roles, approved groups, add and remove role actions, and the codes used history table.',
	},
	{
		id: 'category-access',
		displayTitle: 'Category Access',
		subtitle: 'WooCommerce Role Mapping',
		narration: 'Category Access maps WooCommerce categories to required access roles. The Ghost Mode warning is visible, and the Add Mapping modal opens with category and role selectors.',
	},
	{
		id: 'settings',
		displayTitle: 'Settings Configuration',
		subtitle: 'Roles, Ghost Mode & Save',
		narration: 'Settings loads private site mode, invite requirements, product access roles, and Ghost Mode options. We save the form and confirm the success notice via AJAX persistence.',
	},
	{
		id: 'frontend-preview',
		displayTitle: 'Frontend Preview',
		subtitle: 'Registration & Access Mockups',
		narration: 'Frontend Preview displays mockup cards for private site redirect, registration, My Account Access, and notice examples. This screen is a visual reference for the live storefront flows.',
	},
	{
		id: 'storefront',
		displayTitle: 'Storefront & Customer Flow',
		subtitle: 'Private Site, Access & Registration',
		narration: 'On the storefront, logged-out visitors are redirected from the shop to login. After signing in, My Account Access shows the unlock form. We redeem a live access code and land on the protected category. Finally we confirm the registration invite field on the WooCommerce register page.',
	},
];

export function getChapter( id ) {
	return CHAPTERS.find( ( c ) => c.id === id );
}
