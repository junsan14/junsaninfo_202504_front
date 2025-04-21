'use client'
import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useSWR from 'swr'
import Image from 'next/image'

//Instagram
import { FaInstagram, FaThreads } from 'react-icons/fa6'

//Threads
import { ja } from 'date-fns/locale'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay} from 'swiper/modules'

import { FaRegHeart } from "react-icons/fa"
import { FaRegComment } from "react-icons/fa"
import { FaRetweet } from "react-icons/fa6"
import { LuSend } from "react-icons/lu"
const fetcher = (url) => fetch(url).then(res => res.json())

export function Instagram(){  
 
  const { data, error, isLoading } = useSWR('/api/instagram', fetcher)

  if (error) return 'An error has occurred.'
  if (isLoading || ! data){
    return (
        <div className="instagram js-instagram">
            <div className="instagram_posts js-instagram-wrapper">
            {
                (function(){
                    const list=[]
                    for(let i=0; i<9;i++){
                        list.push(
                            <div
                                className="aspect-square bg-gray-300 rounded-sm flex items-center justify-center instagram_posts_item"
                                style={{ width: '32.5%' }} key={i}
                                >
                                <svg
                                    className="w-10 h-10 text-gray-200 dark:text-gray-600 instagram_posts_item_image"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path
                                    d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
                                    />
                                </svg>
                            </div>
                        )
                    }
                    return  (
                        
                            <>
                                {list}
                            </>
                  
                    )
                }())
            }
            </div>
        </div>  
    )
  }
   
return(
    <div className="instagram js-instagram">
        
            <div className="instagram_posts js-instagram-wrapper">
                {data.data.map((post,i) => {
                const MediaType = ()=>{
                    if(String(post.media_type) === "VIDEO"){
                    return (
                        <video src={post.media_url} alt="" 
                        className="post_image js-modal-img" data-url={post.media_url} data-index={i}
                        muted autoPlay 
                         />            
                    )
                    }else{
                    return (
                        <Image src={post.media_url} alt="" width={250} height={250} className="instagram_posts_item_image js-modal-img" data-url={post.media_url} data-index={i}/>            
                        )
                    }
                }
                return(
                    <div className='instagram_posts_item' key={i}>
                            <MediaType />
                        {/*
                        <figcaption className='js-figcaption-date'>{formatDate(post.timestamp)}</figcaption>
                        <figcaption className="post_desc_caption js-figcaption-text" >
                            {parse(post.caption)}
                        </figcaption>   
                        */}
                    </div>
                )          
                })}
            </div>           
            <div className="section_btn">
                <a href='https://www.instagram.com/junsan_junsan14/' target='_blank' rel="noreferrer">
                    <FaInstagram />
                </a>
            </div>
            
    </div>
  )
}


export function Threads(){
    const { data, error, isLoading } = useSWR('/api/threads', fetcher)
    if (error) return 'An error has occurred.'
    if (isLoading || !data){
        return (
            <div className="threads">
                <div className="threads_posts js-instagram-wrapper">
                <Swiper
                    slidesPerView={1.2}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    loop={true}
                    centeredSlides={true}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 1.5, spaceBetween: 50 },
                        960: { slidesPerView: 3.8, spaceBetween: 40 },
                    }}
                    autoplay={{ delay: 7000, disableOnInteraction: false }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                    >
                    {[...Array(5)].map((_, i) => (
                        <SwiperSlide key={i}>
                        <div className="threads_posts_item animate-pulse">
                            <div className="threads_posts_item_header flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-300 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-32" />
                                <div className="h-3 bg-gray-200 rounded w-20" />
                            </div>
                            </div>

                            <div className="threads_posts_item_content mt-4 space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-full" />
                            <div className="h-3 bg-gray-200 rounded w-11/12" />
                            <div className="h-3 bg-gray-200 rounded w-9/12" />
                            </div>

                            <div className="icon flex space-x-4 mt-4">
                            <div className="w-5 h-5 bg-gray-300 rounded" />
                            <div className="w-5 h-5 bg-gray-300 rounded" />
                            <div className="w-5 h-5 bg-gray-300 rounded" />
                            <div className="w-5 h-5 bg-gray-300 rounded" />
                            </div>
                        </div>
                        </SwiperSlide>
                        ))}
                </Swiper>

                </div>
            </div>  
        )
    }  
    return(
        <div className="threads js-threads">
            <div className="threads_posts js-threads-wrapper">
                <Swiper
                    slidesPerView={1.2}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    centeredSlides={true}
                    breakpoints={{
                        640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        },
                        768: {
                        slidesPerView: 1.5,
                        spaceBetween: 50,
                        },
                        960: {
                        slidesPerView: 3.8,
                        spaceBetween: 40,
                        },
                    }}
                    autoplay={{
                        delay: 7000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination,Autoplay]}
                    className="mySwiper"
                >
                {data.data.map((post,i)=>(
                    <SwiperSlide key={i}>       
                    <a href={post.permalink} target="_blank" rel="noreferrer">
                        <div className='threads_posts_item'>
                            <div className="threads_posts_item_header">
                            <Image src='/profile.png' alt="" width={200} height={200}/>
                            <h2 className="title">{post.username}</h2>
                            <p className="date">{formatDistanceToNow(post.timestamp,{locale: ja})}前 </p>
                            </div>
                            <div className='threads_posts_item_content'>
                                <p className='threads_posts_item_content_text'>{post.text}</p>
                            </div>
                            <div className='icon'>
                                <FaRegHeart />
                                <FaRegComment />
                                <FaRetweet />
                                <LuSend />
                            </div>
                        </div>
                    </a>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="section_btn">
                    <a href='https://www.instagram.com/junsan_junsan14/' target='_blank' rel="noreferrer">
                        <FaThreads />
                    </a>
                </div>
            </div>
        </div>
    )
}





