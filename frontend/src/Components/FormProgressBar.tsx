import * as React from "react";

import "../styles/components/FormProgressBarProps.scss";

export interface FormProgressBarProps {
  crumbs: string[];
  step: number;
}

const FormProgressBar: React.FC<FormProgressBarProps> = ({ crumbs, step }) => {
  return (
    
    <ol id="progress-bar">
      {crumbs.map((crumbName, index) => (
        <li key={crumbName} className={`${index + 1 <= step ? "active" : ""}`}>
          <span>{crumbName}</span>
        </li>
      ))}
    </ol>

  );
};

export default FormProgressBar;
