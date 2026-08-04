import 'express-session';

declare module 'express-session' {
    interface SessionData {
        /** Team / admin dashboard user. */
        user?: {
            id: number;
            name: string;
            email: string;
            role: 'superadmin' | 'admin' | 'manager' | 'staff';
            avatar?: string | null;
        };
        /** Client portal session (client account or one of their staff). */
        portal?: {
            kind: 'client' | 'client_staff';
            id: number;
            clientId: number;       // owning client account id
            name: string;
            email: string;
            avatar?: string | null;
        };
        flash?: string;
    }
}
