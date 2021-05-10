import DatePicker from 'react-datepicker';
import { styled } from 'twin.macro';

const StDatePicker = styled(DatePicker)`
  .react-datepicker {
    font-size: 0.8em;
    border-radius: 0.3em;
  }
  .react-datepicker--time-only .react-datepicker__time,
  .react-datepicker--time-only .react-datepicker__time-box {
    border-bottom-left-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
  }
  .react-datepicker__header {
    border-top-left-radius: 0.3em;
  }
  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    border-top-right-radius: 0.3em;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    font-size: 0.944em;
  }
  .react-datepicker__navigation {
    line-height: 1.7em;
    border: 0.45em solid transparent;
  }
  .react-datepicker__year {
    margin: 0.4em;
  }
  .react-datepicker__year .react-datepicker__year-text {
    width: 4em;
  }
  .react-datepicker__month {
    margin: 0.4em;
  }
  .react-datepicker__month .react-datepicker__month-text,
  .react-datepicker__month .react-datepicker__quarter-text {
    width: 4em;
  }
  .react-datepicker__time-container--with-today-button {
    border-radius: 0.3em;
  }
  .react-datepicker__time-container .react-datepicker__time {
    border-bottom-right-radius: 0.3em;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    border-bottom-right-radius: 0.3em;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
    height: calc(195px + (1.7em / 2));
  }
  .react-datepicker__week-number {
    width: 1.7em;
    line-height: 1.7em;
    margin: 0.166em;
  }
  .react-datepicker__week-number.react-datepicker__week-number--clickable:hover {
    border-radius: 0.3em;
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 1.7em;
    line-height: 1.7em;
    margin: 0.166em;
  }
  .react-datepicker__month--selected,
  .react-datepicker__month--in-selecting-range,
  .react-datepicker__month--in-range,
  .react-datepicker__quarter--selected,
  .react-datepicker__quarter--in-selecting-range,
  .react-datepicker__quarter--in-range {
    border-radius: 0.3em;
  }
  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover {
    border-radius: 0.3em;
  }

  .react-datepicker__day--highlighted,
  .react-datepicker__month-text--highlighted,
  .react-datepicker__quarter-text--highlighted,
  .react-datepicker__year-text--highlighted {
    border-radius: 0.3em;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    border-radius: 0.3em;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    border-radius: 0.3em;
  }
  .react-datepicker__year-read-view,
  .react-datepicker__month-read-view,
  .react-datepicker__month-year-read-view {
    border-radius: 0.3em;
  }
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    border-width: 0.45em;
  }

  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown,
  .react-datepicker__month-year-dropdown {
    border-radius: 0.3em;
  }

  .react-datepicker__year-option:first-of-type,
  .react-datepicker__month-option:first-of-type,
  .react-datepicker__month-year-option:first-of-type {
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
  }
  .react-datepicker__year-option:last-of-type,
  .react-datepicker__month-option:last-of-type,
  .react-datepicker__month-year-option:last-of-type {
    border-bottom-left-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
  }
  .react-datepicker__portal .react-datepicker__day-name,
  .react-datepicker__portal .react-datepicker__day,
  .react-datepicker__portal .react-datepicker__time-name {
    width: 3em;
    line-height: 3em;
  }
  @media (max-width: 400px), (max-height: 550px) {
    .react-datepicker__portal .react-datepicker__day-name,
    .react-datepicker__portal .react-datepicker__day,
    .react-datepicker__portal .react-datepicker__time-name {
      width: 2em;
      line-height: 2em;
    }
  }

  .react-datepicker__portal .react-datepicker__current-month,
  .react-datepicker__portal .react-datepicker-time__header {
    font-size: 1.44em;
  }

  .react-datepicker__portal .react-datepicker__navigation {
    border: 0.81em solid transparent;
  }
`;

export default StDatePicker;
