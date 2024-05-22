import * as moment from 'moment';

export const convertKalibrrDate = (postedDateRaw: string) => {
  const postedDate = postedDateRaw.split(' ');
  let numOfDay = 0;
  let timeUnit = '';

  if (postedDate.length != 6) {
    throw new Error('Kalibr posted date provided is not in the right format');
  }

  if (postedDate[3] == 'a' || postedDate[3] == 'an') {
    numOfDay = 1;
  } else {
    numOfDay = Number.parseInt(postedDate[3]);
  }
  timeUnit = postedDate[4];

  const date = moment(moment.now())
    .subtract(numOfDay, timeUnit as moment.unitOfTime.DurationConstructor)
    .toDate();

  return date;
};
