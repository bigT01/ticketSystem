import React from 'react';
import { IColumn, IDefaultTableProps } from '../../constants/interfaces'; // или импортировать напрямую, как показано выше

// Компонент, типизированный с помощью Generics <T>
const DefaultProjectsTable = <T extends { id: string | number }>({
  data,
  columns,
}: IDefaultTableProps<T>) => {
  if (!data || data.length === 0) {
    return <p className="p-5 text-center text-gray-500">No data to display.</p>;
  }

  // The helper function remains the same.
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div className="table-responsive">
      <table className="table-hover table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* TypeScript now knows 'row' has an 'id' */}
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.cellRenderer
                    ? column.cellRenderer(row)
                    : getNestedValue(row, column.accessor as string)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DefaultProjectsTable;