import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Card } from '../Card/index'
import DividerWithText from '../DividerWithText/index'
import { Layout } from '../Layout/Layout'
import { useAuth } from '../../Context/context'
import { useLocation, useNavigate } from 'react-router-dom'


export default function Registerpage() {
  let navigate = useNavigate();
  const { signInWithGoogle } = useAuth()
  const { register } = useAuth()
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const mounted = useRef(false)
  const location = useLocation()


  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  function handleRedirectToOrBack() {
    navigate(location.state?.from ?? '/show')
  }

  return (
    <Layout>
      <Heading textAlign='center' my={6}>
        Register
      </Heading>
      <Card maxW='md' mx='auto' mt={1}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()
            if (!email || !password) {
              toast({
                description: 'Falta email o contraseña',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return
            }
            // your register logic here
            setIsSubmitting(true)
            register(email, password, confirmPassword, nombre, apellido)
              .then(res => {})
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
                mounted.current && setIsSubmitting(false)
                handleRedirectToOrBack()

              })
          }}
        >
          <Stack spacing='2'>
          <FormControl id='nombre'>
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Ingrese nombre..."
                type='text'
                required
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </FormControl>
            <FormControl id='apellido'>
              <FormLabel>Apellido</FormLabel>
              <Input
                placeholder="Ingrese apellido..."
                type='text'
                required
                value={apellido}
                onChange={e => setApellido(e.target.value)}
              />
            </FormControl>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="Ingrese email..."
                type='email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Ingrese contraseña..."
                type='password'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id='confirmPassword'>
              <FormLabel>Confirme Password</FormLabel>
              <Input
                placeholder="Confirme su contraseña..."
                type='password'
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type='submit'
              colorScheme='pink'
              size='lg'
              fontSize='md'
              isLoading={isSubmitting}
            >
              Registrarse
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button variant='link' onClick={() => navigate('/login')}>
            Si ya tiene usuario ingrese aquí
          </Button>
        </Center>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant='outline'
          isFullWidth
          colorScheme='red'
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then(user => console.log(user))
              .catch(e => console.log(e.message))
          }
        >
          Ingrese con Google
        </Button>
      </Card>
    </Layout>
  )
}
