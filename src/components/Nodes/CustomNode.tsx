import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { WorkflowNodeData } from '../../types/workflow.types';
import {
  PlayCircle,
  CheckCircle,
  ClipboardList,
  Zap,
  StopCircle,
} from 'lucide-react';

const nodeIcons = {
  start: PlayCircle,
  task: ClipboardList,
  approval: CheckCircle,
  automated: Zap,
  end: StopCircle,
};

const nodeColors = {
  start: 'bg-emerald-50 border-emerald-300',
  task: 'bg-blue-50 border-blue-300',
  approval: 'bg-amber-50 border-amber-300',
  automated: 'bg-purple-50 border-purple-300',
  end: 'bg-rose-50 border-rose-300',
};

const iconColors = {
  start: 'text-emerald-600',
  task: 'text-blue-600',
  approval: 'text-amber-600',
  automated: 'text-purple-600',
  end: 'text-rose-600',
};

export const CustomNode = memo(({ data, selected }: NodeProps<WorkflowNodeData>) => {
  const Icon = nodeIcons[data.type];
  const colorClass = nodeColors[data.type];
  const iconColor = iconColors[data.type];

  return (
    <div
      className={`px-4 py-3 shadow-md rounded-lg border-2 ${colorClass} ${
        selected ? 'ring-2 ring-offset-1 ring-blue-500' : ''
      } min-w-[180px] transition-all`}
    >
      {data.type !== 'start' && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 !bg-gray-400"
        />
      )}

      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {data.type}
          </div>
          <div className="text-sm font-semibold text-gray-800 mt-0.5">
            {data.label}
          </div>
        </div>
      </div>

      {data.type !== 'end' && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 !bg-gray-400"
        />
      )}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
