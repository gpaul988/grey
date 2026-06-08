import 'express-session';

declare module 'express-session' {
    interface SessionData {
        user?: {
            id: number;
            name: string;
            email: string;
            role: 'admin' | 'manager' | 'staff';
            avatar?: string | null;
        };
        flash?: string;
    }
}
