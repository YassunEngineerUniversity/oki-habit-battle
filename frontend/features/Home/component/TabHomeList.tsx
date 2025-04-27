'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

const TabHomeList = () => {
  const router = useRouter();

  const handleTabClick = (type: string) => {
    switch (type) {
      case 'todayTasks':
        router.push('/');
        break;
      case 'activeBattles':
        router.push('/?tab=activeBattles');
        break;
      case 'waitingBattles':
        router.push('/?tab=waitingBattles');
        break;
      default:
        break;
    }
  };
  return (
    <TabsList className="w-full grid grid-cols-3 bg-white">
      <TabsTrigger value="todayTasks" className="pb-3 custom-tab cursor-pointer" onClick={() => handleTabClick('todayTasks')}>
        本日のタスク
      </TabsTrigger>
      <TabsTrigger value="activeBattles" className="pb-3 custom-tab cursor-pointer" onClick={() => handleTabClick('activeBattles')}>
        対戦中
      </TabsTrigger>
      <TabsTrigger value="waitingBattles" className="pb-3 custom-tab cursor-pointer" onClick={() => handleTabClick('waitingBattles')}>
        対戦待ち
      </TabsTrigger>
    </TabsList>
  );
};

export default TabHomeList;
