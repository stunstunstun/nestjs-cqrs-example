const generateCaculator = (initValue = 0) => {
  let value = initValue;
  return function(enable) {
    if (enable) {
      value += 1;
    }
    return value;
  };
};

const makeCalculationPoint = (data) => {
  const { content, attachedPhotoIds } = data;
  const calculate = generateCaculator();

  calculate(content && content.length > 0);
  return calculate(Array.isArray(attachedPhotoIds) && attachedPhotoIds.length > 1);
};

export {
  makeCalculationPoint,
};