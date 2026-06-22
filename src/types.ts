export interface Attendee {
  name: string;
  number: number;
  date: string; // ISO timestamp
}

export interface AttendeesResponse {
  count: number;
  objective: number;
  attendees: Attendee[];
}

export interface GuestMessage {
  name: string;
  message: string;
  date: string; // ISO timestamp
}

export interface GuestbookResponse {
  messages: GuestMessage[];
}
