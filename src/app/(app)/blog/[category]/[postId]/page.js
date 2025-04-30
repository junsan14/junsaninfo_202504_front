import PostContent from "@/components/PostContent"
import { fetchPost } from "@/lib/postAPI"

export default async function Page({params}) {
  const { category, postId } = await params
  const {post} = await fetchPost(category,postId)
  return(
    <>
      <PostContent category={category} postId={postId} initialPost={post}/>
    </>
  )
}

export async function generateMetadata({ params }) {
  const { category, postId } = await params
  const {post,error} = await fetchPost(category,postId)

  const matches = [...(post.thumbnail?.matchAll(/<img[^>]+src="([^">]+)"/g) || [])]
  const urls = matches.map(match => match[1])

  return {
    title: !error && `junsan14｜${post.title}`,
    openGraph: {
      images: [urls[0]],
    },
  }
}



  






