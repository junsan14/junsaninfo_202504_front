
import PostsList from '@/components/PostsList'
import { Instagram, Threads } from '@/components/Sns'
import Contact from '@/components/Contact'
import {MdOutlineReadMore} from 'react-icons/md'
import Link from 'next/link'
import { Suspense } from 'react'
import { KVSlide } from '@/components/KVSlide'


export default function Home (){

    return(
        <>
            <KVSlide />
            <section className="section wrap">
                <h2 className="section_title">
                    <div className="section_title_jp">BLOG</div>
                </h2>
                <Suspense>
                    <PostsList postLimit={6} isTop={true}/>
                </Suspense>
                <div className="section_btn">
                    <Link href='/blog'>
                        <MdOutlineReadMore />
                    </Link>
                </div>
            </section>
            <section className="section wrap">
                <h2 className="section_title">
                    <div className="section_title_jp">Threads</div>
                </h2>
                <Threads />
            </section>
            <section className="section wrap_small">
                <h2 className="section_title">
                    <div className="section_title_jp">Instagram</div>
                </h2>
                <Instagram />    
            </section>
            <section className="section wrap_small contact">
                <h1 className="section_title">
                    <div className="section_title_jp">CONTACT</div>
                </h1> 
                <Contact />
            </section>
        </>
    )
}


