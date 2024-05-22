import * as moment from 'moment';

export const convertLinkedinDate = (postedDateRaw: string) => {
  const postedDate = postedDateRaw.split(' ');
  let numOfDay = 0;
  let timeUnit = '';

  if (postedDate.length != 3) {
    throw new Error('Linkedin posted date provided is not in the right format');
  }

  if (postedDate[0] == 'a' || postedDate[0] == 'an') {
    numOfDay = 1;
  } else {
    numOfDay = Number.parseInt(postedDate[0]);
  }
  timeUnit = postedDate[1];

  const date = moment(moment.now())
    .subtract(numOfDay, timeUnit as moment.unitOfTime.DurationConstructor)
    .toDate();

  return date;
};
