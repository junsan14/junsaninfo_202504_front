
//import  { Metadata, ResolvingMetadata } from 'next'

import { usePostDetail } from "@/lib/usePostDetail"

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { category, postId } = params
  const {post} = await usePostDetail(category,postId)
  // fetch data
  //const {data} = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${category}/${postId}`).then((res) => res.json())
 console.log(category)
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: "ss",
    openGraph: {
      images: ['/some-specific-page-image.jpg'],
    },
  }
}
const PageLayout = ({ children,params }) => { 
    console.log(params)
    return (
            <>
                {children}
            </>
    )
}



export default PageLayout
