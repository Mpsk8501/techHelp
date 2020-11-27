import classes from './changeStyle.module.scss'
import React, { useEffect, useRef, useState, FC, LegacyRef } from 'react'
import { styleList, fontSizeList } from '../../styleChangeDist'
import SelectAuto from './SelectAuto'
import Slider from '@material-ui/core/Slider'

const ChangedStyle: FC = () => {
  const [elStyle, setElStyle] = useState<boolean>(false)
  const [isPreset, setIsPreset] = useState<boolean>(true)
  const [linkActive, setLinkActive] = useState<boolean>(false)

  const [siteStyle, setSiteStyle] = useState<string>('blue_base')
  const [fontSize, setFontSize] = useState<string>('baseFont')
  const [variable, setVariable] = useState<string>('--main-color')

  const [colorHue, setColorHue] = useState<number>(0)
  const [colorSaturation, setColorSaturation] = useState<number>(0)
  const [colorLightness, setColorLightness] = useState<number>(0)
  const [colorAlpha, setColorAlpha] = useState<number>(1)

  const [newPreset, setNewPreset] = useState<Object>({})

  const coloredElRef = useRef<HTMLHeadingElement>(null)

  const handleSelectChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    localStorage.removeItem('customPreset')
    setLinkActive(false)
    if (e.target.value === 'blue_base') {
      localStorage.removeItem('style')
    } else {
      localStorage.setItem('style', value)
    }
    const mainComponent = document.querySelector(':root')
    for (let key in styleList[value]) {
      //@ts-ignore
      mainComponent.style.setProperty(key, styleList[value][key])
    }

    setSiteStyle(e.target.value)
  }

  const handleSelectChangeFontSize = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    if (e.target.value === 'baseFont') {
      localStorage.removeItem('fontSize')
    } else {
      localStorage.setItem('fontSize', value)
    }
    const mainComponent = document.querySelector(':root')
    for (let key in fontSizeList[value]) {
      //@ts-ignore
      mainComponent.style.setProperty(key, fontSizeList[value][key])
    }
    setFontSize(e.target.value)
  }

  const handleSelectChangeVariable = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const mainComponent = document.querySelector(':root')
    const color = getComputedStyle(mainComponent).getPropertyValue(
      e.target.value
    )

    if (color.trim() === '#000') {
      setColorHue(0)
      setColorSaturation(0)
      setColorLightness(0)
      setColorAlpha(1)
      setVariable(e.target.value)
      return
    } else if (color.trim() === '#fff') {
      setColorHue(0)
      setColorSaturation(0)
      setColorLightness(100)
      setColorAlpha(1)
      setVariable(e.target.value)
      return
    }
    const colorArrNum = color.split(',').map((item, index) => {
      if (index === 3) {
        return +item.slice(0, -1)
      }
      //@ts-ignore
      return parseInt(item.match(/\d+/))
    })

    setColorHue(colorArrNum[0])
    setColorSaturation(colorArrNum[1])
    setColorLightness(colorArrNum[2])
    setColorAlpha(colorArrNum[3])
    setVariable(e.target.value)
  }

  const presetHandler = (isTheme) => {
    if (isTheme) {
      setIsPreset(true)
    } else {
      setIsPreset(false)
    }
    setElStyle(true)
  }

  const sliderHandler1 = (event: any, newValue: number) => {
    setColorHue(Math.floor(newValue * 3.6))
    setVarColor()
  }
  const sliderHandler2 = (event: any, newValue: number) => {
    setColorSaturation(newValue)
    setVarColor()
  }
  const sliderHandler3 = (event: any, newValue: number) => {
    setColorLightness(newValue)
    setVarColor()
  }
  const sliderHandler4 = (event: any, newValue: number) => {
    setColorAlpha(newValue / 100)
    setVarColor()
  }

  const setVarColor = () => {
    const component = coloredElRef.current

    component.style.setProperty(
      '--color',
      `hsla(${colorHue}, 
      ${colorSaturation}%,
      ${colorLightness}%,
      ${colorAlpha} )`
    )
    const mainComponent = document.querySelector(':root')
    //@ts-ignore
    mainComponent.style.setProperty(
      variable,
      `hsla(${colorHue}, 
      ${colorSaturation}%,
      ${colorLightness}%,
      ${colorAlpha} )`
    )
  }

  const savePreset = () => {
    const newObj = { ...newPreset }
    newObj[
      variable
    ] = `hsla(${colorHue}, ${colorSaturation}%, ${colorLightness}%, ${colorAlpha})`
    setNewPreset(newObj)
  }

  const createPreset = () => {
    localStorage.removeItem('style')
    let preset = {}
    if (localStorage.getItem('customPreset')) {
      preset = {
        ...JSON.parse(localStorage.getItem('customPreset')),
        ...newPreset,
      }
    } else {
      preset = { ...styleList['blue_base'], ...newPreset }
    }
    localStorage.setItem('customPreset', JSON.stringify(preset))
    const file = new Blob([JSON.stringify(preset)], { type: 'appication/json' })
    const link = linkRef.current

    link.setAttribute('href', URL.createObjectURL(file))
    link.setAttribute('download', 'data.json')
    setLinkActive(true)
  }

  const linkRef = useRef(null)

  const linkHandler = () => {
    setLinkActive(false)
  }

  useEffect(() => {
    savePreset()
  }, [colorAlpha, colorHue, colorLightness, colorSaturation])

  useEffect(() => {
    const storageNewTheme = localStorage.getItem('style')
    const storageNewFontSize = localStorage.getItem('fontSize')
    if (storageNewTheme) {
      setSiteStyle(storageNewTheme)
    }
    if (storageNewFontSize) {
      setFontSize(storageNewFontSize)
    }
  }, [])

  return (
    <div className={elStyle ? classes.changeStyleOpen : classes.changeStyle}>
      {isPreset ? (
        <div className={classes.preset}>
          <h1 className="h1">Theme preset</h1>
          <SelectAuto
            label={'Theme'}
            value={siteStyle}
            handleChange={handleSelectChangeColor}
            itemList={Object.keys(styleList)}
          />
          <SelectAuto
            label={'fontSize'}
            value={fontSize}
            handleChange={handleSelectChangeFontSize}
            itemList={Object.keys(fontSizeList)}
          />
        </div>
      ) : (
        <div className={classes.custom}>
          <h1 className="h1" ref={coloredElRef}>
            Custom color
          </h1>
          <SelectAuto
            label={'Variable'}
            value={variable}
            handleChange={handleSelectChangeVariable}
            itemList={Object.keys(styleList['blue_base']).map((item) => item)}
          />
          <div className={classes.colorBlock}>
            <ul>
              <li>Hue</li>
              <li>Saturation</li>
              <li>Lightness</li>
              <li>Alpha</li>
            </ul>
            <ul>
              <li>{colorHue}</li>
              <li>{colorSaturation}</li>
              <li>{colorLightness}</li>
              <li>{colorAlpha}</li>
            </ul>
          </div>
          <div className={classes.sliderBlock}>
            <div className={classes.slider}>
              <Slider
                orientation="vertical"
                value={colorHue / 3.6}
                onChange={sliderHandler1}
                aria-labelledby="vertical-slider"
              />
            </div>
            <div className={classes.slider}>
              <Slider
                orientation="vertical"
                value={colorSaturation}
                onChange={sliderHandler2}
                aria-labelledby="vertical-slider"
              />
            </div>
            <div className={classes.slider}>
              <Slider
                orientation="vertical"
                value={colorLightness}
                onChange={sliderHandler3}
                aria-labelledby="vertical-slider"
              />
            </div>
            <div className={classes.slider}>
              <Slider
                orientation="vertical"
                value={colorAlpha * 100}
                onChange={sliderHandler4}
                aria-labelledby="vertical-slider"
              />
            </div>
          </div>
          <div className={classes.buttonBlock}>
            <button onClick={createPreset} className={'btn'}>
              Create custom preset
            </button>
            <a
              className={linkActive ? 'btn' : 'btn disabled'}
              onClick={linkHandler}
              ref={linkRef}
            >
              Download custom preset
            </a>
          </div>
        </div>
      )}
      <span className={classes.close} onClick={() => setElStyle(false)}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="11" fill={'#000000'} />
          <path d="M5 5L10.5385 11L16 5" stroke="white" strokeWidth="2" />
          <path d="M16 17L10.4615 11L5 17" stroke="white" strokeWidth="2" />
        </svg>
      </span>
      <span onClick={() => presetHandler(true)} className={classes.visiblePart}>
        Theme Preset
      </span>
      <span
        onClick={() => presetHandler(false)}
        className={classes.visiblePart}
      >
        Custom color
      </span>
    </div>
  )
}

export default ChangedStyle
