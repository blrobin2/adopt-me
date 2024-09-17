async function fetchBreedList({ queryKey }) {
  const animal = queryKey[1];

  if (!animal) return [];

  const res = await fetch(
    `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (res.status !== 200) {
    throw new Error(`breeds ${animal} fetch not ok`);
  }

  return res.json();
}

export default fetchBreedList;
