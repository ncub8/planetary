import React from 'react';

interface TableColumn {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, className = '' }) => {
  return (
    <div className={`overflow-x-auto bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-white/5 transition-colors duration-200">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No data available</p>
        </div>
      )}
    </div>
  );
};

export default Table;