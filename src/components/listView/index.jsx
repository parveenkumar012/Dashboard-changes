import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table } from "@/components/ui/table"
import { BoxIcon } from 'lucide-react';

const WorkflowApp = () => {
  const [view, setView] = useState("list_view_2"); // Default view
  const [workflows, setWorkflows] = useState([
    {
      id: "1",
      name: "NPD Workflow: Oct24",
      status: "Sampling",
      products: ["T-Shirt-Cream", "T-Shirt-Red", "T-Shirt-Blue"],
      uuid: '141D-96475-8531',
      team: ["PM", "SA", "EG"],
      completion_date: "2024-10-25",
    },{
        id: "2",
        name: "NPD Workflow: Oct24",
        status: "Sampling",
        products: ["T-Shirt-Cream", "T-Shirt-Blue"],
        uuid: '141D-96475-8531',
        team: ["PM", "EG"],
        completion_date: "2024-10-25",
    },{
        id: "3",
        name: "NPD Workflow: Oct24",
        status: "Kickoff",
        uuid: '141D-96475-8531',
        products: ["T-Shirt-Cream", "T-Shirt-Red"],
        team: ["PM", "SA"],
        completion_date: "2024-10-25",
    },{
        id: "4",
        name: "NPD Workflow: Oct24",
        status: "Kickoff",
        uuid: '141D-96475-8531',
        products: ["T-Shirt-Red", "T-Shirt-Blue"],
        team: ["SA", "EG"],
        completion_date: "2024-10-25",
    }
    // Add more workflow objects or keep empty for testing list_view_1
  ]);

  // Switch Views Based on Data and User Input
  const renderView = () => {
    if (workflows.length === 0) {
      return <NoWorkflows />;
    }
    if (view === "list_view_2") {
      return <ListView2 workflows={workflows} />;
    }
    if (view === "list_view_3") {
      return <ListView3 workflows={workflows} />;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Workflows</h1>
        <Button onClick={() => setView(view === "list_view_2" ? "list_view_3" : "list_view_2")}>
          Toggle View
        </Button>
      </div>
      {renderView()}
    </div>
  );
};

// View 1: No Workflows Found
const NoWorkflows = () => (
  <Card className="flex items-center justify-center h-64">
    <div className="text-center">
      <BoxIcon name="box" size={48} />
      <h2 className="text-lg font-semibold">No workflows found</h2>
      <p>Available workflows will appear here.</p>
    </div>
  </Card>
);

// View 2: Table View
const ListView2 = ({ workflows }) => (
  <Table>
    <thead>
      <tr>
        <th>Workflow Name</th>
        <th>Workflow Id</th>
        <th>Products</th>
        <th>Workflow Teams</th>
        <th>Completion Date</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {workflows.map((workflow) => (
        <tr key={workflow.id}>
          <td>{workflow.name}</td>
          <td>{workflow.uuid}</td>
          <td>{workflow.products.join(", ")}</td>
          <td>{workflow.status}</td>
          <td>{workflow.completion_date}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

// View 3: Card View
const ListView3 = ({ workflows }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {workflows.map((workflow) => (
      <Card key={workflow.id}>
        <h3 className="text-lg font-bold">{workflow.name}</h3>
        <p>Products: {workflow.products.join(", ")}</p>
        <p>Status: {workflow.status}</p>
        <p>Completion Date: {workflow.completion_date}</p>
      </Card>
    ))}
  </div>
);

export default WorkflowApp;
