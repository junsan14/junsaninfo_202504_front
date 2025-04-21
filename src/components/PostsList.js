'use client'
import Link from "next/link"
import { blogCategories } from "@/constants/blogCategories"
import useSWR,{ mutate }from 'swr'
import useSWRMutation from 'swr/mutation'
import { useState,useEffect } from "react"
import { FaTrash, FaEdit } from "react-icons/fa"
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { useRouter, usePathname } from "next/navigation"
import ConvertCKEditorImageToNextImage from "./ConvertCKEditorImageToNextImage"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'
import { formatDate } from "./Script"
import { MdAccessTime,MdUpdate } from "react-icons/md"

const fetcher = (url) => fetch(url, { credentials: 'include' }).then(res => res.json())


const toggleVisibility = async (url, { arg:{id,is_show} }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/visible?postid=${id}&is_show=${is_show}`, {
        method: 'PUT',
    })
    if (!res.ok) {throw new Error('送信に失敗しました')} 
    return res.json()
}
const deletePost = async (url, { arg: id }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/delete?postid=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('削除に失敗しました')
    return res.json()
}

export default function PostsList({postLimit,pagination, edit, relevantPosts}){
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter()
    const pathname = usePathname()
    //const searchParams = new URLSearchParams(window.location.search)

    const isAdmin = pathname.startsWith('/admin')
    const { data, error, isLoading } = useSWR(
        () => currentPage ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog?page=${currentPage}&limit=${postLimit}&all=${isAdmin}` : null,
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
            mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog?page=${currentPage}&limit=${postLimit}&all=${isAdmin}`)
        } catch (err) {
            console.error(err)
        }   
    }
    const handleClickDelete = async(e,id)=>{
        const res = confirm('本当に削除してよろしいですか?')
        if(res) await triggerDelete(id)
        mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog?page=${currentPage}&limit=${postLimit}&all=${isAdmin}`)
    }   
    const changePage = (page) => {
        setCurrentPage(page)
        const newParams = new URLSearchParams(window.location.search)
        newParams.set("page", page)
        router.push(`${pathname}?${newParams.toString()}`, { scroll: true })
      }

    useEffect(() => {
        const pageFromQuery = Number(new URLSearchParams(window.location.search).get("page"))
        if (pageFromQuery && pageFromQuery > 0) {
        setCurrentPage(pageFromQuery)
        }
    }, [])

    if (error) return 'An error has occurred.'
    if (isLoading || ! data){
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
                                        <div className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] bg-gray-300 rounded-sm dark:bg-gray-700 flex items-center justify-center">
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
                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4" />
                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6" />
                                        </div>
                                        </div>  
                                </div>
                            )
                        }
                        return <>{list}</>
                    }())
                }
            </div>  
        )
    }
    //console.log(relevantPosts)
    const posts = relevantPosts?relevantPosts:data.data
    const totalPages = data.last_page
    const paginationRange = getPaginationRange(currentPage, totalPages)
    

    return(
        <div className="posts">
            {
            posts.map((post)=>(
                    <div className={post.is_show?"posts_item fade":"posts_item fade grey"} id={"postid_" + post.id} key={"postid_"+post.id}>
                        <Link href={`/blog/${blogCategories[post.category]}/${post.id}`} className='posts_item_link'>
                            <div className="posts_item_link_image">
                                <ConvertCKEditorImageToNextImage imagePath={post.thumbnail} />
                            </div>
                            <div className="posts_item_link_remarks">
                                <h3 className="posts_item_link_remarks_title">{post.title}</h3>
                                <div className="posts_item_link_remarks_text">
                                    {post.excerpt}
                                </div> 
                                <div className="posts_item_link_remarks_dates_area">
                                    <PostDate post={post} />前
                                </div>   
                            </div>
                        </Link>
                        {edit && (
                            <div className='posts_item_manage'>
                                <span className="posts_item_manage_id"> {post.id} </span>          
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
                            </div>
                        )
                        }
                    </div>
            ))
            }
             {/* ページネーション */}
             {pagination && (
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
                            item === currentPage
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
             )}
             
        </div>

    )


        
    
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




  