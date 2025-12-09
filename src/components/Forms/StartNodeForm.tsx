import { StartNodeData } from '../../types/workflow.types';
import { KeyValueEditor } from './KeyValueEditor';

interface StartNodeFormProps {
  data: StartNodeData;
  onChange: (data: StartNodeData) => void;
}

export const StartNodeForm = ({ data, onChange }: StartNodeFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter workflow title"
        />
      </div>

      <KeyValueEditor
        label="Metadata"
        pairs={data.metadata}
        onChange={(metadata) => onChange({ ...data, metadata })}
      />
    </div>
  );
};
