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
