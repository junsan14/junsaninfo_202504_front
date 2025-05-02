'use client'
import Link from "next/link"
import useSWR,{ mutate }from 'swr'
import useSWRMutation from 'swr/mutation'
import { useState,useRef } from "react"
import { FaTrash, FaEdit } from "react-icons/fa"
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { useRouter, usePathname,useSearchParams } from "next/navigation"
import ConvertCKEditorImageToNextImage from "./ConvertCKEditorImageToNextImage"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import { formatDate } from "./Script"

import { MdAccessTime,MdUpdate } from "react-icons/md"
import {TiPin} from 'react-icons/ti'
import {MdOutlineFiberNew} from 'react-icons/md'
import NProgress from 'nprogress'
import { AiOutlineClear } from "react-icons/ai"
import { BsSearch } from "react-icons/bs"
//import { useDebouncedCallback } from 'use-debounce'
import { useBlogCategories } from "@/hooks/useBlogCategories"
const fetcher = (url) => fetch(url).then(res => res.json())


const toggleVisibility = async (url, { arg:{id,is_show} }) => {
    NProgress.start()
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/visible?postid=${id}&is_show=${is_show}`, {
            method: 'PUT',
        })
        if (!res.ok) {throw new Error('送信に失敗しました')} 
        return res.json()
    }finally{
        NProgress.done()
    }
}
const deletePost = async (url, { arg: id }) => {
    NProgress.start()
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/delete?postid=${id}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error('削除に失敗しました')
        return res.json()
    }finally{
        NProgress.done()
    }
    
}

export default function PostsList({postLimit,pagination, edit, relevantPosts, searchBar}){
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const [currentPage, setCurrentPage] = useState(searchParams.get('page')?Number(searchParams.get('page')).toString():1)
    const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || "")
    const [inputKeywords, setInputKeywords] = useState(searchParams.get('keywords')?searchParams.get('keywords').toString():"")

    const searchAreaRef = useRef(null)
    const inputRef = useRef(null)
    const handleScroll = () => {
        if (window.scrollY > 80) {
          searchAreaRef.current?.classList.add('scroll-fixed')
        } else {
          searchAreaRef.current?.classList.remove('scroll-fixed')
        }
      }
    
      if (typeof window !== 'undefined') {
        window.onscroll = handleScroll
      }
    const isAdmin = pathname.startsWith('/admin')
    const {blogCategories} = useBlogCategories()
    const { data, error, isLoading } = useSWR(
        () => currentPage? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog?page=${currentPage}&limit=${postLimit}&category=${selectedCategory}&keywords=${inputKeywords}&all=${isAdmin}` : null,
        fetcher
      )
    const { trigger:triggerVisibility,isMutating } = useSWRMutation(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/visible`,
        toggleVisibility
    ) 
    const { trigger: triggerDelete } = useSWRMutation(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/delete`, 
        deletePost
    )

    const handleClickVisible = async(e,is_show)=>{
        const id = Number(e.currentTarget.id)
        try {
            await triggerVisibility({id:id, is_show:is_show})
            mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog?page=${currentPage}&limit=${postLimit}&category=${selectedCategory}&keywords=${inputKeywords}&all=${isAdmin}`)
        } catch (err) {
            console.error(err)
        }   
    }
    const handleClickDelete = async(e,id)=>{
        const res = confirm('本当に削除してよろしいですか?')
        if(res) await triggerDelete(id)
        mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog?page=${currentPage}&limit=${postLimit}&category=${selectedCategory}&keywords=${inputKeywords}&all=${isAdmin}`)
    }   

   
    if (error) return 'An error has occurred.'
    
    if (isLoading ||! data.data || !blogCategories){
        return (
            <div className="posts">
                {
                    (function(){
                        const list=[]
                        for(let i=0; i<postLimit;i++){
                            list.push(
                                <div className="posts_item fade animate-pulse" key={i} >
                                        <div className="posts_item_link">
                                        <div className="posts_item_link_image">
                                        <div className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] bg-gray-300 rounded-sm flex items-center justify-center">
                                            <svg
                                            className="w-8 h-8 md:w-10 md:h-10 text-gray-200 dark:text-gray-600"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 18"
                                            >
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                            </svg>
                                        </div>
                                        </div>
                                        <div className="posts_item_link_remarks w-full mt-4 space-y-2">
                                            <div className="h-3 bg-gray-200 rounded-full w-3/4" />
                                            <div className="h-2.5 bg-gray-200 rounded-full w-full" />
                                            <div className="h-2.5 bg-gray-200 rounded-full w-5/6" />
                                        </div>
                                        </div>  
                                </div>
                            )
                        }
                        return (
                            <>
                                {list}
                            </>
                        )
                    }())
                }
            </div>  
        )
    }
    
    const posts = relevantPosts?relevantPosts:data.data
    const totalPages = data.last_page
    const paginationRange = getPaginationRange(currentPage, totalPages)

    
    
    const SearchKeyword = ()=>{
        const handleSearchKeywords = (e)=>{
            const term = e.target.value
            if (e.key === 'Enter') {
            e.preventDefault()
            const params = new URLSearchParams(searchParams)

            if (term) {
                params.set('keywords', term)
                params.delete('page')
                setInputKeywords(term)
            } else {
                params.delete('keywords')
                setInputKeywords('')
            }
            replace(`${pathname}?${params.toString()}`)
            }

        }
        return(
            <div className="search_area js-search_area" ref={searchAreaRef}>
                <button type="button" className="search_area_reset js-search_area_reset" value="RESET" 
                        onClick={()=>{
                            const params = new URLSearchParams(searchParams)
                            setSelectedCategory("")
                            setInputKeywords("")
                            params.delete('keywords')
                            params.delete('category')
                            replace(`${pathname}`,{ scroll: true })
                            
                        }}>
                    {Boolean(selectedCategory || inputKeywords) && <AiOutlineClear />}
                </button>
                <BsSearch className="search_area_icon js-search_area_icon"/>
                
                <input list="tag-list"  className="search_area_input js-search_area_input" id="tag-choice" 
                    name="tag-choice" placeholder="Search..."
                    defaultValue={searchParams.get('keywords')?.toString()}
                    onKeyDown={(e)=>handleSearchKeywords(e)}
                    ref={inputRef}
                />
            </div>
        )
    }
    const Category = ()=>{
        const handleClickCategory = (e)=>{
            const params = new URLSearchParams(searchParams)
            setSelectedCategory(e.target.id)
            setCurrentPage(1)
            params.delete("page")
            params.set("category", e.target.id)
            replace(`${pathname}?${params.toString()}`, {scroll:true})
            //router.push(`${pathname}?${params.toString()}`, { scroll: true })
        }
        return(
            <ul className="category_tab tab">  
                {blogCategories.map((item,i)=>{
                        return(
                            <li className={selectedCategory === item['name']?"category_tab_li on":"category_tab_li"} 
                                tabIndex="-1" value={item['name']}  onClick={handleClickCategory} key={i} id={item['name']} >
                                    {item['name']}
                            </li>
                            )
                    
                    })}
            </ul>
        )
    }
    const Pagination = ()=>{
        const changePage = (page) => {
            const params = new URLSearchParams(searchParams)
            setCurrentPage(page)
            params.set("page", page)
            replace(`${pathname}?${params.toString()}`)
    
           // router.push(`${pathname}?${newParams.toString()}`, { scroll: true })
          }
        return(
            pagination && (
                <div className="mt-6 flex justify-center items-center space-x-1 posts_pagination">
                        <button
                        onClick={() => changePage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                        >
                        前へ
                        </button>
                
                        {paginationRange.map((item, index) =>
                        typeof item === 'string' ? (
                            <span key={"paginationkey_" + index} className="px-3 py-1 text-gray-400">
                            {item}
                            </span>
                        ) : (
                            <button
                            key={item}
                            onClick={() => changePage(item)}
                            className={`px-3 py-1 rounded ${
                                item == currentPage
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                            >
                            {item}
                            </button>
                        )
                        )}
                
                        <button
                        onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                        >
                        次へ
                        </button>
                </div>
            )
        )
    }
    return(
        <>
            {searchBar && (
                <>
                    <Category />
                    <SearchKeyword />
                </>
            )}
            {posts.length !==0? (   
                <div className="posts"> 
                {posts.map((post)=>{
                    const blogCategory = blogCategories.find((category)=>category.id== post.category)['slug']
                    return(
                        <div className={post.is_show?"posts_item fade":"posts_item fade grey"} id={"postid_" + post.id} key={"postid_"+post.id}>
                            {Boolean(post.is_featured)  && <TiPin className="posts_item_featured"/>}    
                            {isNew(post.published_at) && <MdOutlineFiberNew className="posts_item_new" />}
                            <Link href={post.is_show ? `/blog/${blogCategory}/${post.id}/${post.slug}`:  `/blog/${blogCategory}/${post.id}/${post.slug}?preview=true`} className='posts_item_link' target={edit && "_blank" } >
                                <div className="posts_item_link_image">
                                    <ConvertCKEditorImageToNextImage imagePath={post.thumbnail} />
                                </div>
                                <div className="posts_item_link_remarks">
                                    <h3 className="posts_item_link_remarks_title">{post.title}</h3>
                                    <div className="posts_item_link_remarks_text">
                                        {post.excerpt}
                                    </div> 
                                    <div className="posts_item_link_remarks_dates_area">
                                        <PostDate post={post} />
                                    </div>   
                                </div>
                            </Link>
                            {edit && (
                                <div className='posts_item_manage'>         
                                    <div className='posts_item_manage_icons'>
                                        <Link href={`/admin/blog/post/edit?postid=${post.id}`} data={{ id: post.id }}>
                                            <FaEdit className='posts_item_manage_icons_item'/>
                                        </Link>
                                        <button className={"btn-"+post.id} disabled={isMutating}>
                                            {post.is_show
                                                ?<AiOutlineEyeInvisible className='posts_item_manage_icons_item' id={post.id} alt='表示する' onClick={(e)=>handleClickVisible(e,1)}/>
                                                :<AiOutlineEye className='posts_item_manage_icons_item' id={post.id} alt='表示する' onClick={(e)=>handleClickVisible(e,0)}/>
                                                }
                                        </button>
                                        <button className={"btn-"+post.id} disabled={isMutating}>
                                            <FaTrash className='posts_item_manage_icons_item' id={post.id} 
                                                onClick={(e)=>handleClickDelete(e,post.id)}/>
                                        </button>
                                    </div>
                                    <span className="posts_item_manage_id"> {post.id} </span> 
                                </div>
                            )
                            }
                        </div>
                    )
                })
                }
                {/* ページネーション */}
                <Pagination />
                
                </div>
        ):(
            <>
                <p>「{selectedCategory ? selectedCategory:"全ての"}」カテゴリーの中で、「{inputKeywords}」に該当する記事は見つかりませんでした。</p>
            </>
        )}
        </>
        
        

    )


        
    
}

const isNew = (dateStr) => {
    const published = new Date(dateStr)
    const today = new Date()
  
    // 差分（日数）を計算
    const diffTime = today - published
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
  
    return diffDays <= 7
  }

function PostDate({post}){
    if(formatDate(post.published_at) == "1970/01/01"){
      return(
            <div className="posts_item_link_remarks_dates_area_date">
                    <MdAccessTime className='posts_item_link_remarks_dates_area_date_icon' />
                    <span className='posts_item_link_remarks_dates_area_date_value'>公開前</span>
            </div> 
      )
    }else if(formatDate(post.published_at) == formatDate(post.updated_at)){
        return(
            <div className="posts_item_link_remarks_dates_area_date">
                <MdAccessTime className='posts_item_link_remarks_dates_area_date_icon' />
                <span className='posts_item_link_remarks_dates_area_date_value'>{formatDistanceToNow(post.published_at,{locale: ja})}前</span>
            </div>  
        )
    }else{
        return(
            <div className="posts_item_link_remarks_dates_area_date">
                <MdUpdate className="posts_item_link_remarks_dates_area_date_icon"/>
                <span className='posts_item_link_remarks_dates_area_date_value'>{formatDistanceToNow(post.updated_at,{locale: ja})}前</span>
            </div>
        )
    }
}
function getPaginationRange(currentPage, totalPages, delta = 1) {
    const range =  []
    const left = Math.max(2, currentPage - delta)
    const right = Math.min(totalPages - 1, currentPage + delta)
  
    range.push(1)
  
    if (left > 2) {
      range.push('...')
    }
  
    for (let i = left; i <= right; i++) {
      range.push(i)
    }
  
    if (right < totalPages - 1) {
      range.push('...')
    }
  
    if (totalPages > 1) {
      range.push(totalPages)
    }
  
    return range
}




  
