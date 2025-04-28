import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then(res => res.data);

export const useBlogCategories = () => {
  const { data:blogCategories, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/blog-categories`, fetcher);

  return {
    blogCategories,
    isLoading,
    isError: error,
  };
};
