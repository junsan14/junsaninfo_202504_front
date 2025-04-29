'use client'
import useSWR from 'swr'
import { formatDate } from '@/components/Script'

const fetcher = (url) => fetch(url).then(res => {
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  })
export function usePostDetail(category,postId) {
  const shouldFetch = category && postId;
  const { data, error,isLoading } = useSWR(
    shouldFetch? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${category}/${postId}` : null,
    fetcher
  )
  
  
  return {
    post: data?.post,
    relevantPosts: data?.relevantPosts,
    error,
    isLoading,
  };

  
}

const Date = ({post})=>{
    if(formatDate(post.published_at) == "1970/01/01"){
          return(
              <div className="post_date_area">
                    <span>投稿日_</span>
                    <span className='post_date_area_value'>{formatDate(post.created_at)}</span>
              </div>  
          )
      }else if(formatDate(post.published_at) == formatDate(post.updated_at)){
          return(
              <div className="post_date_area">
                  <span>投稿日_</span>
                  <span className='post_date_area_value'>{formatDate(post.published_at)}</span>
              </div>  
          )
      }else{
          return(
              <>
                  <div className="post_date_area">
                     <span>更新日_</span>
                      <span className='post_date_area_value'>{formatDate(post.updated_at)}</span>
                  </div> 
                  <br/>
                  <div className="post_date_area">
                     <span>投稿日_</span>
                      <span className='post_date_area_value'>{formatDate(post.published_at)}</span>
                  </div> 
              </>
          ) 
      }
  }