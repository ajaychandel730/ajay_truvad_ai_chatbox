

export type AIChatMessage =
  | {
      id: string;
      created_by: "user";
      text: string;
      created_at:string;
    }
  | {
      id: string;
      created_by: "ai";
      jurisdiction: string;
      regulator: string;
      risk_level: string;
      effective_date: string;
      grace_period_deadline: string;
      status: string;
      timeline_notes: string;
      citations: string;
      created_at:string;
    };
