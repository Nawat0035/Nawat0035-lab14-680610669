interface Registrant {
  id: number;
  fullName: string;
  gender: string;
  plan: string;
  extras: string[];
  total: number;
}

export type { Registrant };