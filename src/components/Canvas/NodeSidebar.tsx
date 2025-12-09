import {
  PlayCircle,
  ClipboardList,
  CheckCircle,
  Zap,
  StopCircle,
} from 'lucide-react';
import { NodeType } from '../../types/workflow.types';

interface NodeTemplate {
  type: NodeType;
  label: string;
  icon: typeof PlayCircle;
  description: string;
}

const nodeTemplates: NodeTemplate[] = [
  {
    type: 'start',
    label: 'Start',
    icon: PlayCircle,
    description: 'Workflow entry point',
  },
  {
    type: 'task',
    label: 'Task',
    icon: ClipboardList,
    description: 'Human task assignment',
  },
  {
    type: 'approval',
    label: 'Approval',
    icon: CheckCircle,
    description: 'Approval step',
  },
  {
    type: 'automated',
    label: 'Automated',
    icon: Zap,
    description: 'System action',
  },
  {
    type: 'end',
    label: 'End',
    icon: StopCircle,
    description: 'Workflow completion',
  },
];

export const NodeSidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Workflow Nodes</h2>
        <p className="text-xs text-gray-500 mt-1">Drag to canvas</p>
      </div>

      <div className="space-y-2">
        {nodeTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.type}
              draggable
              onDragStart={(e) => onDragStart(e, template.type)}
              className="p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-move hover:bg-gray-100 hover:border-gray-300 transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">{template.label}</span>
              </div>
              <p className="text-xs text-gray-500">{template.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
