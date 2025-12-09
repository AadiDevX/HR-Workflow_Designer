import { Node, Edge } from 'reactflow';
import { ValidationError, WorkflowNodeData } from '../types/workflow.types';

export const validateWorkflow = (
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const startNodes = nodes.filter((n) => n.data.type === 'start');
  if (startNodes.length === 0) {
    errors.push({
      message: 'Workflow must have at least one Start node',
      type: 'error',
    });
  } else if (startNodes.length > 1) {
    errors.push({
      message: 'Workflow should have only one Start node',
      type: 'warning',
    });
  }

  const endNodes = nodes.filter((n) => n.data.type === 'end');
  if (endNodes.length === 0) {
    errors.push({
      message: 'Workflow must have at least one End node',
      type: 'error',
    });
  }

  nodes.forEach((node) => {
    const incomingEdges = edges.filter((e) => e.target === node.id);
    const outgoingEdges = edges.filter((e) => e.source === node.id);

    if (node.data.type === 'start' && incomingEdges.length > 0) {
      errors.push({
        nodeId: node.id,
        message: `Start node "${node.data.label}" should not have incoming connections`,
        type: 'warning',
      });
    }

    if (node.data.type === 'end' && outgoingEdges.length > 0) {
      errors.push({
        nodeId: node.id,
        message: `End node "${node.data.label}" should not have outgoing connections`,
        type: 'warning',
      });
    }

    if (
      node.data.type !== 'start' &&
      node.data.type !== 'end' &&
      incomingEdges.length === 0
    ) {
      errors.push({
        nodeId: node.id,
        message: `Node "${node.data.label}" is not connected to any input`,
        type: 'error',
      });
    }

    if (node.data.type !== 'end' && outgoingEdges.length === 0) {
      errors.push({
        nodeId: node.id,
        message: `Node "${node.data.label}" is not connected to any output`,
        type: 'error',
      });
    }
  });

  const hasCycles = detectCycles(nodes, edges);
  if (hasCycles) {
    errors.push({
      message: 'Workflow contains cycles which may cause infinite loops',
      type: 'error',
    });
  }

  return errors;
};

const detectCycles = (nodes: Node[], edges: Edge[]): boolean => {
  const adjList = new Map<string, string[]>();
  nodes.forEach((node) => adjList.set(node.id, []));
  edges.forEach((edge) => {
    const neighbors = adjList.get(edge.source) || [];
    neighbors.push(edge.target);
    adjList.set(edge.source, neighbors);
  });

  const visited = new Set<string>();
  const recStack = new Set<string>();

  const hasCycleDFS = (nodeId: string): boolean => {
    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = adjList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycleDFS(neighbor)) {
          return true;
        }
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (hasCycleDFS(node.id)) {
        return true;
      }
    }
  }

  return false;
};
