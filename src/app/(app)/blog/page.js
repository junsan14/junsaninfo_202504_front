'use client'
import ArticleList from '@/components/PostsList'

export default function Posts (){

    return (
        <>
        <section className="section blog wrap">
            <h1 className="section_title">
                <p className="section_title_jp">Blog</p>
            </h1>
            <ArticleList postLimit={10} pagination={true}/>
        </section>
    </>
    )
}

