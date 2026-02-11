import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// PrimeReact styles (REQUIRED)
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function PrimeTable(){
     // Sample data
  const data = [
    { id: 1, name: "Company A", status: "Active" },
    { id: 2, name: "Company B", status: "Inactive" },
    { id: 3, name: "Company C", status: "Pending" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h2>PrimeReact Table Demo</h2>

      
    </div>
  );
}