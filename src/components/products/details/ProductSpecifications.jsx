import React from 'react';

const ProductSpecifications = ({ 
  specifications, 
  title = 'المواصفات'
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h2>
      
      <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {specifications.map((spec, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                  {spec.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSpecifications;
