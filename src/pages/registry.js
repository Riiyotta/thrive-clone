// Maps a route path (see src/routes.js) to its page component.
// Each page family lives in src/pages/<family>/ and exports `pages` from its
// index.js as { '/route/path': Component }. They're merged here automatically,
// so families never edit a shared file. Unregistered routes fall back to PendingPage.
const families = import.meta.glob('./*/index.js', { eager: true })

export const PAGE_COMPONENTS = Object.assign({}, ...Object.values(families).map((m) => m.pages || {}))
