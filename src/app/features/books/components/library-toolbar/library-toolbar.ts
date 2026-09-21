import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-library-toolbar',
  styleUrl: './library-toolbar.scss',
  templateUrl: './library-toolbar.html',
})
export class LibraryToolbar {
  readonly searchChange = output<string>();

  protected updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchChange.emit(input.value);
  }
}
