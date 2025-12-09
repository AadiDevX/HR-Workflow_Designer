import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from '../Nodes/CustomNode';
import { NodeType, WorkflowNodeData } from '../../types/workflow.types';

const nodeTypes = {
  custom: CustomNode,
};

interface WorkflowCanvasProps {
  nodes: Node<WorkflowNodeData>[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  onNodeClick: (node: Node<WorkflowNodeData>) => void;
  onAddNode: (type: NodeType, position: { x: number; y: number }) => void;
}

const WorkflowCanvasInner = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onAddNode,
}: WorkflowCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      onAddNode(type, position);
    },
    [reactFlowInstance, onAddNode]
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onNodeClick(node as Node<WorkflowNodeData>);
    },
    [onNodeClick]
  );

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#e5e7eb" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const nodeData = node.data as WorkflowNodeData;
            switch (nodeData.type) {
              case 'start':
                return '#10b981';
              case 'task':
                return '#3b82f6';
              case 'approval':
                return '#f59e0b';
              case 'automated':
                return '#a855f7';
              case 'end':
                return '#f43f5e';
              default:
                return '#6b7280';
            }
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
};

export const WorkflowCanvas = (props: WorkflowCanvasProps) => {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner {...props} />
    </ReactFlowProvider>
  );
};
