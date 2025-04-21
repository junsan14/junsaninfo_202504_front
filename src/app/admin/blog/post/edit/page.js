'use client'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import BlogEditor from '@/components/BlogEditor'

const fetcher = (url) => fetch(url).then((res) => res.json())
export default function EditBlog(){
    const searchParams = useSearchParams()
    const postId = searchParams.get('postid') // ← ここで取得
    const { data, error } = useSWR(
        postId ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/edit?postid=${postId}` : null,
        fetcher
      )
    if (error || !data) return <div>Error loading post</div>

    return(
        <section className="section wrap blogEditor">
            <h1 className="section_title">
                <p className="section_title_jp">EDIT</p>
            </h1>
            <BlogEditor postData={data}/> 
        </section>
    )
}