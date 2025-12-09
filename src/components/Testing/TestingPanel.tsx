import { useState } from 'react';
import { Node, Edge } from 'reactflow';
import { WorkflowNodeData, SimulationResult } from '../../types/workflow.types';
import { simulateWorkflow } from '../../api/mockApi';
import { validateWorkflow } from '../../utils/validation';
import { Play, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface TestingPanelProps {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
}

export const TestingPanel = ({ nodes, edges }: TestingPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = async () => {
    setIsSimulating(true);
    setResult(null);

    const validationErrors = validateWorkflow(nodes, edges);
    if (validationErrors.some((e) => e.type === 'error')) {
      setResult({
        success: false,
        steps: [],
        errors: validationErrors.map((e) => e.message),
      });
      setIsSimulating(false);
      return;
    }

    try {
      const simulationResult = await simulateWorkflow(nodes, edges);
      setResult(simulationResult);
    } catch (error) {
      setResult({
        success: false,
        steps: [],
        errors: ['Simulation failed: ' + (error as Error).message],
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 font-medium z-50"
      >
        <Play className="w-5 h-5" />
        Test Workflow
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Workflow Testing
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Simulate workflow execution
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!result && !isSimulating && (
                <div className="text-center py-12">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Click "Run Simulation" to test your workflow
                  </p>
                </div>
              )}

              {isSimulating && (
                <div className="text-center py-12">
                  <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-500">Running simulation...</p>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      result.success
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span
                        className={`font-medium ${
                          result.success ? 'text-green-800' : 'text-red-800'
                        }`}
                      >
                        {result.success
                          ? 'Simulation Successful'
                          : 'Simulation Failed'}
                      </span>
                    </div>
                  </div>

                  {result.errors.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-800 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        Errors
                      </h3>
                      {result.errors.map((error, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800"
                        >
                          {error}
                        </div>
                      ))}
                    </div>
                  )}

                  {result.steps.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-800">
                        Execution Steps
                      </h3>
                      <div className="space-y-2">
                        {result.steps.map((step, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-gray-50 border border-gray-200 rounded-md"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium text-gray-500 uppercase">
                                    {step.nodeType}
                                  </span>
                                  <span className="text-sm font-medium text-gray-800">
                                    {step.nodeTitle}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {step.message}
                                </p>
                              </div>
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSimulate}
                disabled={isSimulating || nodes.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSimulating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Simulation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
