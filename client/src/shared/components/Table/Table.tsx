import React from "react";
import "./Table.scss";

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  expandableContent?: (row: T) => React.ReactNode; // ✅ optional accordion content
}

export function Table<T>({
  columns,
  data,
  rowKey,
  actions,
  emptyMessage,
  expandableContent,
}: TableProps<T>) {
  return (
    <div className="shared-table-responsive">
      <table className="shared-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className={col.className}>
                {col.label}
              </th>
            ))}
            {actions && <th></th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="empty"
              >
                {emptyMessage || "-"}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <React.Fragment key={rowKey(row)}>
                <tr>
                  {columns.map((col) => (
                    <td key={col.key as string} className={col.className}>
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                  {actions && <td>{actions(row)}</td>}
                </tr>
                {expandableContent && (
                  <tr className="expandable-row">
                    <td
                      colSpan={columns.length + (actions ? 1 : 0)}
                      className="expandable-cell"
                    >
                      {expandableContent(row)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="shared-table-cards">
        {data.length === 0 ? (
          <div className="shared-table-card empty">{emptyMessage || "-"}</div>
        ) : (
          data.map((row) => (
            <div className="shared-table-card" key={rowKey(row)}>
              {columns.map((col) => (
                <div className="shared-table-card-row" key={col.key as string}>
                  <span className="label">{col.label}:</span>
                  <span className="value">
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </span>
                </div>
              ))}
              {actions && (
                <div className="shared-table-card-actions">{actions(row)}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
