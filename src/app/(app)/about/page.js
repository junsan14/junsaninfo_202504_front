import Image from 'next/image'
import { SkillGrapah } from '@/components/SkillGraph'
export default function About() {
  return (
      <>
            <section className="section about wrap">
              <h1 className="section_title">
                <div className="section_title_jp">ABOUT</div>
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
                <SkillGrapah />
              </div>
            </section>
      </>
  )
}

export const metadata = {
  title: 'junsan14｜ABOUT',
}