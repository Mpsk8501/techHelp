import { FC } from 'react'
import classes from './mainPage.module.scss'
const MainPageComponent: FC = () => {
  return (
    <div className={classes.mainPage}>
      <div className="container">
        <main>
          <h1 className="h1">Main Page</h1>
        </main>
      </div>
    </div>
  )
}
export default MainPageComponent
