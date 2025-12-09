import { EndNodeData } from '../../types/workflow.types';

interface EndNodeFormProps {
  data: EndNodeData;
  onChange: (data: EndNodeData) => void;
}

export const EndNodeForm = ({ data, onChange }: EndNodeFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Message
        </label>
        <textarea
          value={data.endMessage}
          onChange={(e) => onChange({ ...data, endMessage: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          placeholder="Enter completion message"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="summaryFlag"
          checked={data.summaryFlag}
          onChange={(e) => onChange({ ...data, summaryFlag: e.target.checked })}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="summaryFlag" className="ml-2 text-sm text-gray-700">
          Generate workflow summary
        </label>
      </div>
    </div>
  );
};
