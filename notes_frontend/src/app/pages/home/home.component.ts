import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NoteEditorComponent } from '../../components/note-editor/note-editor.component';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, NoteEditorComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private notesSvc = inject(NotesService);
  private router = inject(Router);

  selected = signal<Note | null>(null);

  notes = computed(() => this.notesSvc.notesSignal());
  tags = computed(() => this.notesSvc.tagsSignal());

  ngOnInit(): void {
    this.notesSvc.fetchNotes().subscribe();
    this.notesSvc.fetchTags().subscribe();
  }

  onSearch(q: string) {
    this.notesSvc.fetchNotes(q).subscribe();
  }

  onSelect(n: Note) {
    this.selected.set(n);
  }

  onCreate() {
    this.notesSvc.createNote({ title: 'New note', content: '', tags: [] }).subscribe({
      next: (n) => this.selected.set(n)
    });
  }

  onSave(partial: Partial<Note>) {
    const curr = this.selected();
    if (!curr || !curr.id) return;
    this.notesSvc.updateNote(curr.id, partial).subscribe({
      next: (n) => this.selected.set(n)
    });
  }

  onDelete() {
    const curr = this.selected();
    if (!curr || !curr.id) return;
    this.notesSvc.deleteNote(curr.id).subscribe({
      next: () => {
        this.selected.set(null);
      }
    });
  }
}
