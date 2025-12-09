import { Node } from 'reactflow';
import { WorkflowNodeData } from '../../types/workflow.types';
import { StartNodeForm } from './StartNodeForm';
import { TaskNodeForm } from './TaskNodeForm';
import { ApprovalNodeForm } from './ApprovalNodeForm';
import { AutomatedStepNodeForm } from './AutomatedStepNodeForm';
import { EndNodeForm } from './EndNodeForm';
import { X } from 'lucide-react';

interface NodeConfigPanelProps {
  node: Node<WorkflowNodeData> | null;
  onUpdate: (nodeId: string, data: WorkflowNodeData) => void;
  onClose: () => void;
}

export const NodeConfigPanel = ({
  node,
  onUpdate,
  onClose,
}: NodeConfigPanelProps) => {
  if (!node) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex items-center justify-center text-gray-500">
        Select a node to configure
      </div>
    );
  }

  const handleDataChange = (newData: WorkflowNodeData) => {
    onUpdate(node.id, { ...newData, label: getNodeLabel(newData) });
  };

  const getNodeLabel = (data: WorkflowNodeData): string => {
    switch (data.type) {
      case 'start':
        return data.title || 'Start';
      case 'task':
        return data.title || 'Task';
      case 'approval':
        return data.title || 'Approval';
      case 'automated':
        return data.title || 'Automated Step';
      case 'end':
        return 'End';
    }
  };

  const renderForm = () => {
    switch (node.data.type) {
      case 'start':
        return (
          <StartNodeForm
            data={node.data}
            onChange={handleDataChange}
          />
        );
      case 'task':
        return (
          <TaskNodeForm
            data={node.data}
            onChange={handleDataChange}
          />
        );
      case 'approval':
        return (
          <ApprovalNodeForm
            data={node.data}
            onChange={handleDataChange}
          />
        );
      case 'automated':
        return (
          <AutomatedStepNodeForm
            data={node.data}
            onChange={handleDataChange}
          />
        );
      case 'end':
        return (
          <EndNodeForm
            data={node.data}
            onChange={handleDataChange}
          />
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {node.data.type} Node
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Configure properties</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">{renderForm()}</div>
    </div>
  );
};
