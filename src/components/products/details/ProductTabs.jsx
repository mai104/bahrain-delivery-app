import React from 'react';

const ProductTabs = ({ 
  activeTab, 
  onChangeTab,
  tabs = []
}) => {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChangeTab(tab.id)}
          className={`flex-1 py-4 px-4 text-center transition-colors ${
            activeTab === tab.id
              ? 'bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default ProductTabs;
