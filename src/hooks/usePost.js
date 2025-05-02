import useSWR from "swr"
import { useAuth } from "./auth"

const fetcher = (url) => fetch(url).then(res => res.json())

export function usePost(category,postId,initialPost,is_preview) {
    const {user} = useAuth()
    console.log(user)
    const shouldFetch = !!(category && postId)
    const { data, error, isLoading } = useSWR(
        () => shouldFetch? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${category}/${postId}?preview=${is_preview}` : null,
        fetcher,{
            fallbackData: shouldFetch ? initialPost : undefined,
        }
      )
      const isUnauthorizedPreview = is_preview && !user

      //console.log(data)
      return {
        post: isUnauthorizedPreview ? null : data?.post,
        relevantPosts: isUnauthorizedPreview ? [] : data?.relevantPosts,
        error: isUnauthorizedPreview ? null : error,
        isLoading,
      }
  
}
