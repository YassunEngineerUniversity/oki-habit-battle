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