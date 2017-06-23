import moment from 'moment';

/**
 *
 * @param date | timestamp
 * @returns {[timestamp,timestamp,timestamp,timestamp,timestamp]}
 */
export const daysOfTheWeek = (date) => {
  const today = date ? moment.unix(date) : moment.utc().set({'millisecond': 0, 'second': 0, 'minute': 0, 'hour': 0});

  return [
    today.clone().isoWeekday(1).unix(),
    today.clone().isoWeekday(2).unix(),
    today.clone().isoWeekday(3).unix(),
    today.clone().isoWeekday(4).unix(),
    today.clone().isoWeekday(5).unix(),

    // today.clone().isoWeekday(1 + 7).toISOString(),
    // today.clone().isoWeekday(2 + 7).toISOString(),
    // today.clone().isoWeekday(3 + 7).toISOString(),
    // today.clone().isoWeekday(4 + 7).toISOString(),
    // today.clone().isoWeekday(5 + 7).toISOString(),
  ]
};
