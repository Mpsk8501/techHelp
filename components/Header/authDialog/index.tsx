import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Switch from '@material-ui/core/Switch'
import CircularProgress from '@material-ui/core/CircularProgress'
import { validate } from '../../../helpers/formHelpers'
import delay from '../../../helpers/delay'
import {
  useAuth,
  onComplitedF,
  useRegister,
  onComplitedS,
} from '../../../helpers/auth'
import classes from '../header.module.scss'

const userForm = {
  userName: {
    validation: {
      required: true,
      minLength: 2,
      maxLength: 20,
    },
  },
  userPass: {
    validation: {
      required: true,
      minLength: 2,
      maxLength: 20,
    },
  },
  userMail: {
    validation: {
      required: true,
      email: true,
    },
  },
}

export default function FormDialog({ open, setOpen, setAuth, setName }) {
  const [isRegister, setIsRegister] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [message, setMessage] = useState('')

  const [formValid, setFormValid] = useState(false)

  const [userData, setUserData] = useState({
    userName: '',
    userPass: '',
    userMail: '',
  })

  const [validation, setValidation] = useState({
    userName: true,
    userPass: true,
    userMail: true,
  })

  const userChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidation({
      ...validation,
      [event.target.name]: true,
    })
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    })
  }

  const validationHandler = (event) => {
    setValidation({
      ...validation,
      [event.target.name]: validate(
        event.target.value,
        userForm[event.target.name].validation
      ),
    })
    validationFormHandler()
  }

  const validationFormHandler = () => {
    if (!isRegister) {
      setUserData({
        ...userData,
        userMail: '',
      })
      if (
        validation.userName &&
        validation.userPass &&
        userData.userName &&
        userData.userPass
      ) {
        setFormValid(true)
      } else {
        setFormValid(false)
      }
    } else {
      if (
        validation.userName &&
        validation.userPass &&
        validation.userMail &&
        userData.userName &&
        userData.userPass &&
        userData.userMail
      ) {
        setFormValid(true)
      } else {
        setFormValid(false)
      }
    }
  }

  const { refetch } = useAuth()

  const authHandler = async () => {
    const base64token = btoa(`${userData.userName}:${userData.userPass}`)
    localStorage.setItem('baseToken', base64token)
    localStorage.setItem('isLogged', 'true')
    setIsLoad(true)
    const querry = await refetch()
    setIsLoad(false)
    setMessage(onComplitedF(querry))
    await delay(1500)
    setMessage('')
    if (localStorage.getItem('isLogged')) {
      localStorage.setItem('userName', `${userData.userName}`)
      setName(userData.userName)
      setAuth(true)
      handleClose()
    }
  }

  const register = useRegister(userData)

  const registerHandler = async () => {
    const base64token = btoa(`${userData.userName}:${userData.userPass}`)
    localStorage.setItem('baseToken', base64token)
    localStorage.setItem('isLogged', 'true')
    setIsLoad(true)
    const querry = await register()
    setIsLoad(false)

    if (!querry) {
      setMessage('Error register')
    } else {
      console.log('ddd', querry)
      setMessage(onComplitedS(querry))
    }

    await delay(1500)
    setMessage('')
    if (localStorage.getItem('isLogged')) {
      localStorage.setItem('userName', `${userData.userName}`)
      setName(userData.userName)
      setAuth(true)
      handleClose()
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    validationFormHandler()
  }, [isRegister])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      {isLoad ? (
        <>
          <DialogTitle id="form-dialog-title">
            {!isRegister ? 'Auth' : 'Register'}
          </DialogTitle>
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        </>
      ) : (
        <>
          <DialogTitle id="form-dialog-title">
            {!isRegister ? 'Auth' : 'Register'}

            <Switch
              checked={isRegister}
              onChange={() => setIsRegister(!isRegister)}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {message}
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              {!isRegister
                ? 'To log in, enter your username and password'
                : 'To register, enter your username, email and password'}
            </DialogContentText>
            <TextField
              onBlur={validationHandler}
              error={!validation.userName}
              value={userData.userName}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              name="userName"
              onChange={userChangeHandler}
              helperText={
                !validation.userName ? 'enter between 2 and 20 characters' : ''
              }
              fullWidth
            />
            {isRegister ? (
              <TextField
                onBlur={validationHandler}
                error={!validation.userMail}
                value={userData.userMail}
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                name="userMail"
                onChange={userChangeHandler}
                helperText={
                  !validation.userMail ? 'the email must contain @' : ''
                }
              />
            ) : null}

            <TextField
              onBlur={validationHandler}
              error={!validation.userPass}
              value={userData.userPass}
              margin="dense"
              id="pass"
              label="Password"
              type="password"
              name="userPass"
              onChange={userChangeHandler}
              fullWidth
              helperText={!validation.userPass ? 'minimum of 6 characters' : ''}
            />
          </DialogContent>
          <DialogActions>
            {isRegister ? (
              <Button
                disabled={!formValid}
                onClick={registerHandler}
                color="primary"
              >
                Register
              </Button>
            ) : (
              <Button
                disabled={!formValid}
                onClick={authHandler}
                color="primary"
              >
                Auth
              </Button>
            )}
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
