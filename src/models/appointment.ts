export interface Slot {
    id: number;
    coachId: number;
    studentId: number | null; // This will be null if the slot hasn't been booked.
    date: string; // This can be formatted as 'YYYY-MM-DD'.
    startTime: string; // This can be formatted as 'HH:MM'.
    endTime: string; // This can be formatted as 'HH:MM'.
    status: SlotStatus;
    feedbackScore?: number; // This will be undefined until a score is given. It can also be set to null if you prefer.
    feedbackNotes?: string; // This will be undefined until notes are given. It can also be set to null if you prefer.
}

type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'COMPLETED';
