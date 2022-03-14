import { ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';

import NavBar from '../NavBar';

interface IProps {
  children: ReactNode;
}
const Layout = ({ children }: IProps) => (
  <Flex flexDirection="column" width="100wh" minHeight="100vh" backgroundColor="gray.200">
    <NavBar />
    {children}
  </Flex>
);

export default Layout;
