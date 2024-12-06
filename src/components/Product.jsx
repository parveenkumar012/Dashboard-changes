import React from "react";
import { Button } from "@/components/ui/button"

export function ProductTracker() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Product Tracker</h2>
      {/* Other Product Tracker Details */}
      <Button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"> Add Product</Button>
    </div>
  );
}
