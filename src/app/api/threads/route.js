// app/api/instagram/route.js
export async function GET() {
    const ACCESS_TOKEN = process.env.THREADS_ACCESS_TOKEN
    const get_count = 6//取得したい投稿数
    const apiURL = `https://graph.threads.net/v1.0/me/threads?fields=id,media_type,media_url,permalink,username,text,timestamp&limit=${get_count}&access_token=${ACCESS_TOKEN}`
    const res = await fetch(apiURL)
    const data = await res.json()
  
    return Response.json(data)
  }