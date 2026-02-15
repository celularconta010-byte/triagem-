import { createClient } from '@supabase/supabase-js';
import { Attendee, EventMetadata } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Attendees functions
export async function fetchAttendees(): Promise<Attendee[]> {
    const { data, error } = await supabase
        .from('attendees')
        .select('*')
        .order('timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching attendees:', error);
        return [];
    }

    return data || [];
}

export async function addAttendee(attendee: Attendee): Promise<boolean> {
    const { error } = await supabase
        .from('attendees')
        .insert([attendee]);

    if (error) {
        console.error('Error adding attendee:', error);
        return false;
    }

    return true;
}

export async function deleteAttendee(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('attendees')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting attendee:', error);
        return false;
    }

    return true;
}

export async function clearAllAttendees(): Promise<boolean> {
    const { error } = await supabase
        .from('attendees')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
        console.error('Error clearing attendees:', error);
        return false;
    }

    return true;
}

// Event Metadata functions
export async function fetchEventMetadata(): Promise<EventMetadata | null> {
    const { data, error } = await supabase
        .from('event_metadata')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching event metadata:', error);
        return null;
    }

    return data || null;
}

export async function saveEventMetadata(metadata: EventMetadata): Promise<boolean> {
    // First, try to get existing metadata
    const existing = await fetchEventMetadata();

    if (existing) {
        // Update existing
        const { error } = await supabase
            .from('event_metadata')
            .update({
                ...metadata,
                updated_at: new Date().toISOString()
            })
            .eq('id', (existing as any).id);

        if (error) {
            console.error('Error updating event metadata:', error);
            return false;
        }
    } else {
        // Insert new
        const { error } = await supabase
            .from('event_metadata')
            .insert([metadata]);

        if (error) {
            console.error('Error inserting event metadata:', error);
            return false;
        }
    }

    return true;
}

export async function clearEventMetadata(): Promise<boolean> {
    const { error } = await supabase
        .from('event_metadata')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
        console.error('Error clearing event metadata:', error);
        return false;
    }

    return true;
}
