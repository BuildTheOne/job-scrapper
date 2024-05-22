import * as moment from 'moment';
import 'moment/locale/id';

moment.locale('id');
export const convertKarirDate = (postedDateRaw: string) => {
  const postedDate = postedDateRaw.split(' ');

  if (postedDate.length != 3) {
    throw new Error('Karir posted date provided is not in the right format');
  }

  const date = moment(postedDateRaw, 'DD MMMM YYYY').add(7, 'hour').toDate();

  if (moment(date).isBefore(moment(moment.now()).subtract(2, 'month'))) {
    throw new Error('Job posted date exceeds maximum value allowed');
  }

  return date;
};
