interface BattleItem {
  id: number;
  title: string;
  detail: string;
  image: string;
  level: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  host_user_id?: number;
  participants: BattleItemParticipants[];
}


interface BattleItemParticipants {
  user_id: number;
  name: string;
  avatar: string;
}