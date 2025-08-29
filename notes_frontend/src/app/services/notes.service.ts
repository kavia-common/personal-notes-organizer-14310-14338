import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Note, Tag } from '../models/note.model';
import { Observable, tap } from 'rxjs';

/**
 * NotesService provides CRUD and search operations for notes, as well as tag management.
 */
@Injectable({ providedIn: 'root' })
export class NotesService {
  notesSignal = signal<Note[]>([]);
  tagsSignal = signal<Tag[]>([]);
  loadingSignal = signal<boolean>(false);

  constructor(private api: ApiService) {}

  // PUBLIC_INTERFACE
  /** Load all notes optionally filtered by query. */
  fetchNotes(query?: string): Observable<Note[]> {
    this.loadingSignal.set(true);
    return this.api.get<Note[]>('/notes', query ? { q: query } : undefined).pipe(
      tap((notes) => {
        this.notesSignal.set(notes);
        this.loadingSignal.set(false);
      })
    );
  }

  // PUBLIC_INTERFACE
  /** Create a new note. */
  createNote(payload: Partial<Note>): Observable<Note> {
    return this.api.post<Note>('/notes', payload).pipe(
      tap((n) => this.notesSignal.set([n, ...this.notesSignal()])),
    );
  }

  // PUBLIC_INTERFACE
  /** Update an existing note by ID. */
  updateNote(id: string, payload: Partial<Note>): Observable<Note> {
    return this.api.put<Note>(`/notes/${id}`, payload).pipe(
      tap((n) => {
        const arr = this.notesSignal().map(x => x.id === id ? n : x);
        this.notesSignal.set(arr);
      })
    );
  }

  // PUBLIC_INTERFACE
  /** Delete a note by ID. */
  deleteNote(id: string): Observable<{ success: boolean }> {
    return this.api.delete<{ success: boolean }>(`/notes/${id}`).pipe(
      tap(() => {
        const arr = this.notesSignal().filter(x => x.id !== id);
        this.notesSignal.set(arr);
      })
    );
  }

  // PUBLIC_INTERFACE
  /** Fetch tags. */
  fetchTags(): Observable<Tag[]> {
    return this.api.get<Tag[]>('/tags').pipe(
      tap((tags) => this.tagsSignal.set(tags))
    );
  }

  // PUBLIC_INTERFACE
  /** Create a new tag. */
  createTag(payload: Partial<Tag>): Observable<Tag> {
    return this.api.post<Tag>('/tags', payload).pipe(
      tap((t) => this.tagsSignal.set([...this.tagsSignal(), t])),
    );
  }
}
