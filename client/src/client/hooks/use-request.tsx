//! This hook can be used to get or post data
//! [get] data, that is not necessarily be rendered on initial server reload

import axios from 'axios';
import { useState } from 'react';

const useRequest = (url: string, body: {}, method: string) => {
  const [error, setError] = useState('');

  const doRequest = async (props: any = {}) => {
    try {
      if (
        method === 'post' ||
        method === 'get' ||
        method === 'delete' ||
        method === 'put'
      ) {
        // if statement applied for TS
        const { data } = await axios[method](url, {
          ...body,
          ...props,
        });

        return data;
      }
    } catch (e) {
      if (e.response.data.errors[0])
        return { error: e.response.data.errors[0].message.toUpperCase() };
      else return { error: e.response.data.message };
    }
  };

  return { doRequest }; // it is better to be in this format , rather than [doRequest , error]
};

export default useRequest;
