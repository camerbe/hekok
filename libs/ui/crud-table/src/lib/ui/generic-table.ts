import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';

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


@Component({
  selector: 'lib-ui',
  imports: [
    CommonModule,
    TableModule,

  ],
  templateUrl: './ui.html',
  styleUrl: './ui.css'
})
export class GenericTableComponent<T extends Record<string, any>> {
   @Input() data: T[] = [];
   @Input() columns: TableColumn<T>[] = [];
   @Input() loading = false;
   @Input() paginator = true;
   @Input() rows = 10;
   @Input() totalRecords = 0;
   @Input() first = 0;
   @Input() sortField: string | null = null;
   @Input() sortOrder: number | null = null;
}
