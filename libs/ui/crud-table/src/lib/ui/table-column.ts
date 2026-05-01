export type ColumnType = 'text' | 'number' | 'date' | 'badge' | 'status' | 'currency' | 'custom';

export interface TableColumn<T = any> {
  field: keyof T & string;
  header: string;
  type: ColumnType;
  sortable?: boolean;
  hidden?: boolean;
  width?: string;
  transform?: (value: any, row: T) => any;
  badgeConfig?: {
    severityMap: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'contrast' | 'secondary'>;
    fallback?: 'secondary';
  };
}
