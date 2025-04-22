'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

const TabBattleList = () => {
  const router = useRouter();

  const handleTabClick = (type: string) => {
    switch (type) {
      case 'data':
        router.push('/battles/history');
        break;
      case 'list':
        router.push('/battles/history?tab=list');
        break;
      default:
        break;
    }
  };
  return (
    <TabsList className="w-full grid grid-cols-2 bg-white">
      <TabsTrigger value="data" className="pb-3 custom-tab cursor-pointer" onClick={() => handleTabClick('data')}>
        データ
      </TabsTrigger>
      <TabsTrigger value="list" className="pb-3 custom-tab cursor-pointer" onClick={() => handleTabClick('list')}>
        一覧
      </TabsTrigger>
    </TabsList>
  );
};

export default TabBattleList;
