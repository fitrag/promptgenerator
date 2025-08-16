
export interface PromptParts {
  subject: string;
  action: string;
  setting: string;
  style: string;
  lighting: string;
  color: string;
  composition: string;
}

export type PromptCategory = keyof PromptParts;
