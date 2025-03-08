export interface IQuestion {
  text: string;
  summary: string;
  difficulty: string;
  category: string;
  country: string;
  ctc: string;
  companyName: string;
  yoe: string;
  role: string;
}

export interface IBucket {
  [ip_route: string]: {
    tokens: number;
  };
}
