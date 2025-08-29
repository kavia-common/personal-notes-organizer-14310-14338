import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note, Tag } from '../../models/note.model';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})
export class NoteEditorComponent implements OnChanges {
  @Input() note: Note | null = null;
  @Input() allTags: Tag[] = [];
  @Output() save = new EventEmitter<Partial<Note>>();
  @Output() remove = new EventEmitter<void>();

  title = signal('');
  content = signal('');
  category = signal<string | null>(null);
  selectedTags = signal<Tag[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['note']) {
      this.title.set(this.note?.title || '');
      this.content.set(this.note?.content || '');
      this.category.set(this.note?.category || null);
      this.selectedTags.set(this.note?.tags || []);
    }
  }

  onToggleTag(tag: Tag) {
    const exists = this.selectedTags().some(t => t.name === tag.name);
    if (exists) {
      this.selectedTags.set(this.selectedTags().filter(t => t.name !== tag.name));
    } else {
      this.selectedTags.set([...this.selectedTags(), tag]);
    }
  }

  onSave() {
    this.save.emit({
      title: this.title(),
      content: this.content(),
      category: this.category(),
      tags: this.selectedTags()
    });
  }

  onDelete() {
    this.remove.emit();
  }

  tagSelected = (t: Tag) => this.selectedTags().some(x => x.name === t.name);
  hasNote = computed(() => !!this.note);
}
