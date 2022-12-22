import { TableColumnOptions, TableOptions } from 'typeorm';

export const appendSoftDelete = (table: TableOptions): void => {
  table.columns.push({
    name: 'deleted_at',
    type: 'datetime',
    isNullable: true,
    default: 'CURRENT_TIMESTAMP',
  } as TableColumnOptions);
};

export const appendTimestamps = (
  table: TableOptions,
  withSoftDelete = false,
  type = 'datetime',
): void => {
  table.columns = table.columns.concat([
    {
      type,
      name: 'created_at',
      isNullable: false,
      default: 'CURRENT_TIMESTAMP',
    },
    {
      type,
      name: 'updated_at',
      isNullable: false,
      default: 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  ] as TableColumnOptions[]);

  if (withSoftDelete) {
    table.columns.push({
      type,
      name: 'deleted_at',
      isNullable: true,
      default: null,
    } as TableColumnOptions);
  }
};
