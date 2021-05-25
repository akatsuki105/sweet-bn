import generate from '@babel/generator';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { BinaryExpression, isBinaryExpression } from '@babel/types';
import { BigNumber } from 'bignumber.js';

type BN = number | string | BigNumber;

const isBinExpr = isBinaryExpression;

const stringifyBinExpr = (n: BinaryExpression): string => {
  const left = isBinExpr(n.left) ? stringifyBinExpr(n.left) : toBN(generate(n.left).code);
  const right = isBinExpr(n.right) ? stringifyBinExpr(n.right) : toBN(generate(n.right).code);

  switch (n.operator) {
    case '+': {
      return `(${left}.plus(${right}))`;
    }
    case '-': {
      return `(${left}.minus(${right}))`;
    }
    case '*': {
      return `(${left}.times(${right}))`;
    }
    case '/': {
      return `(${left}.dividedBy(${right}))`;
    }
    case '<': {
      return `(${left}.lt(${right}))`;
    }
    case '<=': {
      return `(${left}.lte(${right}))`;
    }
    case '>': {
      return `(${left}.gt(${right}))`;
    }
    case '>=': {
      return `(${left}.gte(${right}))`;
    }
    case '==': {
      return `(${left}.eq(${right}))`;
    }
    case '**': {
      return `(${left}.pow(${right}))`;
    }
  }

  return '';
};

const bn = (str: TemplateStringsArray, ...vals: BN[]): any => {
  if (!vals.length) {
    return new BigNumber(eval(str.raw[0]));
  }

  // `1.1 + ${2.2}` -> `new BigNumber(1.1) + new BigNumber(2.2)`
  let source = '';
  for (let i = 0; i < vals.length; i++) {
    source += str.raw[i] + ` new BigNumber(${vals[i].toString(10)})`;
  }
  if (str.raw[str.raw.length - 1].length) {
    source += str.raw[str.raw.length - 1];
  }

  const ast = parse(source);

  let resource = `const BigNumber = require('bignumber.js');\n`;
  let done = false;
  traverse(ast, {
    BinaryExpression: (path) => {
      if (!done) {
        resource += stringifyBinExpr(path.node);
        done = true;
      }
    },
    StringLiteral: (path) => {
      if (!done) resource += toBN(path.node.value);
    },
    NumericLiteral: (path) => {
      if (!done) resource += toBN(path.node.value);
    },
  });

  const value = eval(resource); // eslint-disable-line

  return value; // eslint-disable-line
};

// BigNumber Arighmetic
export const bna = (str: TemplateStringsArray, ...vals: BN[]): BigNumber => {
  const value = bn(str, ...vals); // eslint-disable-line
  switch (typeof value) {
    case 'string':
      return new BigNumber(value);
    case 'number':
      return new BigNumber(value);
    default:
      if (value instanceof BigNumber) return value;
      throw new Error('return type of bna must be either "string" or "number" or "BigNumber"');
  }
};

// BigNumber Logical
export const bnl = (str: TemplateStringsArray, ...vals: BN[]): boolean => {
  const value = bn(str, ...vals); // eslint-disable-line
  switch (typeof value) {
    case 'boolean':
      return value;
    default:
      throw new Error('return type of bnl must be "boolean"');
  }
};

const toBN = (val: number | string): string => `(new BigNumber(${val}))`;
