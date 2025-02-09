var ENDS_WITH_DOUBLE_ZERO_PATTERN = /(hundred|thousand|(m|b|tr|quadr)illion)$/;
var ENDS_WITH_TEEN_PATTERN = /teen$/;
var ENDS_WITH_Y_PATTERN = /y$/;
var ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN = /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/;
var ordinalLessThanThirteen = {
    zero: 'zeroth',
    one: 'first',
    two: 'second',
    three: 'third',
    four: 'fourth',
    five: 'fifth',
    six: 'sixth',
    seven: 'seventh',
    eight: 'eighth',
    nine: 'ninth',
    ten: 'tenth',
    eleven: 'eleventh',
    twelve: 'twelfth'
};
var TEN = 10;
var ONE_HUNDRED = 100;
var ONE_THOUSAND = 1000;
var ONE_MILLION = 1000000;
var ONE_BILLION = 1000000000;           //         1.000.000.000 (9)
var ONE_TRILLION = 1000000000000;       //     1.000.000.000.000 (12)
var ONE_QUADRILLION = 1000000000000000; // 1.000.000.000.000.000 (15)
var MAX = 9007199254740992;             // 9.007.199.254.740.992 (15)
var LESS_THAN_TWENTY = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

var TENTHS_LESS_THAN_HUNDRED = [
  'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

export function toWordsReal(number, asArray) {
  var words;
  var num = parseInt(number, 10);
  words = generateWords(num);

  return asArray ? words : words.join(' ').replace(/,$/, '');
}

function generateWords(number) {
  var remainder, word,
      words = arguments[1];

  // We’re done
  if (number === 0) {
      return !words ? 'zero' : words;
  }
  // First run
  if (!words) {
      words = [];
  }
  // If negative, prepend “minus”
  if (number < 0) {
      words.push('minus');
      number = Math.abs(number);
  }

  if (number < 20) {
      remainder = 0;
      word = LESS_THAN_TWENTY[number];

  } else if (number < ONE_HUNDRED) {
      remainder = number % TEN;
      word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
      // In case of remainder, we need to handle it here to be able to add the “-”
      if (remainder) {
          word += '-' + LESS_THAN_TWENTY[remainder];
          remainder = 0;
      }

  } else if (number < ONE_THOUSAND) {
      remainder = number % ONE_HUNDRED;
      word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';

  } else if (number < ONE_MILLION) {
      remainder = number % ONE_THOUSAND;
      word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand,';

  } else if (number < ONE_BILLION) {
      remainder = number % ONE_MILLION;
      word = generateWords(Math.floor(number / ONE_MILLION)) + ' million,';

  } else if (number < ONE_TRILLION) {
      remainder = number % ONE_BILLION;
      word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion,';

  } else if (number < ONE_QUADRILLION) {
      remainder = number % ONE_TRILLION;
      word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion,';

  } else if (number <= MAX) {
      remainder = number % ONE_QUADRILLION;
      word = generateWords(Math.floor(number / ONE_QUADRILLION)) +
      ' quadrillion,';
  }

  words.push(word);

  return generateWords(remainder, words);
}
