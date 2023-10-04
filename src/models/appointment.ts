export interface Appointment {
    id: number;
    slot_id: number;
    student_id: number;
    satisfaction_score: number;
    notes: string;
    slot_start_time: string; // Use the timestamp to extract and show date
    student_name: string;
}