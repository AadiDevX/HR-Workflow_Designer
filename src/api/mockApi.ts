import { Node, Edge } from 'reactflow';
import {
  AutomationAction,
  SimulationResult,
  SimulationStep,
  WorkflowNodeData,
} from '../types/workflow.types';

const mockAutomations: AutomationAction[] = [
  {
    id: 'send_email',
    label: 'Send Email',
    params: ['to', 'subject'],
  },
  {
    id: 'generate_doc',
    label: 'Generate Document',
    params: ['template', 'recipient'],
  },
  {
    id: 'create_ticket',
    label: 'Create Support Ticket',
    params: ['category', 'priority'],
  },
  {
    id: 'notify_slack',
    label: 'Send Slack Notification',
    params: ['channel', 'message'],
  },
  {
    id: 'update_database',
    label: 'Update Database Record',
    params: ['table', 'recordId'],
  },
];

export const getAutomations = async (): Promise<AutomationAction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAutomations);
    }, 300);
  });
};

export const simulateWorkflow = async (
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): Promise<SimulationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const steps: SimulationStep[] = [];
      const errors: string[] = [];

      const startNode = nodes.find((n) => n.data.type === 'start');
      if (!startNode) {
        errors.push('Workflow must have a Start node');
        resolve({ success: false, steps, errors });
        return;
      }

      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      const edgesBySource = new Map<string, Edge[]>();
      edges.forEach((edge) => {
        const existing = edgesBySource.get(edge.source) || [];
        existing.push(edge);
        edgesBySource.set(edge.source, existing);
      });

      const visited = new Set<string>();
      const queue: string[] = [startNode.id];

      while (queue.length > 0) {
        const currentId = queue.shift()!;
        if (visited.has(currentId)) {
          errors.push(`Cycle detected at node ${currentId}`);
          continue;
        }
        visited.add(currentId);

        const node = nodeMap.get(currentId);
        if (!node) continue;

        const step: SimulationStep = {
          nodeId: node.id,
          nodeType: node.data.type,
          nodeTitle: node.data.label,
          status: 'success',
          message: '',
          timestamp: new Date().toISOString(),
        };

        switch (node.data.type) {
          case 'start':
            step.message = `Workflow started: ${node.data.title}`;
            break;
          case 'task':
            step.message = `Task "${node.data.title}" assigned to ${node.data.assignee}`;
            break;
          case 'approval':
            step.message = `Approval requested from ${node.data.approverRole}`;
            break;
          case 'automated':
            const action = mockAutomations.find(
              (a) => a.id === node.data.actionId
            );
            step.message = action
              ? `Automated action: ${action.label}`
              : 'Unknown automated action';
            break;
          case 'end':
            step.message = `Workflow completed: ${node.data.endMessage}`;
            break;
        }

        steps.push(step);

        const outgoingEdges = edgesBySource.get(currentId) || [];
        outgoingEdges.forEach((edge) => {
          if (!visited.has(edge.target)) {
            queue.push(edge.target);
          }
        });
      }

      const hasEndNode = nodes.some((n) => n.data.type === 'end');
      if (!hasEndNode) {
        errors.push('Workflow must have an End node');
      }

      const disconnectedNodes = nodes.filter(
        (n) => !visited.has(n.id) && n.data.type !== 'start'
      );
      disconnectedNodes.forEach((n) => {
        errors.push(`Node "${n.data.label}" is not connected to the workflow`);
      });

      resolve({
        success: errors.length === 0,
        steps,
        errors,
      });
    }, 800);
  });
};
