import db from '../db';
import type { ConversationParticipant } from '../db/types';

export const Participants = {
    forConversation(conversationId: number): ConversationParticipant[] {
        return db
            .prepare('SELECT * FROM conversation_participants WHERE conversation_id = ? ORDER BY created_at ASC')
            .all(conversationId) as ConversationParticipant[];
    },

    /** Count only the client-staff participants of a conversation. */
    countStaff(conversationId: number): number {
        return (
            db
                .prepare(
                    "SELECT COUNT(*) AS c FROM conversation_participants WHERE conversation_id = ? AND participant_type = 'client_staff'"
                )
                .get(conversationId) as { c: number }
        ).c;
    },

    exists(conversationId: number, type: string, participantId: number): boolean {
        const row = db
            .prepare(
                'SELECT 1 FROM conversation_participants WHERE conversation_id = ? AND participant_type = ? AND participant_id = ?'
            )
            .get(conversationId, type, participantId);
        return Boolean(row);
    },

    add(data: {
        conversation_id: number;
        participant_type: 'client' | 'client_staff' | 'staff';
        participant_id: number;
        name?: string;
        added_by?: string;
    }): ConversationParticipant {
        const info = db
            .prepare(
                `INSERT OR IGNORE INTO conversation_participants
                 (conversation_id, participant_type, participant_id, name, added_by)
                 VALUES (@conversation_id, @participant_type, @participant_id, @name, @added_by)`
            )
            .run({
                conversation_id: data.conversation_id,
                participant_type: data.participant_type,
                participant_id: data.participant_id,
                name: data.name || null,
                added_by: data.added_by || null,
            });
        return (
            (db.prepare('SELECT * FROM conversation_participants WHERE id = ?').get(Number(info.lastInsertRowid)) as
                | ConversationParticipant
                | undefined) ??
            (db
                .prepare(
                    'SELECT * FROM conversation_participants WHERE conversation_id=? AND participant_type=? AND participant_id=?'
                )
                .get(data.conversation_id, data.participant_type, data.participant_id) as ConversationParticipant)
        );
    },

    remove(conversationId: number, type: string, participantId: number): void {
        db.prepare(
            'DELETE FROM conversation_participants WHERE conversation_id = ? AND participant_type = ? AND participant_id = ?'
        ).run(conversationId, type, participantId);
    },
};
