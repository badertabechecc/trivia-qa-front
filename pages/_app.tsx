import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import Layout from 'app/components/Layout';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
};
const theme = extendTheme({
  colors: {
    brand: {
      100: 'black',
      200: 'green',
      300: 'tomato',
      400: 'black',
      500: '#1E397C', //
      600: '#0A2464',
      700: 'black',
    },
    blue: {
      500: '#1E397C',
    },
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
              ...activeLabelStyles,
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
