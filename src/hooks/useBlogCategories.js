import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export const useBlogCategories = () => {
  const { data:blogCategories, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/blog-categories`, fetcher)

  return {
    blogCategories,
    isLoading,
    isError: error,
  }
}
