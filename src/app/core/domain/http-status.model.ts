export type StatusClass = 1 | 2 | 3 | 4 | 5;

export interface HttpStatus {
  code: number;
  name: string;
  description: string;
  whenToUse: string;
  unofficial?: boolean;
}

export interface StatusClassInfo {
  id: StatusClass;
  range: string;
  title: string;
  summary: string;
  analogy: string;
  icon: string;
}
