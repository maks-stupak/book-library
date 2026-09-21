import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-library-toolbar',
  styleUrl: './library-toolbar.scss',
  templateUrl: './library-toolbar.html',
})
export class LibraryToolbar {
  readonly searchChange = output<string>();
  readonly sort = output<void>();
  readonly importFile = output<File>();
  readonly exportBooks = output<void>();

  protected updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchChange.emit(input.value);
  }

  protected selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.importFile.emit(file);
    input.value = '';
  }
}
