interface ILib {
  alpha: string[],
  number: string[],
  symbols: string[]
}

type Key = keyof ILib;

const lib : ILib = {
  alpha: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ],
  number: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ],
  symbols: [ '_', '-', '$', '!', '%', '?' ]
};

const defaultKeys : Key[] = ['alpha', 'number', 'symbols'];

export default function generateId(index: number, customKeys?: Key[]) : string {
  const keys : string[] = customKeys
    || defaultKeys;
  const customLib : string[] = keys
    .map((a : Key) => lib[a])
    .reduce((a, b) => a.concat(b));
  const n : number = customLib.length;

  let generatedId : string[] = [];

  while (index > 0) {
    generatedId.push(customLib[Math.round(Math.random() * n)]);
    index -= 1;
  }

  return generatedId.join('');

}
