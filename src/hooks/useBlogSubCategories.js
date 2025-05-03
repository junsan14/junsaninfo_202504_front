import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export const useBlogSubCategories = () => {
  const { data:blogSubCategories, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/blog-sub-categories`, fetcher)
   //console.log(blogSubCategories)

  return {
    blogSubCategories,
    isLoading,
    isError: error,
  }
}
