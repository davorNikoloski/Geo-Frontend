import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class HeroComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}