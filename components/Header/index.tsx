import Link from '../../Hoc/ActiveLink'
import { FC, useEffect, useState } from 'react'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { useRouter } from 'next/router'

import classes from './header.module.scss'
import FormDialog from './authDialog'

const Header: FC = () => {
  const [auth, setAuth] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [name, setName] = useState('')

  const [openModal, setOpenModal] = useState(false)

  const router = useRouter()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    localStorage.clear()
    setAuth(false)
    setName('')
    setAnchorEl(null)
  }

  const handleClickToProfile = () => {
    router.push('/profile')
  }

  const handleClickToTechHelp = () => {
    router.push('/techHelp')
  }

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogged')
    const name = localStorage.getItem('userName')
    if (isLogin && name) {
      setAuth(true)
      setName(name)
    }
  }, [])

  return (
    <div className={classes.header}>
      {openModal ? (
        <FormDialog
          open={openModal}
          setName={setName}
          setOpen={setOpenModal}
          setAuth={setAuth}
        />
      ) : null}
      <AppBar color="transparent" position="static">
        <div className="container">
          <Toolbar>
            <div className={classes.wrapper}>
              <nav>
                <Link activeClassName="activeLink" href="/">
                  <a className="link">Main</a>
                </Link>
                <Link activeClassName="activeLink" href="/colorSheme">
                  <a className="link">Color Sheme</a>
                </Link>
              </nav>
              <div className={classes.authBlock}>
                {auth ? (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle fontSize={'large'} />
                    </IconButton>
                    {name}
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClickToProfile}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleClickToTechHelp}>
                        Tech help
                      </MenuItem>
                      <MenuItem onClick={logout}>Log out</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => setOpenModal(true)}
                      color="inherit"
                    >
                      <AccountBoxIcon fontSize={'large'} />
                    </IconButton>
                    Auth
                  </>
                )}
              </div>
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  )
}
export default Header
