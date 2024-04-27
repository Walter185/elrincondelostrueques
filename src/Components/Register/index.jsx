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
  import { Card } from '../Card'
  import DividerWithText from '../DividerWithText'
  import { Layout } from '../Layout/Layout'
  import { useAuth } from '../../Context/context'
  import { useNavigate } from 'react-router-dom'
  
  
  export default function Registerpage() {
    let navigate = useNavigate();
    const { signInWithGoogle } = useAuth()
    const { register } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const mounted = useRef(false)
  
    useEffect(() => {
      mounted.current = true
      return () => {
        mounted.current = false
      }
    }, [])
  
    return (
      <Layout>
        <Heading textAlign='center' my={12}>
          Register
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
              // your register logic here
              setIsSubmitting(true)
              register(email, password)
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
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type='submit'
                colorScheme='pink'
                size='lg'
                fontSize='md'
                isLoading={isSubmitting}
              >
                Sign up
              </Button>
            </Stack>
          </chakra.form>
          <Center my={4}>
            <Button variant='link' onClick={() => navigate('/login')}>
              Login
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
            Sign in with Google
          </Button>
        </Card>
      </Layout>
    )
  }
  