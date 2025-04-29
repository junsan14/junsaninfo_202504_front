
import { usePostDetail } from "@/lib/usePostDetail"
import ConvertCKEditorImageToNextImage from "@/components/ConvertCKEditorImageToNextImage"
import PostsList from "@/components/PostsList"
import useSWR from 'swr'


const fetcher = url => fetch(url).then(res => res.json())




export default function Page({ params }) {
 const { category, postId } = params

//const { post, relevantPosts, error, isLoading } = usePostDetail(category, postId)
 
 /*
 const { data:post, error,isLoading } = useSWR(
  category? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${category}/${postId}` : null,
  fetcher
)
  */

/*
  if (error) return <div>Error loading post</div>
  if ( isLoading || !post) return (
    <section className="wrap section animate-pulse">
      <h1 className="section_content_title h-8 bg-gray-300 rounded w-3/4 mb-4 text-center"  />
      <div className="post">
        <div className="post_date h-4 bg-gray-200 rounded w-1/4 mb-6" />
        <div className="post_content ck ck-content space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </section>
  )

return (
  post.message ? (
    <section className='wrap section'>
      <div className="post">
        <div className="post_content ck ck-content">
            該当IDの記事は存在しません
        </div>
      </div>
  </section>
  ):(
    <section className='wrap section'>
      <h1 className="section_content_title">{post.title}</h1>
      <div className="post" id={post.id} key={post.id}>
        <div className="post_date">
         
        </div>
        <div className="post_content ck ck-content">
            {post.content && <ConvertCKEditorImageToNextImage imagePath={post.content} />}
        </div>
      </div>
      <div className='relevant_posts'>
        <h3 className="relevant_posts_title">関連記事</h3>
        <div className="relevant_posts_item">
          <PostsList postLimit={2} pagination={false}  searchBar={false}/>
        </div>
      </div>
     
  </section>
  )
)
*/

return(
  <section className='wrap section'>
      <h1 className="section_content_title">Hello</h1>
      <div className="post">
        <div className="post_date">
         
        </div>
        <div className="post_content ck ck-content">
            content
        </div>
      </div>
      <div className='relevant_posts'>
        <h3 className="relevant_posts_title">関連記事</h3>
        <div className="relevant_posts_item">
          <PostsList postLimit={2} pagination={false}  searchBar={false}/>
        </div>
      </div>
  </section>
)
}
  






