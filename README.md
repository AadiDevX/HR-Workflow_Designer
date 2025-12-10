# HR Workflow Designer

A visual workflow designer for HR processes built with React, TypeScript, and React Flow. This application allows HR administrators to design, configure, and test workflow processes such as employee onboarding, approvals, and document verification.

## Features

### Core Functionality

- **Visual Workflow Canvas**: Drag-and-drop interface powered by React Flow
- **5 Node Types**:
  - **Start Node**: Workflow entry point with metadata support
  - **Task Node**: Human task assignments with assignee, due date, and custom fields
  - **Approval Node**: Approval steps with role-based approvers and auto-approve thresholds
  - **Automated Step Node**: System-triggered actions (emails, documents, etc.)
  - **End Node**: Workflow completion with summary options

- **Dynamic Node Configuration**: Real-time node editing with type-specific forms
- **Workflow Validation**: Comprehensive validation for structure, connections, and cycles
- **Workflow Testing**: Simulate workflow execution with step-by-step results
- **Mock API Integration**: Simulated backend for automated actions and workflow simulation

### Advanced Features

- **Mini-map**: Visual overview of the entire workflow
- **Zoom Controls**: Pan and zoom for complex workflows
- **Visual Feedback**: Node selection states and connection indicators
- **Real-time Updates**: Instant reflection of configuration changes

## Architecture

### Project Structure

```
project-root/
├── public/                         # Static assets
│   ├── manifest.json              # Web app manifest
│   └── robots.txt                 # SEO robots file
├── src/
│   ├── components/
│   │   ├── Canvas/
│   │   │   ├── WorkflowCanvas.tsx      # Main React Flow canvas
│   │   │   └── NodeSidebar.tsx         # Draggable node palette
│   │   ├── Forms/
│   │   │   ├── NodeConfigPanel.tsx     # Main configuration panel
│   │   │   ├── StartNodeForm.tsx       # Start node form
│   │   │   ├── TaskNodeForm.tsx        # Task node form
│   │   │   ├── ApprovalNodeForm.tsx    # Approval node form
│   │   │   ├── AutomatedStepNodeForm.tsx  # Automated step form
│   │   │   ├── EndNodeForm.tsx         # End node form
│   │   │   └── KeyValueEditor.tsx      # Reusable key-value editor
│   │   ├── Nodes/
│   │   │   └── CustomNode.tsx          # Custom node component
│   │   └── Testing/
│   │       └── TestingPanel.tsx        # Workflow testing UI
│   ├── hooks/
│   │   └── useWorkflow.ts              # Workflow state management hook
│   ├── types/
│   │   └── workflow.types.ts           # TypeScript type definitions
│   ├── api/
│   │   └── mockApi.ts                  # Mock API layer
│   ├── utils/
│   │   └── validation.ts               # Workflow validation logic
│   ├── App.tsx                         # Main application component
│   ├── main.tsx                        # React DOM entry point
│   └── index.css                       # Global styles
├── dist/                           # Built production files
├── package.json                    # Project dependencies
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── index.html                      # HTML entry point
└── README.md                       # This file
```

### Design Decisions

#### 1. Component Architecture

**Modular Design**: Each component has a single responsibility, making the codebase maintainable and extensible.

- **Separation of Concerns**: Canvas logic, form logic, and business logic are separated into distinct modules
- **Reusable Components**: KeyValueEditor is shared across multiple node forms
- **Type Safety**: Strong TypeScript typing throughout the application

#### 2. State Management

**Custom Hook Pattern**: The `useWorkflow` hook encapsulates all workflow state management:

- Nodes and edges state using React Flow's built-in hooks
- Node creation with unique ID generation
- Node data updates with immutable state patterns
- Connection handling

Benefits:
- Clean separation between UI and state logic
- Easy to test and maintain
- Scalable for future enhancements

#### 3. Form System

**Dynamic Form Rendering**: The `NodeConfigPanel` dynamically renders the appropriate form based on node type:

- Type-safe form components for each node type
- Controlled components with immediate updates
- Validation built into form fields

