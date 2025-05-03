'use client'
import { usePost } from "@/hooks/usePost"
import ConvertCKEditorImageToNextImage from "./ConvertCKEditorImageToNextImage"
import Toc from "./stylePost/TableOfContetsForPost"
import CodeEnhancer from "./stylePost/CodeEnhancer"
import PostsList from "./PostsList"
import { formatDate } from "./Script"
import Link from "next/link"

export default function PostContent({category,postId,slug,initialPost,is_preview}){
    const {post,error,isLoading, relevantPosts} = usePost(category,postId,slug,initialPost,is_preview)
    if (error) return <div>Error loading post</div>
    if (isLoading && !post) return (
        <section className="wrap section animate-pulse flex flex-col items-center pt-1">
        <h1 className="section_content_title h-8 bg-gray-300 rounded w-2/4" />
        <div className="post">
          
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
console.log(post.tags)
  return (
    !post ? (
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
                    <Date post={post} />
                </div>
                <div className="post_content ck ck-content">
                    <Toc />
                    <CodeEnhancer />
                    {post.content && <ConvertCKEditorImageToNextImage imagePath={post.content} />}
                </div>
                <div className="post_keyword-list flex flex-wrap gap-2">
                    {post.tags.length !== 0 && post.tags.map((tag, index) => (
                     <Link
                        key={index}
                        href={`/blog?keywords=${encodeURIComponent(tag.trim())}`}
                        className="text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                        style={{ background: 'rgba(238, 238, 238, 0.5)' }} // ← rgba(#eee, .5) 相当
                     >
                        #{tag.trim()}
                    </Link>
                    ))}
                </div>
            </div>
            {relevantPosts.length !== 0 && (
                <div className='relevant_posts'>
                    <h3 className="relevant_posts_title">関連記事</h3>
                    <div className="relevant_posts_item">
                        <PostsList relevantPosts={relevantPosts} postLimit={4} pagination={false}  searchBar={false}/>
                    </div>
                </div>  
            )}

        </section>
    )
)
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

