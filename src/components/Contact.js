'use client'

import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

const sendContact = async (url, { arg }) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
      credentials: 'include',
    })
  
    if (!res.ok) {
      throw new Error('送信に失敗しました')
    }
  
    return res.json()
  }

export default function Contact() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        subject:'',
        message: '',
      })

    const { trigger, data, error, isMutating } = useSWRMutation(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/send`,
        sendContact
    )
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          await trigger(form)
          alert('送信成功！')
        } catch (err) {
          console.error(err)
        }
    }
  return (
        <div className="section_content contact_content">
            <form onSubmit={handleSubmit} className="form_control" id="form">
                <div className="form_control_item">
                    <label htmlFor="name">NAME</label>
                    <input 
                            id="name"
                            type="text"
                            name="name"
                            className="form_control_item_input"
                            autoComplete="name"
                            value={form.name}
                            onChange={(e)=>setForm({ ...form, name: e.target.value })}
                        />
                </div>
                <div className="form_control_item">
                    <label htmlFor="email">EMAIL</label>
                    <input
                            id="email"
                            type="email"
                            name="email"
                            className="form_control_item_input"
                            autoComplete="email"             
                            value={form.email}
                            onChange={(e)=>setForm({...form, email:e.target.value})}
                        />
                </div>

                <div className="form_control_item">
                    <label htmlFor="subject">SUBJECT</label>
                    <input
                            id="subject"
                            type="text"
                            name="email"
                            className="form_control_item_input"
                            autoComplete="subject"
                            
                            value={form.subject}
                            onChange={(e)=>setForm({...form, subject:e.target.value})}
                        />
                </div>
            
                <div className="form_control_item">
                    <label htmlFor="content">MESSAGE</label>
                    <textarea id="content" className="form_control_item_input" rows="10" name="content"
                            required
                            onChange={(e)=>setForm({...form, message:e.target.value})}
                            value={form.content}
                     />
                </div>
                    
                <button className="form_control_item_submit" >
                {isMutating ? 'SENDING...' : 'SEND'}
                </button>
                {error && <p className="text-red-500 mt-2">送信に失敗しました。</p>}
                {data && <p className="text-green-500 mt-2">送信が成功しました！</p>}
                
            </form>
        </div>
  
  )
}


