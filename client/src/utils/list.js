export const comparePosition = (first, second) => {
  if (first.position < second.position) {
    return -1;
  } else if (first.position > second.position) {
    return 1;
  } else {
    return 0;
  }
};
