import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-sparkline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (points().length > 0) {
      <svg
        class="spark"
        [attr.viewBox]="'0 0 ' + width() + ' ' + height()"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        @if (fill()) {
          <path [attr.d]="fillPath()" [attr.fill]="color()" opacity="0.1"/>
        }
        <path [attr.d]="linePath()" fill="none" [attr.stroke]="color()" stroke-width="1.6" stroke-linecap="round"/>
        <circle
          [attr.cx]="lastPoint()[0]"
          [attr.cy]="lastPoint()[1]"
          r="2.5"
          [attr.fill]="color()"
        />
      </svg>
    }
  `,
})
export class SparklineComponent {
  data = input<number[]>([]);
  color = input('#3d4f3d');
  height = input(36);
  width = input(200);
  fill = input(false);

  points = computed(() => {
    const d = this.data();
    if (!d || d.length === 0) return [];
    const h = this.height();
    const w = this.width();
    const min = Math.min(...d);
    const max = Math.max(...d);
    const range = max - min || 1;
    const stepX = w / (d.length - 1);
    return d.map((v, i) => [i * stepX, h - 4 - ((v - min) / range) * (h - 8)] as [number, number]);
  });

  linePath = computed(() => {
    return this.points()
      .map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1))
      .join(' ');
  });

  fillPath = computed(() => {
    const pts = this.points();
    const h = this.height();
    const w = this.width();
    const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    return path + ` L${w},${h} L0,${h} Z`;
  });

  lastPoint = computed(() => {
    const pts = this.points();
    return pts[pts.length - 1] ?? [0, 0];
  });
}
