import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

interface Point { x: number; y: number; }

@Component({
  selector: 'app-trend-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (pts().length >= 2) {
      <svg [attr.viewBox]="'0 0 ' + W + ' ' + height()" style="width: 100%;" [attr.height]="height()" aria-hidden="true">
        @for (tick of yticks(); track $index) {
          <g>
            <line [attr.x1]="pad.l" [attr.x2]="W - pad.r" [attr.y1]="tick.y" [attr.y2]="tick.y" stroke="#e7e2d4" stroke-dasharray="2 4"/>
            <text [attr.x]="pad.l - 6" [attr.y]="tick.y + 3" text-anchor="end" font-size="10" fill="#6a766f" font-family="Geist Mono">{{ tick.v }}</text>
          </g>
        }
        <path [attr.d]="areaPath()" [attr.fill]="color()" opacity="0.1"/>
        <path [attr.d]="linePath()" fill="none" [attr.stroke]="color()" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        @for (p of pts(); track $index) {
          <circle [attr.cx]="p.x" [attr.cy]="p.y" [attr.r]="$last ? 4 : 2" [attr.fill]="color()"/>
        }
        @for (lbl of labels(); track $index) {
          <text [attr.x]="lbl.x" [attr.y]="height() - 8" text-anchor="middle" font-size="10" fill="#6a766f" font-family="Geist Mono">{{ lbl.text }}</text>
        }
      </svg>
    }
  `,
})
export class TrendChartComponent {
  data = input<number[]>([]);
  color = input('#3d4f3d');
  height = input(220);

  readonly W = 760;
  readonly pad = { l: 36, r: 12, t: 16, b: 26 };

  pts = computed<Point[]>(() => {
    const d = this.data();
    const h = this.height();
    const { l, r, t, b } = this.pad;
    if (d.length < 2) return [];
    const min = Math.floor(Math.min(...d) * 0.96);
    const max = Math.ceil(Math.max(...d) * 1.04);
    const range = max - min || 1;
    const stepX = (this.W - l - r) / (d.length - 1);
    return d.map((v, i) => ({
      x: l + i * stepX,
      y: t + (h - t - b) - ((v - min) / range) * (h - t - b),
    }));
  });

  yticks = computed(() => {
    const d = this.data();
    const h = this.height();
    const { l: _l, r: _r, t, b } = this.pad;
    if (d.length < 2) return [];
    const min = Math.floor(Math.min(...d) * 0.96);
    const max = Math.ceil(Math.max(...d) * 1.04);
    const range = max - min || 1;
    const count = 4;
    return Array.from({ length: count + 1 }, (_, i) => ({
      y: t + ((h - t - b) / count) * i,
      v: (max - (range / count) * i).toFixed(0),
    }));
  });

  linePath = computed(() => {
    return this.pts().map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' ');
  });

  areaPath = computed(() => {
    const pts = this.pts();
    const h = this.height();
    const { b } = this.pad;
    if (!pts.length) return '';
    const line = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' ');
    return line + ` L${pts[pts.length - 1].x},${h - b} L${pts[0].x},${h - b} Z`;
  });

  labels = computed(() => {
    const pts = this.pts();
    const d = this.data();
    if (!pts.length) return [];
    const indices = [0, Math.floor(d.length / 2), d.length - 1];
    return indices.map((i) => ({ x: pts[i].x, text: `${-30 + i}d` }));
  });
}
