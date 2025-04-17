interface BattleItem {
  id: number;
  title: string;
  detail: string;
  image: string;
  level: string;
  status: string;
  participants: BattleItemParticipants[];
}

interface BattleItemParticipants {
  user_id: number;
  name: string;
  avatar: string;
}

interface BattleCategory {
  id: number;
  name: string;
}

interface HomeBattleResponse {
  active_battles: Battle[];
  waiting_battles: Battle[];
}

export interface Battle {
  id: number;
  title: string;
  detail: string;
  image: string;
  level: string;
  status: string;
  created_at: string;
  updated_at: string;
  host_user_id: number;
  participants: {
    user_id: number;
    name: string;
    avatar: string;
  }[];
  categories: BattleCategory[];
}


export interface BattleDetail {
  id: number;
  title: string;
  detail: string;
  apply_start_date: string;
  apply_end_date: string;
  battle_start_date: string;
  battle_end_date: string;
  per_reword: number;
  per_bonus: number;
  level: string;
  image: string;
  achievement_rate: number;
  total_hp: number;
  host_user_id: number;
  created_at: string;
  updated_at: string;
  isFavorite: boolean;
  participant_limit: number;
  participants: {
    user_id: number;
    name: string;
    avatar: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
}

interface Pagination {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

export interface SearchResultBattleList {
  battles: Battle[];
  pagination: Pagination
}

export interface BattleCreateState {
  title: string | undefined;
  image?: string | undefined;
  category: string | undefined;
  errors?: {
    title?: string[] | undefined;
    image?: string[] | undefined;
    category?: string[] | undefined;
  };
  message?: string;
  success?: boolean;
}

export interface BattleValues {
  title: string;
  categories: BattleCreateCategory[];
  backgroundImage: File;
  participants: string;
  applyPeriod: string;
  battlePeriod: string;
  achievementRate: "0" | "50" | "60" | "70" | "80" | "90" | "100";
  detail: string;
}

interface BattleCreateCategory{
  name: string;
}

