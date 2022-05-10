import React, { useEffect, useState } from 'react'
import { Route } from 'react-router';
import { useFetching } from '../../hooks/useFetching';
import postApi from '../api/postApi';
import CreatePostsForm from './CreatePostsForm';

export default function Layoute() {

  const [category, setCategory] = useState([]);

  const [fetchCategoryPost] = useFetching(async () => {
    const responce = await postApi.getCategory();
    setCategory(responce.data);
  });

  useEffect(() => {
    const fetchApi = async () => {
      await fetchCategoryPost();
    }
    fetchApi();
  }, []);

  return (
      <CreatePostsForm category={category}/>
  )
}
