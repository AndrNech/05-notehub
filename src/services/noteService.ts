import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNote {
  title: string;
  content: string;
  tag: string;
}

const API = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/notes',
})

export async function fetchNotes (page: number, search: string): Promise<FetchNotesResponse> {
  const {data} = await API.get<FetchNotesResponse>('', {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
    params: {
      search,
      page,
      perPage: 12
    }
  })

  return data;
}

export async function createNote (payload: CreateNote): Promise<Note> {
  const response = await API.post<Note>('', payload, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      'Content-Type': 'application/json'
    }
  }); return response.data;
}

export async function deleteNote (noteId: Note['id']): Promise<Note> {
  const response = await API.delete<Note>(`/${noteId}`, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      'Content-Type': 'application/json'
    }
  }); return response.data;
}

// GET https://notehub-public.goit.study/api/notes?search=mysearchtext
