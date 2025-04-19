import useSWRMutation from 'swr/mutation'
import { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { ClassicEditor } from 'ckeditor5'
import { editorConfiguration,editorConfigurationThumbnail } from '@/components/CustomEditor'
import CKFinderLoader from '@/components/CKFinderLoader'
import { formatinputDate } from '@/components/Script'
import { blogCategories } from '@/constants/blogCategories'
import { useRouter } from 'next/navigation'
import Script from 'next/script'


const sendData = async (url, { arg }) => {
  
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
        //credentials: 'include',
    })
    
    if (!res.ok) {
        throw new Error('送信に失敗しました')
    }
    
    return res.json()
}

export default function BlogEditor({postData}){
    /*
    useEffect(() => {
        // すでに読み込まれていたらスキップ
        if (window.CKFinder) return
    
        const script = document.createElement('script')
        script.src = '/ckfinder/ckfinder.js'
        script.async = true
    
        script.onload = () => {
          //console.log('CKFinder loaded')
          // CKFinder 初期化などここで安全に行える
        }
    
        document.body.appendChild(script)
    
        return () => {
          document.body.removeChild(script)
        }
      }, [])
    */
    const { trigger, data } = useSWRMutation(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/blog/post/store`,
            sendData
        )    
    const router = useRouter()
    const { post,tags,isNew,keywords } = postData
    const [form, setForm] = useState({
        id:isNew?"":post.id,
        title:isNew?"":post.title,
        content:isNew?"":post.content,
        excerpt:isNew?"":post.excerpt,
        category:isNew?5:post.category,
        tag:isNew?"":post.tag,
        keywords:isNew?keywords.keywords:post.keywords,
        thumbnail:isNew?"":post.thumbnail,
        is_show:isNew?1:post.is_show,
        is_top:isNew?1:post.is_top,
        published_at:isNew?formatinputDate(new Date()):post.published_at,
        is_continue:isNew?1:post.is_continue,
        is_restore:"false"
        })
    
    const  handleChangeData = (e)=>{  
        const key = e.target.id
        const value =e.target.value
        setForm({...form,[key]: value})
        
    }

    const handleSubmit  = async(e)=>{
        e.preventDefault()
       
        setForm({...form, is_show:e.target.value})
        try {
            await trigger(form)
            console.log('投稿成功:', data)
            router.push('/admin')
        } catch (err) {
            console.error(err)
        }
    }

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
                            <CKFinderLoader />
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfiguration}
                                id="content"
                                data={form.content}
                                onChange={ ( event, editor ) => {
                                    setForm({...form,"content":editor.getData()})
                                } }
                                onBlur={ ( event, editor ) => {
                                    setForm({...form,'content':editor.getData()})
                                }}
                            />
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
                    <div  className="form_control_item">
                        <label htmlFor="published_at">Publish Date</label>
                        <input type='datetime-local' className="form_control_item_select" 
                            value={formatinputDate(form.published_at)}
                            name='published_at' id='published_at' onChange={handleChangeData}/>
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
                                    return category && <option value={i} key={i}>{category}</option>
                                }
                            })}
                        </select>
                    </div>
                    <div  className="form_control_item">
                        <label htmlFor="tag" >Tag</label>
                        <input list="tags" name="tag" id="tag" 
                            className='form_control_item_input' value={form.tag} onChange={(e)=>handleChangeData(e)}  />
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
                        <label htmlFor="thumbnail" style={{marginBottom:'20px'}} >Thumbnail</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            config={ editorConfigurationThumbnail }
                            data={form.thumbnail}
                            onChange={ ( event, editor ) => {  
                                setForm({...form,'thumbnail':editor.getData()})
                            } }
                        />
                    </div>
                    <div  className="form_control_item"  style={{marginTop:'20px'}}>
                        <label htmlFor="excerpt" >Excerpt</label>
                        <textarea id="excerpt" name='excerpt' className="form_control_item_input"  
                        rows="5" value={form.excerpt} onChange={handleChangeData}  maxLength={40} />
                    </div>

                </div>
                </form>
                <button className='form_control_item_submit' id="is_show" value="0" onClick={handleSubmit}>
                    Draft
                </button> 
                <button className='form_control_item_submit' id="is_show" value="1" onClick={handleSubmit}>
                    Store
                </button>  
        </>
    )

}