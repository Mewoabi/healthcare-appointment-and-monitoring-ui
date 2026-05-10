export const TODAY = new Date(2026, 4, 6); // May 6, 2026

export function addDays(base: Date, d: number, h = 9, m = 0): Date {
  const x = new Date(base);
  x.setDate(x.getDate() + d);
  x.setHours(h, m, 0, 0);
  return x;
}

export const fmt = {
  time: (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
  hour: (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).replace(' ', '').toLowerCase(),
  hour24: (d: Date) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
  day: (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
  date: (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  dateLong: (d: Date) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  rel: (d: Date) => {
    const diff = Math.round((d.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff === -1) return 'Yesterday';
    if (diff > 0 && diff < 7) return d.toLocaleDateString('en-US', { weekday: 'long' });
    if (diff > 0) return `In ${diff} days`;
    return `${Math.abs(diff)} days ago`;
  },
};
