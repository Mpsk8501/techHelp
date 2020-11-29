import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_NAME, REGISTER_USER } from '../querries/user'
import client from '../components/ApolloClient'

const onComplitedF = (e = {}) => {
  console.log(e)
  let message = ''
  if (e.data) {
    if (e.data.viewer) {
      message = 'You login'
      return message
    } else {
      message = 'Wrong login or pass'
    }
  } else {
    message = 'Error load'
  }
  console.log('ddd', e)
  localStorage.removeItem('baseToken')
  localStorage.removeItem('isLogged')
  return message
}

const useAuth = () => {
  const { refetch } = useQuery(GET_USER_NAME, {
    onCompleted: () => {
      refetch.bind(this)
    },
    client,
  })

  return {
    refetch,
  }
}

let onComplitedS = (e) => {
  let message = ''
  console.log(e)
  if (e.data.registerUser) {
    if (e.data.registerUser.user.username) {
      message = 'You registered'
      return message
    } else {
      message = 'Wrong login or pass'
    }
  } else {
    message = 'Error load'
  }
  localStorage.removeItem('baseToken')
  localStorage.removeItem('isLogged')
  return message
}

const useRegister = ({ userName, userPass, userMail }) => {
  const [registerUser, { data }] = useMutation(REGISTER_USER, {
    variables: {
      input: {
        username: userName,
        password: userPass,
        email: userMail,
      },
    },
    onCompleted: (e) => {
      //onComplitedS(e)
    },
    onError: () => {
      localStorage.removeItem('baseToken')
      localStorage.removeItem('isLogged')
    },
    client,
  })
  return registerUser
}

export { useAuth, onComplitedF, useRegister, onComplitedS }
