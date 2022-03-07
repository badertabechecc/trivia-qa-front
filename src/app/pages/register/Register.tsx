/* eslint-disable react/no-children-prop */
import { FormEvent, useState } from 'react';

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Avatar,
  FormControl,
  InputLeftAddon,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

import { registerUser } from '../../api';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  name: HTMLInputElement;
  lastName: HTMLInputElement;
  tel: HTMLInputElement;
}

interface RegisterFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Register = () => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<RegisterFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const email = event.currentTarget.elements.email.value;
    const name = event.currentTarget.elements.name.value;
    const lastName = event.currentTarget.elements.lastName.value;
    const phone = event.currentTarget.elements.tel.value;

    try {
      setError(false);

      const auth = await registerUser({ email, name, lastName, phone });

      setCookie(null, 'trivia-qa-token', auth.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      router.push(`/quiz`);
    } catch (err) {
      setError(true);
      setLoading(false);
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="blue.500" />
        <Heading color="blue.400">Welcome</Heading>
        <Box width="250px" borderRadius="sm">
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" borderRadius="md">
              {error ? <Text color="red.600">Email already in use</Text> : null}
              <FormControl>
                <InputGroup>
                  <Input mr="4px" id="name" type="text" placeholder="Sherlock" required />

                  <Input ml="4px" id="lastName" type="lastName" placeholder="Holmes" required />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon children="+34" />
                  <Input type="tel" placeholder="611428921" id="tel" required />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input id="email" type="email" required placeholder="sholmes@gmail.com" />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius="md"
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
                isLoading={isLoading}
              >
                Start
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
