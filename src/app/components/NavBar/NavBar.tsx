import { Center, Image } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Center>
      <Image
        alt="logo capitole"
        width="150px"
        height="auto"
        py={4}
        src="https://cas2019.agile-spain.org/wp-content/uploads/2019/10/Logo-Capitole.png"
      />
    </Center>
  );
};
export default NavBar;
