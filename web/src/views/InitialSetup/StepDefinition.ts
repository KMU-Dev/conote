import { ComponentType } from "react";
import { StepContentProps } from "./StepContentProps";

export interface StepDefinition<T extends StepContentProps> {
    title: string;
    content: ComponentType<T>;
    nextButton?: string;
}
