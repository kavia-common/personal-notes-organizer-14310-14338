import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() notes: Note[] = [];
  @Input() selectedId: string | null = null;
  @Output() select = new EventEmitter<Note>();
  @Output() create = new EventEmitter<void>();

  trackById = (_: number, note: Note) => note.id;
}
