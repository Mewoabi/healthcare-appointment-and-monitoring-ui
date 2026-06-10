import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 20 20"
      fill="none"
      [attr.stroke]="color()"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (name()) {
        @case ('home') {
          <path d="M3 10.5L10 4l7 6.5"/><path d="M5 9.5V16h10V9.5"/>
        }
        @case ('calendar') {
          <rect x="3" y="4.5" width="14" height="12" rx="1.5"/><path d="M3 8h14M7 3v3M13 3v3"/>
        }
        @case ('activity') {
          <path d="M2 10h3l2-5 4 10 2-5h5"/>
        }
        @case ('bell') {
          <path d="M5 8a5 5 0 0 1 10 0c0 4 1.5 5 1.5 5h-13S5 12 5 8z"/><path d="M8 16a2 2 0 0 0 4 0"/>
        }
        @case ('user') {
          <circle cx="10" cy="7" r="3"/><path d="M4 17c0-3 3-5 6-5s6 2 6 5"/>
        }
        @case ('users') {
          <circle cx="7" cy="7" r="2.5"/><circle cx="14" cy="8" r="2"/><path d="M2 16c0-2.5 2.2-4 5-4s5 1.5 5 4M12 16c0-2 1.6-3.5 4-3.5s2 0 2 0"/>
        }
        @case ('settings') {
          <circle cx="10" cy="10" r="2.5"/><path d="M10 1.5v3M10 15.5v3M18.5 10h-3M4.5 10h-3M16 4l-2 2M6 14l-2 2M16 16l-2-2M6 6L4 4"/>
        }
        @case ('search') {
          <circle cx="9" cy="9" r="5"/><path d="M13 13l4 4"/>
        }
        @case ('plus') {
          <path d="M10 4v12M4 10h12"/>
        }
        @case ('chevR') {
          <path d="M7 4l6 6-6 6"/>
        }
        @case ('chevL') {
          <path d="M13 4l-6 6 6 6"/>
        }
        @case ('chevD') {
          <path d="M4 7l6 6 6-6"/>
        }
        @case ('check') {
          <path d="M4 10l4 4 8-8"/>
        }
        @case ('x') {
          <path d="M5 5l10 10M15 5L5 15"/>
        }
        @case ('heart') {
          <path d="M10 17s-7-4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6-7 10-7 10z"/>
        }
        @case ('shield') {
          <path d="M10 2L4 4v6c0 4 6 8 6 8s6-4 6-8V4l-6-2z"/>
        }
        @case ('video') {
          <rect x="2" y="6" width="11" height="8" rx="1.5"/><path d="M13 9l5-2v6l-5-2z"/>
        }
        @case ('file') {
          <path d="M5 2h7l3 3v13H5z"/><path d="M12 2v3h3"/>
        }
        @case ('download') {
          <path d="M10 3v10M5 9l5 5 5-5"/><path d="M3 17h14"/>
        }
        @case ('flag') {
          <path d="M4 17V3"/><path d="M4 4h11l-2 3 2 3H4"/>
        }
        @case ('clock') {
          <circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/>
        }
        @case ('chart') {
          <path d="M3 17h14"/><path d="M5 14V8M9 14V5M13 14v-7M17 14v-3"/>
        }
        @case ('logout') {
          <path d="M8 4H4v12h4"/><path d="M11 10h7M15 7l3 3-3 3"/>
        }
        @case ('menu') {
          <path d="M3 5h14M3 10h14M3 15h14"/>
        }
        @case ('moon') {
          <path d="M17 12A7 7 0 1 1 8 3a5.5 5.5 0 0 0 9 9z"/>
        }
        @case ('sun') {
          <circle cx="10" cy="10" r="4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"/>
        }
      }
    </svg>
  `,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; }
  `],
})
export class IconComponent {
  name = input.required<string>();
  size = input(16);
  color = input('currentColor');
  strokeWidth = input(1.6);
}
