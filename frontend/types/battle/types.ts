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

interface Category {
  id: number;
  name: string;
}

interface HomeBattleResponse {
  active_battles: Battle[];
  waiting_battles: Battle[];
}

interface Battle {
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
  categories: Category[];
}


interface BattleDetail {
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
  achievement_rate: number;
  total_hp: number;
  host_user_id: number;
  created_at: string;
  updated_at: string;
  isFavorite: boolean;
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

interface SearchResultBattleList {
  battles: Battle[];
  pagination: Pagination
}

