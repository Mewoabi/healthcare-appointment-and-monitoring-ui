import { Appointment, VitalRecord } from '../../models';

export function toAppointment(dto: any): Appointment {
  return {
    ...dto,
    scheduledAt: new Date(dto.scheduledAt),
  };
}

export function toVitalRecord(dto: any): VitalRecord {
  return {
    ...dto,
    timestamp: new Date(dto.timestamp),
  };
}
