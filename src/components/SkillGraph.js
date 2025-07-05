'use client'
import React from 'react'
import { Radar,RadarChart, PolarGrid,Tooltip, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { useState } from 'react'
import {useTranslations} from 'next-intl'

export function SkillGrapah() {
  const [isVisible, setIsVisible] = useState("front")
  const t = useTranslations('About')
  const toggle = (e) => {
   setIsVisible(e.target.id)
  }

  return (
      <>
        <div className="skill">
            <ul className="category-tab">
            <li className={`${isVisible === "front" ? "on" : ""}`} tabIndex="-1" id="front" onClick={toggle}>FrontEnd</li>
            <li className={`${isVisible === "back" ? "on" : ""}`} tabIndex="-1" id="back" onClick={toggle}>BackEnd</li>
            <li className={`${isVisible === "other" ? "on" : ""}`} tabIndex="-1" id="other" onClick={toggle}>Adobe/Tools</li>
            </ul>
            <div className="skill_content">
                <div className={`skill_content_item ${isVisible === "front" ? "show" : ""}`}>
                <div className="skill_content_item_graph skill_graph">
                    <FrontSKillGraph />
                </div>
                <div className="skill_content_item_desc skill_desc">
                    <p> {t('skills.front.5')} </p>
                    <p> {t('skills.front.4')} </p>
                    <p> {t('skills.front.3')} </p>
                    <p> {t('skills.front.2')} </p>
                    <p> {t('skills.front.1')} </p>
                </div>
                </div>
                <div className={`skill_content_item ${isVisible === "back" ? "show" : ""}`}>
                <div className="skill_content_item_graph skill_graph">
                    <BackSKillGraph />
                </div>
                <div className="skill_content_item_desc skill_desc">
                    <p> {t('skills.front.5')} </p>
                    <p> {t('skills.front.4')} </p>
                    <p> {t('skills.front.3')} </p>
                    <p> {t('skills.front.2')} </p>
                    <p> {t('skills.front.1')} </p>
                </div>
                </div>
                <div className={`skill_content_item ${isVisible === "other" ? "show" : ""}`}>
                <div className="skill_content_item_graph skill_graph">
                    <OtherSkillGraph />
                </div>
                <div className="skill_content_item_desc skill_desc">
                    <p> {t('skills.other.5')} </p>
                    <p> {t('skills.other.4')} </p>
                    <p> {t('skills.other.3')} </p>
                    <p> {t('skills.other.2')} </p>
                    <p> {t('skills.other.1')} </p>
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
        subject: 'API',
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
      subject: 'API with BackEnd',
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
    const t = useTranslations('About')
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
            { t('skills.comment.html') }   
          </>
        )
      case "JavaScript":
        return(
          <>
            { t('skills.comment.JavaScript') }
          </>
        )
      case "Google App Script":
        return(
          <>
            { t('skills.comment.GAS') }
          </>
        )
      case "React.js":
        return(
          <>
            { t('skills.comment.reactjs') }
          </>
        )
        case "Next.js":
          return(
            <>
              { t('skills.comment.nextjs') }
            </>
          )
          case "API":
            return(
              <>
                { t('skills.comment.API') }
              </>
            )
        case "CI/CD":
          return(
            <>
              { t('skills.comment.CI/CO') }
            </>
          )
      case "PHP":
        return(
          <>
            { t('skills.comment.PHP') }       
          </>
        )
      case "Laravel":
        return(
          <>
            { t('skills.comment.Laravel') }    
          </>
        )
      case "Wordpress":
        return(
          <>
            { t('skills.comment.Wordpress') }
          </>
        )
      case "mySQL":
        return(
          <>
            { t('skills.comment.mySQL') } 
          </>
        )
      case "firebase":
        return(
          <>
            { t('skills.comment.firebase') }
          </>
        )
      case "API with BackEnd":
        return(
          <>
            { t('skills.comment.API2') }
          </>
        )
      case "PSD":
        return(
          <>
            { t('skills.comment.psd') }
          </>
        )
      case "XD":
        return(
          <>
            { t('skills.comment.xd') }
          </>
        )
      case "AI":
        return(
          <>
            { t('skills.comment.ai') }
          </>
        )
      case "gulp":
        return(
          <>
            { t('skills.comment.gulp') }
          </>
        )
      case "webpack":
        return(
          <>
            { t('skills.comment.webpack') }  
          </>
        )
      case "git":
        return(
          <>
            { t('skills.comment.git') }
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