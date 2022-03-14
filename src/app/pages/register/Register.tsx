import { useState } from 'react';

import { Button } from '@chakra-ui/button';
import { Box, Stack, Flex, Text } from '@chakra-ui/layout';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import * as Yup from 'yup';

import { registerUser } from 'app/api';
import FormElement from 'app/components/FormElement';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  return (
    <Formik
      initialValues={{ name: '', lastName: '', email: '', position: '', company: '', tel: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Name required')
          .min(2, 'Name is too short')
          .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g, 'Name can only contain letters.'),
        lastName: Yup.string()
          .required('Last name is required')
          .min(2, 'Last name is too short')
          .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g, 'Last name can only contain letters.'),
        email: Yup.string().required('Email required').email('invalid email').required('email required'),
        tel: Yup.string()
          .max(9, 'Phone number is too long')
          .matches(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/g, 'Invalid phone number'),

        company: Yup.string()
          .required('Company name required')
          .min(2, 'Company name is too short')
          .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g, 'Company name can only contain letters.'),
        position: Yup.string()
          .required('Position is required')
          .min(2, 'Position name is too short')
          .matches(
            /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
            'Position name can only contain letters.'
          ),
      })}
      onSubmit={async (values) => {
        setLoading(true);

        try {
          const auth = await registerUser({
            email: values.email,
            name: values.name,
            lastName: values.lastName,
            phone: values.tel,
            position: values.position,
            company: values.company,
          });

          setCookie(null, 'trivia-qa-token', auth.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });

          router.push(`/quiz`);
        } catch (err) {
          setLoading(false);
          setError(true);
          if (err instanceof Error) {
            console.error(err.message);
          }
        }
      }}
    >
      {(formik) => (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%">
          <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
            <Box width="250px" borderRadius="sm">
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" borderRadius="md">
                  {error ? <Text color="red.600">Email already in use</Text> : null}
                  <FormElement name="name" type="text" placeholder="Sherlock" label="First Name" />
                  <FormElement name="lastName" type="text" placeholder="Holmes" label="Last Name" />
                  <FormElement name="tel" type="number" placeholder="611428921" label="Phone number" />

                  <FormElement name="email" type="email" placeholder="sholmes@gmail.com" label="Email" />
                  <FormElement name="position" type="text" placeholder="Manual Tester" label="Position" />
                  <FormElement name="company" type="text" placeholder="Capitole Consulting" label="Company" />

                  <Button
                    disabled={!(formik.isValid && formik.dirty)}
                    borderRadius="md"
                    type="submit"
                    variant="solid"
                    colorScheme="blue"
                    width="full"
                    bg="brand.500"
                    isLoading={isLoading}
                    _hover={{ bg: 'blue.700' }}
                    _active={{
                      bg: 'blue.700',
                    }}
                  >
                    Start
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
}

export default App;
