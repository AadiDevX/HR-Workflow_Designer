import { useEffect, useState } from 'react';
import { AutomatedStepNodeData, AutomationAction } from '../../types/workflow.types';
import { getAutomations } from '../../api/mockApi';

interface AutomatedStepNodeFormProps {
  data: AutomatedStepNodeData;
  onChange: (data: AutomatedStepNodeData) => void;
}

export const AutomatedStepNodeForm = ({
  data,
  onChange,
}: AutomatedStepNodeFormProps) => {
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAutomations().then((result) => {
      setActions(result);
      setLoading(false);
    });
  }, []);

  const selectedAction = actions.find((a) => a.id === data.actionId);

  const updateParam = (param: string, value: string) => {
    onChange({
      ...data,
      actionParams: { ...data.actionParams, [param]: value },
    });
  };

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
          placeholder="Enter step title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Action <span className="text-red-500">*</span>
        </label>
        {loading ? (
          <div className="text-sm text-gray-500">Loading actions...</div>
        ) : (
          <select
            value={data.actionId}
            onChange={(e) =>
              onChange({
                ...data,
                actionId: e.target.value,
                actionParams: {},
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an action</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedAction && selectedAction.params.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700">
            Action Parameters
          </label>
          {selectedAction.params.map((param) => (
            <div key={param}>
              <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                {param}
              </label>
              <input
                type="text"
                value={data.actionParams[param] || ''}
                onChange={(e) => updateParam(param, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${param}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
