export interface Citation {
  title: string;
  url: string;
}

export interface BotUserMessage {
  id: string;
  created_by: "user";
  text: string;
  created_at: string;
}

export interface BotAiMessage {
  id: string;
  created_by: "ai";
  summary: string;
  changes: string[];
  effective_date: string;
  impacted_teams: string[];
  actions: string[];
  status: "effective" | "upcoming" | "expired" | "unknown";
  citations: Citation[];
}

export interface BotErrorMessage {
  id: string;
  label:"error";
  text: string;
}
