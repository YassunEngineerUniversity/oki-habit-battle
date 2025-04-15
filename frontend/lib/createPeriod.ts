export const createPeriodISOS = (applyMinutes: number, battleMinutes:number) => {
  const applyStartDate = new Date();
  const applyEndDate = new Date(applyStartDate);
  applyEndDate.setMinutes(applyStartDate.getMinutes() + applyMinutes);;

  const battleStartDate = new Date(applyEndDate);
  const battleEndDate = new Date(battleStartDate);
  battleEndDate.setMinutes(battleStartDate.getMinutes() + battleMinutes);

  return {
    applyStartDate: toISOStringWithTimezone(applyStartDate),
    applyEndDate: toISOStringWithTimezone(applyEndDate),
    battleStartDate: toISOStringWithTimezone(battleStartDate),
    battleEndDate: toISOStringWithTimezone(battleEndDate),
  }
}

const toISOStringWithTimezone = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = zeroPadding((date.getMonth() + 1).toString());
  const day = zeroPadding(date.getDate().toString());

  const hour = zeroPadding(date.getHours().toString());
  const minute = zeroPadding(date.getMinutes().toString());
  const second = zeroPadding(date.getSeconds().toString());

  const localDate = `${year}-${month}-${day}`;
  const localTime = `${hour}:${minute}:${second}`;

  const diffFromUtc = date.getTimezoneOffset();

  // UTCだった場合
  if (diffFromUtc === 0) {
    const tzSign = 'Z';
    return `${localDate}T${localTime}${tzSign}`;
  }

  // UTCではない場合
  const tzSign = diffFromUtc < 0 ? '+' : '-';
  const tzHour = zeroPadding((Math.abs(diffFromUtc) / 60).toString());
  const tzMinute = zeroPadding((Math.abs(diffFromUtc) % 60).toString());

  return `${localDate}T${localTime}${tzSign}${tzHour}:${tzMinute}`;
}

const zeroPadding = (s: string) => {
  return ('0' + s).slice(-2);
}