**Extensibility**: Adding new node types requires:
1. Add type to `workflow.types.ts`
2. Create form component in `Forms/`
3. Add case to `NodeConfigPanel`
4. Update node creation logic in `useWorkflow`

#### 4. Validation Strategy

**Multi-Layer Validation**:

1. **Structural Validation**: Ensures start/end nodes exist
2. **Connection Validation**: Checks for disconnected nodes
3. **Cycle Detection**: Uses DFS algorithm to detect cycles
4. **Type-Specific Rules**: Validates node-specific constraints

#### 5. Mock API Design

**Realistic Simulation**: The mock API simulates real backend behavior:

- Async operations with delays
- Graph traversal for workflow execution
- Error handling and validation
- Extensible action system

#### 6. Visual Design

**Clean, Professional UI**:

- Color-coded node types for quick identification
- Clear visual hierarchy
- Responsive layout with fixed panels
- Accessible color contrast ratios

#### 7. Static Assets & Public Folder

**Organization**: Static assets like manifests, robots files, and metadata are organized in the `public/` folder:

- **manifest.json**: Web app manifest for PWA support with app metadata
- **robots.txt**: SEO configuration for search engine crawlers
- These files are automatically copied to the `dist/` folder during build

**Benefits**:
- Keeps static assets separate from source code
- Vite automatically handles asset optimization
- Easy to add favicons, fonts, or other public resources

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type safety and developer experience
- **React Flow**: Powerful flow/diagram library
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Vite**: Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck

# Lint
npm run lint
```

### Usage

1. **Add Nodes**: Drag node types from the left sidebar onto the canvas
2. **Configure Nodes**: Click a node to open the configuration panel on the right
3. **Connect Nodes**: Drag from the bottom handle of a node to the top handle of another
4. **Test Workflow**: Click "Test Workflow" button to simulate execution
5. **Delete Elements**: Select and press Delete/Backspace key

## Key Implementation Details

### Node Types

Each node type has specific data requirements:

**Start Node**:
- Title (required)
- Metadata (key-value pairs)

**Task Node**:
- Title (required)
- Description
- Assignee (email/name)
- Due date
- Custom fields (key-value pairs)

**Approval Node**:
- Title (required)
- Approver role (dropdown)
- Auto-approve threshold (number)

**Automated Step Node**:
- Title (required)
- Action selection (from API)
- Dynamic parameters based on action

**End Node**:
- End message
- Summary flag (boolean)

### Validation Rules

1. Must have at least one Start node
2. Must have at least one End node
3. Start nodes should not have incoming connections
4. End nodes should not have outgoing connections
5. All intermediate nodes must be connected
6. No cycles in the workflow graph

### Simulation Process

1. Validates workflow structure
2. Finds start node
3. Performs breadth-first traversal
4. Simulates each node's execution
5. Detects disconnected nodes
6. Returns step-by-step execution log

## Future Enhancements

### High Priority

- **Undo/Redo**: Command pattern for action history
- **Export/Import**: JSON serialization of workflows
- **Node Templates**: Pre-configured node templates for common patterns
- **Workflow Versioning**: Track and compare workflow versions

### Medium Priority

- **Conditional Branches**: Add conditional logic to workflows
- **Parallel Execution**: Support parallel workflow paths
- **Sub-workflows**: Embed workflows within workflows
- **Role-Based Access**: Control who can edit/view workflows

### Nice to Have

- **Auto-Layout**: Automatic workflow arrangement
- **Workflow Analytics**: Execution time and success rate tracking
- **Real-time Collaboration**: Multiple users editing simultaneously
- **Workflow Templates Library**: Pre-built workflow templates

## Testing Strategy

### Current Testing

- Build verification
- Type checking
- Manual testing of all features

### Recommended Testing

- **Unit Tests**: Test individual components and utilities
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Visual Regression**: Snapshot testing for UI

## Performance Considerations

- React Flow handles large graphs efficiently
- Memoized components prevent unnecessary re-renders
- Lazy loading for forms could be added for very large applications
- State updates are batched by React 18

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Author

Built as a prototype demonstration of React, TypeScript, and React Flow capabilities.

## Acknowledgments

- React Flow team for the excellent library
- Lucide for beautiful icons
- Tailwind CSS for rapid styling
