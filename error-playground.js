const sum = (a, b) => {
  if (a && b) {
    return a + b;
  }

  throw new Error('Invliad arguments');
};

try {
  console.log(sum(1));
} catch (error) {
  console.log('[ERROR]: ', error.message);
}

console.log('This works!');
