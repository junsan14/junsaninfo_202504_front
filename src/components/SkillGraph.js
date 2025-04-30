'use client'
import React from 'react'
import { Radar,RadarChart, PolarGrid,Tooltip, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

export function SkillGrapah() {
  const [isVisible, setIsVisible] = useState("front")
  const toggle = (e) => {
   setIsVisible(e.target.id)
  }

  return (
      <>
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
        subject: 'Google App Script',
        A: 4.5,
        fullMark: 5,
      },
      {
        subject: 'React.js',
        A: 4,
        fullMark: 5,
      },
      {
        subject: 'Next.js',
        A: 3.5,
        fullMark: 5,
      },
      {
        subject: 'API連携',
        A: 3,
        fullMark: 5,
      },
      {
        subject: 'CI/CD',
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
      subject: 'API連携',
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
            Instagram / Threads<br />           
          </>
        )
      case "HTML/CSS/SASS":
        return(
          <>
            HTML5のセマンティック要素を活用し、SEOやパフォーマンスを考慮した構造を意識。<br/>
            CSSはSassを使って効率的にスタイルを管理し、変数やミックスイン、ネストなどを活用して可読性の高いコード<br/>
            また、FlexboxやGridを使ったレイアウト、アニメーションやトランジションの実装も経験済
            
          </>
        )
      case "JavaScript":
        return(
          <>
            JavaScriptを使ったWebフロントエンド開発を普段からやっていて、DOM操作やイベント処理、<br/>
            非同期処理（async-await)など経験あり。配列、オブジェクト、ES6以降のモダンな書き方<br/>
            （Map、Set、デストラクチャリング、スプレッド構文など）にも対応
          </>
        )
      case "Google App Script":
        return(
          <>
            Google スプレッドシートや Google フォームと連携した業務自動化,<br/>
            時間ベースのトリガーを活用して、定期的なレポート生成やメール通知の自動化など経験あり。<br/>
            またdoGet / doPost を利用した Web アプリの開発にも取り組み、<br/>
            GAS と HTML/CSS/JavaScript を組み合わせた UI 付きの業務ツールを構築
          </>
        )
      case "React.js":
        return(
          <>
            JSX / Babel / useState / useEffect / SPA / Render<br/>
            クラスコンポーネントの理解もあるが、v16.8以降は基本的にフックを使用<br/>
            fetch / axios / SWRでAPIと連携し、非同期処理やキャッシュ管理を実装<br/>
            React Router v6でページ遷移・動的ルーティングを構築した経験あり
          </>
        )
        case "Next.js":
          return(
            <>
              Next.js（App Router）を用いた開発経験があり、サーバーコンポーネントとクライアントコンポーネントの使い分け、<br/>
              動的・静的ルーティングの実装に精通。useSWRやfetchを活用し、Laravel Breezeを用いた認証付きAPI連携も対応。<br/>
              画像最適化にはnext/imageを用い、Headやmetadata APIによるSEO対応も実施。Vercelへのデプロイ経験あり。
            </>
          )
          case "API連携":
            return(
              <>
                JavaScriptのfetchやaxiosを用いて外部APIと連携し、データの取得や送信<br/>
                また、非同期処理に関してはasync-awaitやPromiseを活用し、データ処理の効率化。
              </>
            )
        case "CI/CD":
          return(
            <>
              Gitを使用したバージョン管理に加え、Vercelを活用してのデプロイ,<br/>
              Laravelのプロジェクトでは、Webサーバに手動でのデプロイした経験あり
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