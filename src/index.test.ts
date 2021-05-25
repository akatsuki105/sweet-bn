import { BigNumber } from 'bignumber.js';
import { bna, bnl } from './';

const arithCases: [BigNumber, BigNumber][] = [
  [bna`1.1`, new BigNumber(1.1)],
  [bna`${1.1} + ${2.2}`, new BigNumber(3.3)],
  [bna`1.1 + ${2.2}`, new BigNumber(3.3)],
  [bna`${1.1} + 2.2`, new BigNumber(3.3)],
  [bna`${new BigNumber('1.1')} + ${2.2}`, new BigNumber(3.3)],
  [bna`${1.1}+ ${2.2}`, new BigNumber(3.3)],
  [bna`${1.1}+${2.2}`, new BigNumber(3.3)],
  [bna`${1.1} * ${2.2}`, new BigNumber(1.1).times(new BigNumber(2.2))],
  [bna`${1.1} + ${2.2} * ${3.3}`, new BigNumber(1.1).plus(new BigNumber(2.2).times(3.3))],
  [bna`${1.1} - ${2.2} * ${3.3}`, new BigNumber(1.1).minus(new BigNumber(2.2).times(3.3))],
  [bna`${1.1} / ${2.2} * ${3.3}`, new BigNumber(1.1).dividedBy(2.2).times(3.3)],
  [bna`(${1.1} + ${2.2}) * ${3.3}`, new BigNumber(1.1).plus(2.2).times(3.3)],
  [bna`${new BigNumber(2)} ** 3`, new BigNumber(8)],
];

console.log('Arithmetic operation');
arithCases.forEach((testcase, i) => {
  const actual = testcase[0];
  const expected = testcase[1];
  const result = actual.isEqualTo(expected)
    ? 'OK'
    : `FAIL(acutal=${actual.toString(10)}, expected=${expected.toString(10)})`;
  console.log(`Case ${i}: ${result}`);
});

const logicCases: [boolean, boolean][] = [
  [bnl`1.1 == ${new BigNumber(1.1)}`, true],
  [bnl`1.1 == ${new BigNumber(1.2)}`, false],
  [bnl`1.1 + 2.2 == ${new BigNumber(3.3)}`, true],
  [bnl`1.1 + 2.2 > ${new BigNumber(3.2)}`, true],
  [bnl`1.1 + 2.2 < ${new BigNumber(3.2)}`, false],
];

console.log('-----------------\nLogical operation');
logicCases.forEach((testcase, i) => {
  const actual = testcase[0];
  const expected = testcase[1];
  const result =
    actual === expected ? 'OK' : `FAIL(acutal=${String(actual)}, expected=${String(expected)})`;
  console.log(`Case ${i}: ${result}`);
});
