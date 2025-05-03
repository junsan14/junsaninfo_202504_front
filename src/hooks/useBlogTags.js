import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export const useBlogTags = () => {
  const { data:blogTags, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/blog-tags`, fetcher)

  return {
    blogTags,
    isLoading,
    isError: error,
  }
}
