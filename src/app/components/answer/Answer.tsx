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
      colorScheme={props.answerSelected === props.index ? 'blue' : undefined}
      variant={props.answerSelected === props.index ? 'solid' : 'outline'}
      bg={props.answerSelected === props.index ? 'blue.400' : 'transparent'}
      display="flex"
      justifyContent="space-between"
    >
      {props.answer}
      {props.answerSelected === props.index ? (
        <CheckCircleIcon color="white" />
      ) : (
        <Box height="16px" width="16px" borderRadius="999999" border="1px" borderColor="gray.700"></Box>
      )}
    </Button>
  );
};

export default Answer;
