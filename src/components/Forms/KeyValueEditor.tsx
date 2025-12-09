import { Plus, X } from 'lucide-react';
import { KeyValuePair } from '../../types/workflow.types';

interface KeyValueEditorProps {
  label: string;
  pairs: KeyValuePair[];
  onChange: (pairs: KeyValuePair[]) => void;
}

export const KeyValueEditor = ({ label, pairs, onChange }: KeyValueEditorProps) => {
  const addPair = () => {
    onChange([...pairs, { key: '', value: '' }]);
  };

  const removePair = (index: number) => {
    onChange(pairs.filter((_, i) => i !== index));
  };

  const updatePair = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...pairs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {pairs.map((pair, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder="Key"
            value={pair.key}
            onChange={(e) => updatePair(index, 'key', e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Value"
            value={pair.value}
            onChange={(e) => updatePair(index, 'value', e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => removePair(index)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={addPair}
        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        <Plus className="w-4 h-4" />
        Add {label}
      </button>
    </div>
  );
};
