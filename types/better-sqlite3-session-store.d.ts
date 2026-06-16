// Minimal type declaration for better-sqlite3-session-store, which ships no
// types of its own. The factory takes the express-session module and returns a
// Store constructor compatible with express-session's `store` option.
declare module 'better-sqlite3-session-store' {
    import type session from 'express-session';

    interface SqliteStoreOptions {
        client: unknown; // a better-sqlite3 Database instance
        expired?: {clear?: boolean; intervalMs?: number};
        table?: string;
        ttl?: number;
    }

    function SqliteStoreFactory(
        s: typeof session,
    ): new (options: SqliteStoreOptions) => session.Store;

    export default SqliteStoreFactory;
}
