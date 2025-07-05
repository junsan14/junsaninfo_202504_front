
import PostsList from '@/components/PostsList'
import { Suspense } from 'react'
export default function Posts (){

    return (
        <>
        <section className="section blog wrap">
            <h1 className="section_title">
                <p className="section_title_jp">Blog</p>
            </h1>
            <Suspense>
                <PostsList postLimit={10} pagination={true} searchBar={true} />
            </Suspense>
        </section>
    </>
    )
}

export const metadata = {
    title: 'junsan14｜BLOG',
}

