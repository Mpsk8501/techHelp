import { FC, useEffect, useState } from 'react'
import React from 'react'

import classes from '../profile.module.scss'
import { useUserData } from '../../../helpers/userData'
const UserDataComponent: FC = () => {
  const [userData, setUserData] = useState({})
  const { refetch } = useUserData()

  const loadUserData = async () => {
    const newUserData = await refetch()
    setUserData(newUserData)
    console.log(newUserData)
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return <div className={classes.userData}>Usr data</div>
}
export default UserDataComponent
