import { ComponentType } from "react";
import { StepContentProps } from "./StepContentProps";

export interface StepDefinition {
    title: string;
    content: ComponentType<StepContentProps>;
    nextButton?: string;
}
