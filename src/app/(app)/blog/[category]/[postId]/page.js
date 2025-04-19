'use client'
import useSWR from 'swr'
import { formatDate } from '@/components/Script'
import { blogCategories } from "@/constants/blogCategories"
import ConvertCKEditorImageToNextImage from '@/components/ConvertCKEditorImageToNextImage'
import ArticleList from '@/components/PostsList'


export function PostDetail({ params }) {
  const { category,postId } = params
  const categoryId = blogCategories.indexOf(category)
  const fetcher = (url) => fetch(url).then((res) => res.json())
//console.log(`http://localhost:8000/api/blog/${category}/${postId}`)
  const { data, error,isLoading } = useSWR(
    category && postId ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${categoryId}/${postId}` : null,
    fetcher
  )

  if (error) return <div>Error loading post</div>
  if ( isLoading || !data) return (
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
  const post = data.post
  //console.log(data);
  return (
    data.message ? (
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
            <Date post={post}/>
          </div>
          <div className="post_content ck ck-content">
              {post.content && <ConvertCKEditorImageToNextImage imagePath={post.content} />}
          </div>
        </div>
        <div className='relevant_posts'>
          <h3 className="relevant_posts_title">関連記事</h3>
          <div className="relevant_posts_item">
            <ArticleList postLimit={2} pagination={false} relevantPosts={data.relevantPosts}/>
          </div>
        </div>
       
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


export default PostDetail
