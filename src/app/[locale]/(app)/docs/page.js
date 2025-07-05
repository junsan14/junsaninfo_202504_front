'use client'
import { useEffect, useState } from 'react'
import {BsFiletypePpt, BsFiletypeHtml, BsFiletypeCss, BsFiletypeJs, BsFiletypeJsx, BsFiletypePhp } from "react-icons/bs"
import {useTranslations} from 'next-intl'

export default function Docs() {
  const t = useTranslations('Common')
  const [sections, setSections] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = ['html', 'css', 'js', 'php', 'react']

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category)
    try {
      const res = await fetch(`/data/${category}.json`)
      if (!res.ok) throw new Error('Fetch failed')
      const data = await res.json()
      setSections(data)
    } catch (err) {
      console.error(err)
      setSections([])
    }
  }

  // 初回読み込みでHTMLを選択
  useEffect(() => {
    handleCategoryClick('html')
  }, [])

  // 再帰的にセクションを描画
  const renderSection = (item) => {
    if (Array.isArray(item)) {
      return (
        <ul className="docs_files_section_list">
          {item.map((subItem, i) => (
            <li key={i} className="docs_files_section_list_item">
              {'name' in subItem && 'url' in subItem ? (
                <a
                  href={subItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="docs_files_section_list_item_link"
                >
                  { !('format' in subItem)  &&<BsFiletypePpt />} 
                  {subItem.format === "html" &&<BsFiletypeHtml/>} 
                  {subItem.format === "css" &&<BsFiletypeCss/>} 
                  {subItem.format === "php" &&<BsFiletypePhp />}
                  {subItem.format === "js" &&<BsFiletypeJs />} 
                  {subItem.format === "jsx" &&<BsFiletypeJsx />} 
                  {subItem.name}
                </a>
              ) : (
                renderSection(subItem)
              )}
            </li>
          ))}
        </ul>
      )
    } else if (typeof item === 'object') {
      return Object.entries(item).map(([title, content], idx) => (
        <div key={idx} className="docs_files_section">
          <h3 className="docs_files_section_title">{title}</h3>
          {renderSection(content)}
        </div>
      ))
    } else {
      return null
    }
  }

  return (
    <section className="section docs wrap">
      <h1 className="section_title">
        <p className="section_title_jp">Documents</p>
      </h1>

      {/* カテゴリタブ */}
      <ul className="category-tab">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`docs ${selectedCategory === cat ? 'on' : ''}`}
            tabIndex="-1"
            onClick={() => handleCategoryClick(cat)}
            style={{ cursor: 'pointer' }}
          >
            {cat.toUpperCase()}
          </li>
        ))}
      </ul>

      {/* ファイル一覧 */}
      <div className="docs_files">
        {sections.length === 0 && selectedCategory && <p> {t('error')} </p>}

        {sections.map((sectionObj, idx) => (
          <div key={idx} className="docs_files_section">
            {renderSection(sectionObj)}
          </div>
        ))}
      </div>
    </section>
  )
}
