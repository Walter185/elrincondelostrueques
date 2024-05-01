import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Card } from '../Card/index'
import DividerWithText from '../DividerWithText/index'
import { Layout } from '../Layout/Layout'
import { useAuth } from '../../Context/context'
import useMounted from '../hooks/useMounted'
import { auth } from '../../Firebase/firebase'

export default function Loginpage() {
  let navigate = useNavigate();
  const { login } = useAuth()
  const { signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const location = useLocation()
  const mounted = useMounted()
  const { currentUser } = useAuth();

  function handleRedirectToOrBack() {
    navigate(location.state?.from ?? '/show')
  }

  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        No hay Plata | Iniciar sesión
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()
            if (!email || !password) {
              toast({
                description: 'Credentials not valid.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return
            }
            // your login logic here
            setIsSubmitting(true)
            login(email, password)
              .then(res => {
                handleRedirectToOrBack()
                // alert(auth.currentUser.uid);

              })
              .catch(error => {
                console.log(error.message)
                toast({
                  description: error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              })
              .finally(() => {
                // setTimeout(() => {
                //   mounted.current && setIsSubmitting(false)
                //   console.log(mounted.current)
                // }, 1000)
                mounted.current && setIsSubmitting(false)
              })
          }}
        >
          <Stack spacing='6'>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                name='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                name='password'
                type='password'
                autoComplete='password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button
              type='submit'
              colorScheme='pink'
              size='lg'
              fontSize='md'
              isLoading={isSubmitting}
            >
              Ingresar
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent='space-between' my={4}> 
          <Button variant='link'>
            <Link to='/forgot-password'>Forgot password?</Link>
          </Button> 
          <Button variant='link' onClick={() => navigate('/register')}>
            Registrarse
          </Button>
          </HStack>
          <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant='outline'
          colorScheme='red'
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then(user => {
                handleRedirectToOrBack()
              // alert(auth.currentUser.uid);  
                console.log(user)
              })
              .catch(e => console.log(e.message))
          }
        >
          Ingrese con Google
        </Button>
      </Card>
    </Layout>
  )
}
