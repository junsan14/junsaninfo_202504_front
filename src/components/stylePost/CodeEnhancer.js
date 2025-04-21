import { useEffect } from 'react'
import hljs from 'highlight.js'
//import 'highlight.js/styles/github.css' // 必要に応じてスタイルを変更

const CodeEnhancer = () => {
  useEffect(() => {
    const enhanceCodeBlocks = () => {
      document.querySelectorAll('pre').forEach((pre) => {
        if (pre.classList.contains('sub-content')) return
        const code = pre.querySelector('code')
        
        if (!code) return

        let language = code.className.replace('language-', '') || 'text'

        if (language === 'GoogleAppsScript') language = 'javascript'

        const wrapper = document.createElement('div')
        
        // languageを一度だけ追加
        wrapper.innerHTML = `
          <pre class="sub-content">
            <div class="markup-area-language_text">${language}</div>
            ${pre.innerHTML}
            <div class="markup-area-copy_text">copy</div>
          </pre>
        `

        pre.replaceWith(wrapper.firstElementChild)
      })

      // Highlight.js の処理
      if (typeof hljs !== 'undefined') {
        hljs.highlightAll()
      }

      // コピーボタンの動作
      document.querySelectorAll('.markup-area-copy_text').forEach((copyButton) => {
        copyButton.addEventListener('click', (event) => {
          const pre = event.target.closest('pre')
          const code = pre.querySelector('code').innerText

          // コピー処理
          navigator.clipboard.writeText(code).then(() => {
            event.target.textContent = 'copied'
            event.target.classList.add('copied')

            setTimeout(() => {
              event.target.textContent = 'copy'
              event.target.classList.remove('copied')
            }, 3000)
          })
        })
      })
    }

    enhanceCodeBlocks()
  }, [])

  return null
}

export default CodeEnhancer
