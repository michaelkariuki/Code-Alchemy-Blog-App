import * as React from "react";
import "../styles/components/StepFormProgress.scss";
import Container from "react-bootstrap/Container";
import { ProgressBar, Step } from "react-step-progress-bar";

export interface StepFormProgressProps {
  crumbs: string[];
  step: number;
}

const StepFormProgress: React.FC<StepFormProgressProps> = ({
  crumbs,
  step,
}) => {
  return (
    <div className={"stepBlock"}>
    {crumbs.map((crumb, index) => (
      <div className="circleWrapper">
        <div className={`circle ${index <= step ? "selected" : ""}`}>
          {index + 1}
        </div>
        <span>{crumb}</span>
      </div>
    ))}
  </div>
  );
};

export default StepFormProgress;
