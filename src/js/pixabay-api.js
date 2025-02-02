export const fetchPhotosByQuery = (searchedQuery, page = 1, per_page = 20) => {
  const searchParams = new URLSearchParams({
    q: searchedQuery,
    key: '48600448-a8625b0ee752919c612468958',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
