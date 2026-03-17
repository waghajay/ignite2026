// types/event.ts
export interface Coordinator {
  name: string;
  phone?: string;
  mobile?: number;
}

export interface Event {
  _id: string;
  title: string;
  content: string;
  rules: string[];
  tags: string[];
  amount: number;
  mode: string;
  eventdate: string;
  eventtime: string;
  eventvenue: string;
  eventimage: string;
  whatsapp_group_url?: string;
  totalRegCount: number;
  eventCordinators: Coordinator[];
  createdAt: string;
  updatedAt: string;
  minTeamSize?: number;  // Add this
  maxTeamSize?: number;  // Add this
}