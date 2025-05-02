import useSWR from "swr"
import { useAuth } from "./auth"

const fetcher = (url) => fetch(url).then(res => res.json())

export function usePost(category,postId,slug,initialPost,is_preview) {
    const {user} = useAuth()

    const shouldFetch = !!(category && postId)
    const { data, error, isLoading } = useSWR(
        () => shouldFetch? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${category}/${postId}/${slug}?preview=${is_preview}` : null,
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
