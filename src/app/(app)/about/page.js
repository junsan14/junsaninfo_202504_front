'use client'
import React from 'react'
import { Radar,RadarChart, PolarGrid,Tooltip, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import Image from 'next/image'
import { useState } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState("front")
  const toggle = (e) => {
   setIsVisible(e.target.id)
  }

  return (
      <>
            <section className="section about wrap">
              <h1 className="section_title">
                <div className="section_title_jp">ABOUTs</div>
              </h1>
                     
              <div className="section_content about_content">
                <h2 className="section_content_title">
                  PROFILE
                </h2>
                <div className="profile">
                  <div className="profile_icon">
                    <Image src='/profile.png' className="profile_icon_img" alt="" width={150} height={150} priority/>
                    <div className="profile_icon_desc">
                      <p >junsan14</p>
                      <p>ホテル業界4年､WEB業界2年</p>
                      <p>JICA海外協力隊<br />2024年第1次隊ルワンダ</p>
                      
                    </div>
                    <div className="profile_icon_desc">
                      <p>好きなもの</p>
                      <p>バスケ,Mac,ドラクエ<br/>自然､海,お酒,温泉</p>

                      
                    </div>
                  </div>
                  <div className="profile_biography">
                    <dl>
                      <dt>1992</dt>
                      <dd>大阪で生まれ､高校まで過ごす</dd>
                      <dt>2011</dt>
                      <dd>大学入学を機に上京､工学部情報システム専攻</dd>
                      <dt>2014</dt>
                      <dd>留学への強い憧れがあり､国際教養学部へ転部</dd>
                      <dt>2016</dt>
                      <dd>ロンドンに留学し、日本の言語/文化交流のコミュニティ JLCE設立し2年弱滞在</dd>
                      <dt>2018</dt>
                      <dd>帰国後、星野リゾートに入社、4年間河口湖のほとりで過ごす</dd>
                      <dt>2022</dt>
                      <dd>転職後､WEBディレクター兼エンジニアとして東京で活動</dd>
                      <dt>2024 <br className="sp-display"/>Jan-Mar</dt>
                      <dd>JICAグローカルプログラム第3期愛媛県伊予市活動</dd>
                      <dt>2024 <br className="sp-display"/>April-July</dt>
                      <dd>JICA海外協力隊二本松訓練所にて語学訓練</dd>
                      <dt>2024 <br className="sp-display"/>Sep-Now</dt>
                      <dd>JICA海外協力隊24年第1期コンピュータ技術 <br className="sp-display"/>
                        ルワンダ東部ガツィボ郡ムフラセクター<br className="sp-display"/>
                        セント・アレクサンドレ・サウリ技術高等学校 活動中</dd>
                    </dl>
                  </div>
                </div>

                <h2 className="section_content_title">
                  SKILL
                </h2>
                <div className="skill">
                  <ul className="skill_tab tab">
                    <li className={`skill_tab_li ${isVisible === "front" ? "on" : ""}`} tabIndex="-1" id="front" onClick={toggle}>FrontEnd</li>
                    <li className={`skill_tab_li ${isVisible === "back" ? "on" : ""}`} tabIndex="-1" id="back" onClick={toggle}>BackEnd</li>
                    <li className={`skill_tab_li ${isVisible === "other" ? "on" : ""}`} tabIndex="-1" id="other" onClick={toggle}>Adobe/Tools</li>
                  </ul>
                  <div className="skill_content">
                      <div className={`skill_content_item ${isVisible === "front" ? "show" : ""}`}>
                        <div className="skill_content_item_graph skill_graph">
                          <FrontSKillGraph />
                        </div>
                        <div className="skill_content_item_desc skill_desc">
                           <p>5: どんな処理も基本的に対応可能</p>
                           <p>4: 実務経験が豊富にあり､人に指南可能</p>
                           <p>3: 1人でリファレンスみながら実装可能</p>
                           <p>2: 基本的な処理の理解あるが､1人では対応困難</p>
                           <p>1: 少し触れたレベルで､スキル向上の余地多くあり</p>
                        </div>
                      </div>
                      <div className={`skill_content_item ${isVisible === "back" ? "show" : ""}`}>
                        <div className="skill_content_item_graph skill_graph">
                          <BackSKillGraph />
                        </div>
                        <div className="skill_content_item_desc skill_desc">
                           <p>5: どんな処理も基本的に対応可能</p>
                           <p>4: 実務経験が豊富にあり､人に指南可能</p>
                           <p>3: 1人でリファレンスみながら実装可能</p>
                           <p>2: 基本的な処理の理解あるが､1人では対応困難</p>
                           <p>1: 少し触れたレベルで､スキル向上の余地多くあり</p>
                        </div>
                      </div>
                      <div className={`skill_content_item ${isVisible === "other" ? "show" : ""}`}>
                        <div className="skill_content_item_graph skill_graph">
                          <OtherSkillGraph />
                        </div>
                        <div className="skill_content_item_desc skill_desc">
                           <p>5: Toolマスター</p>
                           <p>4: 実務使用経験があり、複雑な機能も使用可能</p>
                           <p>3: 機能の多くを理解、ある程度1人で操作可能</p>
                           <p>2: 基本的な機能は使用しているが、それまで</p>
                           <p>1: 少し触れたレベルで､機能理解の余地多くあり</p>
                        </div>
                      </div>
                  </div>

                </div>
              </div>
            </section>
      </>
  )
}


