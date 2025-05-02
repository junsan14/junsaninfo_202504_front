'use client'
import useSWRMutation from 'swr/mutation'
import { mutate } from 'swr'
import { useState,useEffect} from 'react'
import { get, set, del } from 'idb-keyval'
import CKFinderLoader from '@/components/CKFinderLoader'
import { formatinputDate } from '@/components/Script'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import NProgress from 'nprogress'
import { useAuth } from '@/hooks/auth'
import { useBlogCategories } from '@/hooks/useBlogCategories'
const  ClientSideCustomEditor = dynamic( () => import( '@/components/CustomEditor' ), { ssr: false } )


const sendData = async (url, { arg }) => {
  
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg)
        //credentials: 'include',
    })
    
    if (!res.ok) {
        throw new Error('送信に失敗しました')
    }
    
    return res.json()
}

export default function BlogEditor({postData}){
    const { user } = useAuth()
    const {blogCategories} = useBlogCategories()
    const { trigger, data } = useSWRMutation(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/store`,
            sendData
        )    
    const router = useRouter()
    const { post,tags,isNew,keywords } = postData
    const [form, setForm] = useState({
        id:isNew?"":post.id,
        author_id:user.user.id,
        title:isNew?"":post.title,
        content:isNew?"":post.content,
        excerpt:isNew?"":post.excerpt,
        category:isNew?3:post.category,
        tag:isNew?"":post.tag,
        keywords:isNew?keywords.keywords:post.keywords,
        slug: isNew? "":post.slug,
        thumbnail:isNew?"":post.thumbnail,
        is_show:isNew?1:post.is_show,
        is_top:isNew?1:post.is_top,
        is_featured:isNew?0:post.is_featured,
        published_at:isNew?formatinputDate(new Date()):post.published_at,
        is_continue:isNew?1:post.is_continue,
        is_restore:"false"
        })
        const draftKey = isNew ? 'draft-post-new' : `draft-post-${form.id}`

        useEffect(() => {
            get(draftKey).then((saved) => {
              if (saved) {
                setForm(saved)
                console.log('Draft restored:', draftKey)
              }
            })
          }, [])
        
          useEffect(() => {
            const saveDraft = setTimeout(() => {
              set(draftKey, form)
              console.log('Draft saved:', draftKey)
            }, 1000)
            return () => clearTimeout(saveDraft)
          }, [form])
    const  handleChangeData = (e)=>{  
        const key = e.target.id
        const value =e.target.value
        setForm({...form,[key]: value})
    }

    const handleSubmit  = async(e,showValue)=>{
        NProgress.start()
        e.preventDefault()
        setForm((prev) => ({ ...prev, is_show: showValue }))
        try {
            await trigger({ ...form, is_show: showValue })
            console.log('投稿成功:', data)
            await del(draftKey) // 投稿成功時下書きを削除
            await mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/posts`)
            //await mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/edit?postid=${postId}`)
            router.push('/admin')
            
        } catch (err) {
            console.error(err)
        }finally{
            NProgress.done()
        }
    }
    if(!blogCategories) return <>Loading</>
    return(
        <>
            {/* CKFinder Script */}
            <Script
                src="/ckfinder/ckfinder.js"
                strategy="afterInteractive" // ページがインタラクティブになった後に読み込み
                onLoad={() => {
                console.log('CKFinder script loaded')
                }}
            />
            <CKFinderLoader />
            <form onSubmit={handleSubmit} method='post' id='form' className='form_control blogEditor_form encType="multipart/form-data"' >
                <div className='blogEditor_form_main'>
                    <div  className="form_control_item">
                        <label htmlFor="title" >Title</label>
                        <input type="text" id="title" className="form_control_item_input" value={form.title} 
                            onChange={handleChangeData} maxLength={30}/>                        
                    </div>     
                    <div className="form_control_item post_content">
                        <label htmlFor="content"  style={{marginBottom:'20px'}} >Content</label>
                        <div className='article_content' id="content">
                            <ClientSideCustomEditor form={form} setForm={setForm}/>
                        </div>                     
                    </div>
                </div>
                <div className='blogEditor_form_sub'>
                    <div  className="form_control_item showTop">
                        <input type='checkbox'
                            name="is_top"
                            checked={form.is_top}
                            id="is_top"
                            onChange={(e) =>{setForm({...form,'is_top':e.target.checked}) } } className='form_control_item_checkbox'/>
                            <label htmlFor="is_top">Show on Home</label>
                    </div>
                    <div  className="form_control_item showTop">
                        <input type='checkbox'
                            name="is_featured"
                            checked={form.is_featured}
                            id="is_featured"
                            onChange={(e) =>{setForm({...form,'is_featured':e.target.checked}) } } className='form_control_item_checkbox'/>
                            <label htmlFor="is_top">Pin</label>
                    </div>
                    <div  className="form_control_item">
                        <label htmlFor="published_at">Publish Date</label>
                        <input type='datetime-local' className="form_control_item_select" 
                            value={formatinputDate(form.published_at)}
                            name='published_at' id='published_at' onChange={handleChangeData} />
                    </div>
                    <div  className="form_control_item">
                        <label htmlFor="category">Category</label>
                        <select className="form_control_item_select" value={form.category}
                            name='category' id='category' onChange={
                                (e)=>{
                                    handleChangeData(e)
                                }}>
                          
                            {blogCategories.map((category,i)=>{
                                if(category !==""){
                                    return category && <option value={i} key={i}>{category.name}</option>
                                }
                            })}
                        
                        </select>
                    </div>
                    <div  className="form_control_item">
                        <label htmlFor="tag" >Tag</label>
                        <input list="tags" name="tag" id="tag" 
                            className='form_control_item_input' value={form.tag ?? ""} onChange={(e)=>handleChangeData(e)}  />
                        <datalist id="tags">
                            {tags.map((tag, key)=>(<option value={tag.tag} key={key} />))}
                        </datalist>
                    </div>
                    <div  className="form_control_item">
                        <label htmlFor="keywords" >Keywords</label>
                        <textarea id="keywords" name='keywords' className="form_control_item_input"  
                        rows="5" value={form.keywords} onChange={(e)=>handleChangeData(e)}  />
                    </div>
                    <div  className="form_control_item">
                        <label htmlFor="slug" >Slug</label>
                        <textarea id="slug" name='slug' className="form_control_item_input" required
                        rows="5" value={form.slug ?? ""} onChange={(e)=>handleChangeData(e)}  />
                    </div>
                    <div  className="form_control_item">
                        <label htmlFor="thumbnail" style={{marginBottom:'20px'}} >Thumbnail</label>
                        <ClientSideCustomEditor form={form} setForm={setForm} thumbnail={true}/>
                    </div>
                    <div  className="form_control_item"  style={{marginTop:'20px'}}>
                        <label htmlFor="excerpt" >Excerpt</label>
                        <textarea id="excerpt" name='excerpt' className="form_control_item_input"  
                        rows="5" value={form.excerpt ?? ""} onChange={handleChangeData}  maxLength={40} />
                    </div>

                </div>
                </form>
                <button type="button" className='form_control_item_submit' id="is_show" value="0"   onClick={(e) => handleSubmit(e, 0)} >
                    Draft
                </button> 
                <button type="button" className='form_control_item_submit' id="is_show" value="1"   onClick={(e) => handleSubmit(e, 1)} >
                    {isNew ? "Publish": "Update"}
                </button>  
        </>
    )

}

//export  default ClientSideCustomEditor;
