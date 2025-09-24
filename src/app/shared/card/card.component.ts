import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      <div *ngIf="header" class="p-6 pb-0">
        <h3 class="text-lg font-semibold leading-none tracking-tight">{{ header }}</h3>
        <p *ngIf="description" class="text-sm text-muted-foreground mt-1">{{ description }}</p>
      </div>
      <div class="p-6" [class.pt-6]="!header">
        <ng-content></ng-content>
      </div>
      <div *ngIf="hasFooter" class="p-6 pt-0">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() header?: string;
  @Input() description?: string;
  @Input() variant: 'default' | 'outline' | 'ghost' = 'default';
  @Input() hasFooter = false;

  get cardClasses() {
    const baseClasses = 'rounded-lg border transition-colors';
    const variantClasses = {
      default: 'bg-card text-card-foreground shadow-sm',
      outline: 'border-border',
      ghost: 'border-transparent shadow-none'
    };
    
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
}