import { TaskNodeData } from '../../types/workflow.types';
import { KeyValueEditor } from './KeyValueEditor';

interface TaskNodeFormProps {
  data: TaskNodeData;
  onChange: (data: TaskNodeData) => void;
}

export const TaskNodeForm = ({ data, onChange }: TaskNodeFormProps) => {
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
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          placeholder="Describe the task"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assignee
        </label>
        <input
          type="text"
          value={data.assignee}
          onChange={(e) => onChange({ ...data, assignee: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="john.doe@company.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={data.dueDate}
          onChange={(e) => onChange({ ...data, dueDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <KeyValueEditor
        label="Custom Fields"
        pairs={data.customFields}
        onChange={(customFields) => onChange({ ...data, customFields })}
      />
    </div>
  );
};
