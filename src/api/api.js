import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/?',
  params: {
    key: '40993551-a5726d3ae512fc95e7e5e33e4',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  },
});

export const getAllProps = () => {
  return instance.get('/');
};

export const searchImage = (q, page = 1) => {
  return instance.get('&', {
    params: {
      q,
      page,
    },
  });
};
