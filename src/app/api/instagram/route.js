// app/api/instagram/route.js
export async function GET() {
    const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN
    const get_count = 9 //取得したい投稿数
    const apiURL = `https://graph.instagram.com/v22.0/me/media?fields=id,media_type,media_url,username,timestamp,caption&limit=${get_count}&access_token=${ACCESS_TOKEN}`
    const res = await fetch(apiURL)
    const data = await res.json()
  
    return Response.json(data)
  }