import PostsList from '@/components/PostsList'
import Link from 'next/link'
import { Suspense } from 'react'

export default function AdminTop(){
    return(
        <section className="section wrap">
            <h1 className="section_title">
                <div className="section_title_jp">ADMIN TOP</div>
            </h1>
            <button className='single_btn'>
                <Link href="/admin/blog/post/create">
                    NEW
                </Link>
            </button>
            <Suspense>
                <PostsList postLimit={20} pagination={true} edit={true} all={true} searchBar={true}/>
            </Suspense>
        </section>
    )
}