import useSWR from "swr"


const fetcher = (url) => fetch(url).then(res => res.json())

export function usePost(category,postId,initialPost) {
    const shouldFetch = !!(category && postId)
    const { data, error, isLoading } = useSWR(
        () => shouldFetch? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${category}/${postId}` : null,
        fetcher,{
            fallbackData: shouldFetch ? initialPost : undefined,
        }
      )
      console.log(data)
      return {
        post:data &&data.post,
        relevantPost:data && data.relevantPost,
        error,
        isLoading,
      }
  
}
