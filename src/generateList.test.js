import {removeDuplicates, generateEmaiList} from './generateList';

it('returns a result with metadata', () => {
  const listLength = 10;
  const result = removeDuplicates(generateEmaiList(listLength));
  expect(result.time).toBeGreaterThanOrEqual(0);
  expect(result.resultList.length).toEqual(listLength - result.numberOfDuplicates);
  expect(result.numberOfDuplicates).toBeGreaterThanOrEqual(0);
  expect(result.originalLength).toEqual(listLength);
});

it('has no duplicates', () => {
  const listLength = 100;
  const result = removeDuplicates(generateEmaiList(listLength));
  const uniqueEmails = result.resultList.reduce((result, item) => {
    if (result[item]) {
      return result;
    }
    result[item] = 1;
    return result;
  }, {});
  const expectedNumberOfUniqueEmails = listLength - result.numberOfDuplicates;
  expect(Object.keys(uniqueEmails).length).toEqual(expectedNumberOfUniqueEmails);
});

it('maintains order of the list', () => {
  const testList = [
    'Benedict50@gmail.com',
    'Benedict50@gmail.com',
    'Elian.Schiller@gmail.com',
    'Dayna_Rowe@gmail.com',
    'Bret_Aufderhar43@gmail.com',
    'Clare40@hotmail.com',
    'Gaetano66@yahoo.com',
    'Gaetano66@yahoo.com',
    'Clare40@hotmail.com',
    'Ursula_OConner70@gmail.com',
    'Ursula_OConner70@gmail.com'
  ];
  const result = removeDuplicates(testList);

  expect(result.resultList).toEqual([
    'Benedict50@gmail.com',
    'Elian.Schiller@gmail.com',
    'Dayna_Rowe@gmail.com',
    'Bret_Aufderhar43@gmail.com',
    'Clare40@hotmail.com',
    'Gaetano66@yahoo.com',
    'Ursula_OConner70@gmail.com'
  ]);
});

it('handles a list of all dupes', () => {
  const testList = [
    'Benedict50@gmail.com',
    'Benedict50@gmail.com',
    'Benedict50@gmail.com',
    'Benedict50@gmail.com',
    'Benedict50@gmail.com',
    'Benedict50@gmail.com'
  ];
  const result = removeDuplicates(testList);

  expect(result.resultList).toEqual([
    'Benedict50@gmail.com'
  ]);
});

it('handles an empty list', () => {
  const testList = [];
  const result = removeDuplicates(testList);

  expect(result.resultList).toEqual([]);
});
