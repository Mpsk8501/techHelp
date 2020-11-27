import classes from './colorSheme.module.scss'
import { styleList } from '../../styleChangeDist'
import { FC } from 'react'

const ColorShemeComponent: FC = () => {
  return (
    <div className={classes.colorSheme}>
      <div className="container">
        <h1 className="h1">Color Sheme Component</h1>
        <section>
          <ul>
            {Object.keys(styleList['blue_base']).map((item, index) => {
              return (
                <li key={index}>
                  <span>{item}</span>
                  <span style={{ background: `var(${item})` }}></span>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default ColorShemeComponent
