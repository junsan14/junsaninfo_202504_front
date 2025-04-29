export async function fetchPost(category, postId){    
    //useSWRだとuse clientにしないといけないため
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${category}/${postId}`, {
    next: { revalidate: 60 }, // ISR対応、任意
  })
  let error
    if (!res.ok) error = true
    const data = await res.json()
  
    return {
        post: data && data.post,
        error
      }

}