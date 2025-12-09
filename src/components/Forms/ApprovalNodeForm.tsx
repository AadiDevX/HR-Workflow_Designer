import { ApprovalNodeData } from '../../types/workflow.types';

interface ApprovalNodeFormProps {
  data: ApprovalNodeData;
  onChange: (data: ApprovalNodeData) => void;
}

export const ApprovalNodeForm = ({ data, onChange }: ApprovalNodeFormProps) => {
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
          placeholder="Enter approval title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Approver Role
        </label>
        <select
          value={data.approverRole}
          onChange={(e) => onChange({ ...data, approverRole: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select role</option>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
          <option value="C-Level">C-Level</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Auto-Approve Threshold
        </label>
        <input
          type="number"
          value={data.autoApproveThreshold}
          onChange={(e) =>
            onChange({ ...data, autoApproveThreshold: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0"
          min="0"
        />
        <p className="text-xs text-gray-500 mt-1">
          Automatically approve if value is below this threshold
        </p>
      </div>
    </div>
  );
};