/*
const enginerSkill = [
    {
      subject: 'CODING',
      A: 4.0,
      fullMark: 5,
    },
    {
      subject: 'Front',
      A: 3.3,
      fullMark: 5,
    },
    {
      subject: 'Back',
      A: 3,
      fullMark: 5,
    },
    {
      subject: 'Mobile App',
      A: 1.5,
      fullMark: 5,
    },
    {
      subject: 'CMS',
      A: 4,
      fullMark: 5,
    },
    {
      subject: 'DB',
      A: 2.75,
      fullMark: 5,
    },
    {
      subject: 'SNS API',
      A: 3,
      fullMark: 5,
    },
  ]
*/
  
  const frontSkill = [
      {
        subject: 'HTML/CSS/SASS',
        A: 4.5,
        fullMark: 5,
      },
      {
        subject: 'JavaScript',
        A: 4.5,
        fullMark: 5,
      },
      {
        subject: 'jQuery',
        A: 4.5,
        fullMark: 5,
      },
      {
        subject: 'Google App Script',
        A: 4.5,
        fullMark: 5,
      },
      {
        subject: 'React',
        A: 4,
        fullMark: 5,
      },
      {
        subject: 'Git',
        A: 3.5,
        fullMark: 5,
      },
  
    ]
  
  
  const backSkill = [
    {
      subject: 'PHP',
      A: 3,
      fullMark: 5,
    },
    {
      subject: 'Laravel',
      A: 4,
      fullMark: 5,
    },
    {
      subject: 'Wordpress',
      A: 3.5,
      fullMark: 5,
    },
    {
      subject: 'mySQL',
      A: 3.5,
      fullMark: 5,
    },
    {
      subject: 'firebase',
      A: 2.5,
      fullMark: 5,
    },
    {
      subject: 'API接続',
      A: 3,
      fullMark: 5,
    },
  ]
  
  
  const otherSkill = [
    {
      subject: 'PSD',
      A: 3.0,
      fullMark: 5,
    },
    {
      subject: 'XD',
      A: 4.0,
      fullMark: 5,
    },
    {
      subject: 'AI',
      A: 2.5,
      fullMark: 5,
    },
    {
      subject: 'git',
      A: 4,
      fullMark: 5,
    },
    {
      subject: 'gulp',
      A: 4,
      fullMark: 5,
    },
    {
      subject: 'webpack',
      A: 3,
      fullMark: 5,
    },
  
  ]
  
    function CustomTooltip({ label, active }) {
      if (active) {
        return (
          <div className="custom-tooltip">
            <p className="label">
              {getIntroOfPage(label)}
            </p>  
          </div>
        )
      } 
      return null
    }
    const getIntroOfPage = (label) => {
      switch(label){
        case "CODING":
          return(
            <>
             HTML5/ CSS3/ SASS/ Responsive<br/>
            </>
          )
        case "Front":
          return(
            <>
            JS/ jQuery/ Google Apps Script/ React <br/>  
            </>
          )
        case "Back":
          return (
            <>
              PHP/ Laravel<br />
            </>
          )
        case "CMS":
          return(
            <>
              Wordpress<br />
            </>
    
          )
        case "Mobile App":
          return(
            <>
              React Native<br />          
            </>
          )
        case "DB":
          return(
            <>
              mySQL/ firebase<br />
              
            </>
          )
        case "SNS API":
          return(
            <>
              Twitter/ Instagram<br />           
            </>
          )
        case "HTML/CSS/SASS":
          return(
            <>
              疑似要素/ ポジション/ ransition/ animation/ filter<br />
              リファレンスなしで基本的に実装可能
              
            </>
          )
        case "JavaScript":
          return(
            <>
              タブ/ アコーディオン/ スライダー/ プルダウン/ イベント/ 非同期 <br />
              繰り返し/条件分岐/配列など基本は習得済
            </>
          )
        case "jQuery":
          return(
            <>
              jsと同じ理解度<br />
                        
            </>
          )
        case "Google App Script":
          return(
            <>
              onOpen/ onEdit/ SpreadSheeptApp / Webアプリ <br />
              jsで一番得意｡SpreadSheetsと連携し､WEBアプリ作成経験あり
            </>
          )
        case "React":
          return(
            <>
             JSX/ Babel/ useState/ useEffect/ SPA/ Render<br />
             クラスコンポーネントの理解もあるが､16.8以降基本はフックのみ使用
              
            </>
          )
        case "RN":
          return(
            <>
              一度触れたことがあるのみで経験はあまりないが､
              ページの遷移など基本的な理解あり
            </>
          )
        case "PHP":
          return(
            <>
              一度フルスクラッチで､ユーザのCRUD処理を
              一から実装経験あり(一応セキュリティ実装も)          
            </>
          )
        case "Laravel":
          return(
            <>
              <a href='https://hotelier-front.com/'>Hotelier</a>の
              WEBアプリ構築経験あり     
            </>
          )
        case "Wordpress":
          return(
            <>
              自作テーマ作成の経験あり<br />
              基本的なWP特有のPHPの書き方の理解
            </>
          )
        case "mySQL":
          return(
            <>
              SQL構文/ Laravel Eloquentの操作経験あり   
            </>
          )
        case "firebase":
          return(
            <>
              React NativeのDBとして連携経験あり   
            </>
          )
        case "API":
          return(
            <>
              Twitter/ Instagramのapi組み込み経験あり
            </>
          )
        case "PSD":
          return(
            <>
             レイヤーの理解､スライスなど基本的な操作理解あり
            </>
          )
        case "XD":
          return(
            <>
              アニメーション/レイヤー/コンポーネントなどある程度複雑な操作理解あり   
            </>
          )
        case "AI":
          return(
            <>
              PSDより操作経験なし
            </>
          )
        case "gulp":
          return(
            <>
              Frameworkなしの際､関数を作成しホットリロードやSass/jsコンパイルなどの理解あり 
            </>
          )
        case "webpack":
          return(
            <>
              gulpより理解は低いが､リファレンス見ながら操作経験あり   
            </>
          )
        case "git":
          return(
            <>
              sourcetree/コマンドどちらも操作経験あり。   
            </>
          )
  
        case "2011":
          return(
            <>
              情報システム工学科入学 
            </>
          )
        case "2012":
          return(
            <>
              留学に行きたい気持ちが強まる
            </>
          )
        case "2013":
          return(
            <>
              転学決意、再受験勉強
            </>
          )  
        case "2014":
          return(
            <>
              国際教養学部合格
            </>
          )
        case "2015":
          return(
            <>
              イギリスへ留学
            </>
          )
        case "2016":
          return(
            <>
              帰国
            </>
          )
        case "2017":
          return(
            <>
              就職活動、卒業論文
            </>
          )
        case "2018":
          return(
            <>
              星野リゾート入社
            </>
          )
        case "2019":
          return(
            <>
              河口湖を満喫
            </>
          )
        case "2020":
          return(
            <>
              将来の不安を感じ転職活動
            </>
          )
        case "2021":
          return(
            <>
              転職活動
            </>
          )
        case "2022":
          return(
            <>
              転職し、WEBエンジニアとして勤務
            </>
          )
        case "2023":
          return(
            <>
              人生について思考中
            </>
          )
        case "2024":
          return(
            <>
              JICA海外協力隊ルワンダ活動中
            </>
          )
        case "2025-Jan":
        return(
          <>
            ややマンネリ化
          </>
        )
        default:
      }
      
      return ''
    }
  /*
    function EnginerSkillGraph(){
      return (
          <ResponsiveContainer width="100%" height={400}> 
            <RadarChart cx="50%" cy="50%"
              outerRadius="80%"
              data={enginerSkill}
            >
              <Tooltip content={<CustomTooltip />}/>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[1, 5]} />
              <Legend />
              <Radar
                name="Skill"
                dataKey="A"
                stroke="#111"
                fill="#eee"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
      )
    }
  */
    function FrontSKillGraph(){
      return (
  
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart
              outerRadius="80%"
              data={frontSkill}
            >
              <Tooltip content={<CustomTooltip />}/>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[1, 5]} />
              <Radar
                name="jun"
                dataKey="A"
                stroke="#111"
                fill="#eee"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
      )
    }
    function BackSKillGraph(){
      return (
  
          <ResponsiveContainer width="100%" height={400} >
            <RadarChart
              outerRadius="80%"
              data={backSkill}
            >
              <Tooltip content={<CustomTooltip />}/>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[1, 5]} />
              <Radar
                name="jun"
                dataKey="A"
                stroke="#111"
                fill="#eee"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
      )
    }
  
    function OtherSkillGraph(){
      return (
          <ResponsiveContainer width="100%" height={400} >
            <RadarChart
              outerRadius="80%"
              data={otherSkill}
            >
              <Tooltip content={<CustomTooltip />}/>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[1, 5]} />
              <Radar
                name="jun"
                dataKey="A"
                stroke="#111"
                fill="#eee"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
      )
    }
  /*
  const bidographyData = [
  
    {
      "year": "2011",
      "Motivation": 80,
    },
    {
      "year": "2012",
      "Motivation": 100,
    },
  
    {
      "year": "2013",
      "Motivation": 70,
    },
    {
      "year": "2014",
      "Motivation": -50,
    },
    {
      "year": "2015",
      "Motivation": 80,
    },
    {
      "year": "2016",
      "Motivation": 100,
    },
    {
      "year": "2017",
      "Motivation": 30,
    },
    {
      "year": "2018",
      "Motivation": 0,
    },
    {
      "year": "2019",
      "Motivation": 80,
    },
    {
      "year": "2020",
      "Motivation": 70,
    },
    {
      "year": "2021",
      "Motivation": -60,
    },
    {
      "year": "2022",
      "Motivation": 80,
    },
    {
      "year": "2023",
      "Motivation": 20,
    },
    {
      "year": "2024-Sep",
      "Motivation": 100,
    },
    {
      "year": "2025-Jan",
      "Motivation": 75,
    },
  ]
*/