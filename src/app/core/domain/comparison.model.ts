export interface ComparisonSide {
  code: number;
  label: string;
  text: string;
}

export interface Comparison {
  id: string;
  question: string;
  left: ComparisonSide;
  right: ComparisonSide;
  rule: string;
}
