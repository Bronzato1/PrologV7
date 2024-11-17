import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() menuItems: { label: string, action: () => void }[] = [];
  isMenuOpen = false;

  constructor(private router: Router) {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-button-container')) {
      this.isMenuOpen = false;
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
