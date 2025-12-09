import { useCallback } from 'react';
import {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  OnNodesChange,
  OnEdgesChange,
} from 'reactflow';
import { WorkflowNodeData, NodeType } from '../types/workflow.types';

let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

export const useWorkflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const createNodeData = (type: NodeType): WorkflowNodeData => {
    switch (type) {
      case 'start':
        return {
          type: 'start',
          label: 'Start',
          title: 'New Workflow',
          metadata: [],
        };
      case 'task':
        return {
          type: 'task',
          label: 'Task',
          title: 'New Task',
          description: '',
          assignee: '',
          dueDate: '',
          customFields: [],
        };
      case 'approval':
        return {
          type: 'approval',
          label: 'Approval',
          title: 'New Approval',
          approverRole: '',
          autoApproveThreshold: 0,
        };
      case 'automated':
        return {
          type: 'automated',
          label: 'Automated Step',
          title: 'New Automated Step',
          actionId: '',
          actionParams: {},
        };
      case 'end':
        return {
          type: 'end',
          label: 'End',
          endMessage: 'Workflow completed successfully',
          summaryFlag: false,
        };
    }
  };

  const addNode = useCallback(
    (type: NodeType, position: { x: number; y: number }) => {
      const newNode: Node<WorkflowNodeData> = {
        id: getNodeId(),
        type: 'custom',
        position,
        data: createNodeData(type),
      };
      setNodes((nds) => [...nds, newNode]);
      return newNode.id;
    },
    [setNodes]
  );

  const updateNodeData = useCallback(
    (nodeId: string, data: WorkflowNodeData) => {
      setNodes((nds) =>
        nds.map((node) => (node.id === nodeId ? { ...node, data } : node))
      );
    },
    [setNodes]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return {
    nodes,
    edges,
    onNodesChange: onNodesChange as OnNodesChange,
    onEdgesChange: onEdgesChange as OnEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
  };
};
