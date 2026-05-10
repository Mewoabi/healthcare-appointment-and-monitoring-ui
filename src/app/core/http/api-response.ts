import { map, OperatorFunction } from 'rxjs';

export interface ApiEnvelope<T> {
  data: T;
  message?: string | null;
}

export interface PageEnvelope<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export function unwrap<T>(): OperatorFunction<ApiEnvelope<T>, T> {
  return map((res) => res.data);
}

export function unwrapPage<T>(): OperatorFunction<ApiEnvelope<PageEnvelope<T>>, T[]> {
  return map((res) => res.data.content);
}
