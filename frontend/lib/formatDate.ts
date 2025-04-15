export const formatDate = (date: string) => {
  const convertDate = new Date(date);
  const year = convertDate.getFullYear();
  const month = convertDate.getMonth() + 1;
  const day = convertDate.getDate();
  return `${year}年${month}月${day}日`;
};

export const formatDateTime = (date: string) => {
  const convertDate = new Date(date);
  const year = convertDate.getFullYear();
  const month = convertDate.getMonth() + 1; // 月は0始まりのため+1
  const day = convertDate.getDate();
  const hours = convertDate.getHours();
  const minutes = convertDate.getMinutes();

  return `${year}年${month}月${day}日 ${hours}時${minutes}分`;
};

export const formatPeriod = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  const diffDays = diff / (1000 * 60 * 60 * 24);

  return `${diffDays}日`;
}

export const formatPeriodWithTime = (minutes: number) => {
  const currentDate = new Date();
  const date = new Date(currentDate);
  if (minutes > 0) {
    date.setMinutes(date.getMinutes() + minutes);
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const hour = date.getHours().toString();
  const minute = date.getMinutes().toString().padStart(2, '0'); 

  return `${year}年${month}月${day}日${hour}:${minute}`;
};