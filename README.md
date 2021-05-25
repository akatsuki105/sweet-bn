# sweet-bn

Syntax suger for [bignumber.js](https://github.com/MikeMcl/bignumber.js).

## Example

```ts
import { BigNumber } from 'bignumber.js';
import { bna } from 'sweet-bn';

const a = new BigNumber(1);
const b = new BigNumber(2);
const c = new BigNumber(3);
const d = new BigNumber(4);

// raw bignumber.js
const e = a.plus(b).plus(c.times(d));

// using sweet-bn
const e = bna`${a} + ${b} + ${c} * ${d}`;
```

## Install

```
yarn add https://github.com/pokemium/sweet-bn.git
```

## API

**`bna`**

`bna` is for Arithmetic operation. Return type is `BigNumber`.

```js
import { BigNumber } from 'bignumber.js';
import { bna } from 'sweet-bn';

const a = new BigNumber(1);
const b = new BigNumber(2);
const sum = bna`${a} + ${b}`;
```

**`bnl`**

`bnl` is for Logical operation. Return type is `boolean`.

```js
import { BigNumber } from 'bignumber.js';
import { bnl } from 'sweet-bn';

const sum = new BigNumber(3.3);
const isEqual = bnl`1.1 + 2.2 == ${sum}`;
```

## Operator

You can use following operators now.

**Infix**

```
+ - * / == > >= < <=
```

**Prefix/Suffix**

Currently, no prefix/suffix operators are supported.

```
```

In the future, I'll implement following operators.

**Infix**

```
```

**Prefix/Suffix**

```
- ! ++ --
```
