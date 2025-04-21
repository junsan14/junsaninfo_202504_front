import ArticleList from '@/components/PostsList'
import Link from 'next/link'

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
            <ArticleList postLimit={20} pagination={true} edit={true} all={true} />
        </section>
    )
}