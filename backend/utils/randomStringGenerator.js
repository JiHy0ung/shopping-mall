const randomStringGenerator = () => {
  const randomString = Array.from(Array(15), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");

  return randomString;
};

module.exports = { randomStringGenerator };
