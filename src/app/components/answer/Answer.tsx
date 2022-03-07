import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';

interface IAnswer {
  answer: string;
  selectAnswer: (num: number) => void;
  answerSelected: number | null;
  index: number;
}

const Answer = (props: IAnswer) => {
  const handleClick = async () => {
    props.selectAnswer(props.index);
  };

  return (
    <Button
      onClick={() => handleClick()}
      colorScheme={props.answerSelected === props.index ? 'green' : undefined}
      variant='outline'
      display='flex'
      justifyContent='space-between'
      _hover={{ bg: 'transparent' }}
      _active={{
        bg: 'transparent',
        borderColor: 'green',
        color: 'green',
      }}
      borderColor={
        props.answerSelected === props.index ? 'green.500' : 'grey.700'
      }
      color={props.answerSelected === props.index ? 'green.500' : 'grey.700'}
    >
      {props.answer}
      {props.answerSelected === props.index ? (
        <CheckCircleIcon color='green.500' />
      ) : (
        <Box
          height='16px'
          width='16px'
          borderRadius='999999'
          border='1px'
          borderColor='gray.700'
        ></Box>
      )}
    </Button>
  );
};

export default Answer;
