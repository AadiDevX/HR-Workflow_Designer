import { useState } from 'react';
import { Node } from 'reactflow';
import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
import { NodeSidebar } from './components/Canvas/NodeSidebar';
import { NodeConfigPanel } from './components/Forms/NodeConfigPanel';
import { TestingPanel } from './components/Testing/TestingPanel';
import { useWorkflow } from './hooks/useWorkflow';
import { WorkflowNodeData } from './types/workflow.types';
import { Workflow } from 'lucide-react';

function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
  } = useWorkflow();

  const [selectedNode, setSelectedNode] = useState<Node<WorkflowNodeData> | null>(
    null
  );

  const handleNodeClick = (node: Node<WorkflowNodeData>) => {
    setSelectedNode(node);
  };

  const handleUpdateNode = (nodeId: string, data: WorkflowNodeData) => {
    updateNodeData(nodeId, data);
    setSelectedNode((prev) =>
      prev && prev.id === nodeId ? { ...prev, data } : prev
    );
  };

  const handleClosePanel = () => {
    setSelectedNode(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Workflow className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              HR Workflow Designer
            </h1>
            <p className="text-sm text-gray-500">
              Design and test your HR workflows
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {nodes.length} nodes • {edges.length} connections
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <NodeSidebar />
        <WorkflowCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onAddNode={addNode}
        />
        <NodeConfigPanel
          node={selectedNode}
          onUpdate={handleUpdateNode}
          onClose={handleClosePanel}
        />
      </div>

      <TestingPanel nodes={nodes} edges={edges} />
    </div>
  );
}

export default App;
