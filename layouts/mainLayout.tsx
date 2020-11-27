import { useEffect, FC } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ChangedStyle from '../components/changeStyle'
import { styleList, fontSizeList } from '../styleChangeDist'

const MainLayout: FC = ({ children }) => {
  const getStyle = () => {
    const mainComponent = document.querySelector(':root')
    if (localStorage.getItem('customPreset')) {
      const newCustomStyle = JSON.parse(localStorage.getItem('customPreset'))
      for (let key in newCustomStyle) {
        // @ts-ignore
        mainComponent.style.setProperty(key, newCustomStyle[key])
      }
    }
    const newStyle = localStorage.getItem('style')
    const newFontSize = localStorage.getItem('fontSize')
    if (!!styleList[newStyle]) {
      for (let key in styleList[newStyle]) {
        // @ts-ignore
        mainComponent.style.setProperty(key, styleList[newStyle][key])
      }
    }
    if (!!fontSizeList[newFontSize]) {
      for (let key in fontSizeList[newFontSize]) {
        // @ts-ignore
        mainComponent.style.setProperty(key, fontSizeList[newFontSize][key])
      }
    }
  }

  useEffect(() => {
    getStyle()
  }, [])

  return (
    <>
      <Head>
        <title>Sass test</title>
        <meta name="description" content="null" />
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;1,500&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex-wrapper">
        <Header />
        {children}
      </div>
      <Footer />
      <ChangedStyle />
    </>
  )
}

export { MainLayout }
