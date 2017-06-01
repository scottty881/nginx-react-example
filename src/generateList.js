import faker from 'faker';

export const generateEmaiList = function(listLength = 0) {
  const usedEmails = [];
  return new Array(listLength).fill(null).map(() => {
    if (Math.random() > 0.5) {
      const randomEmail = faker.internet.email();
      usedEmails.push(randomEmail);
      return randomEmail;
    }
    return usedEmails.pop() || faker.internet.email();
  })
}

export const removeDuplicates = function(list = []) {
  const startTime = Date.now();
  const seenEmails = {};
  const result = [];
  list.map((item) => {
    if (seenEmails[item]) {
      return;
    }
    seenEmails[item] = 1;
    result.push(item);
    return seenEmails[item] = 1;
  });
  const endTime = Date.now();
  return {
    time: endTime - startTime,
    resultList: result,
    originalList: list,
    numberOfDuplicates: list.length - result.length,
    originalLength: list.length
  };
}

