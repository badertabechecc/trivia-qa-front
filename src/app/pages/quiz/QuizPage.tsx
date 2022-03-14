import { useState } from 'react';

import { Flex, Heading, Stack, Box, Center, VStack, Text, Button } from '@chakra-ui/react';

import { checkAnswer } from 'app/api';
import { IQuestions } from 'app/api/types';
import Answer from 'app/components/Answer2';

export interface IUserInfo {
  token: string;
  id: string;
  numQuestion: number;
  score: number;
  questionsAsked: string[] | undefined;
}
interface IProps {
  data: IQuestions;
  token: string;
  user: IUserInfo;
}

const NUM_OF_QUESTIONS = 10;

function Register(props: IProps) {
  const [answerSelected, setAnswerSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(props.user.numQuestion);
  const [user, setUser] = useState(props.user);
  const [isLoading, setLoading] = useState(false);

  const handleNext = async () => {
    if (typeof answerSelected === 'number') {
      setLoading(true);
      const body = {
        userId: user.id,
        answerId: props.data[page].answers[answerSelected]._id,
        questionId: props.data[page]._id,
      };

      try {
        const user = await checkAnswer({ body, token: props.token });

        setUser({
          token: props.token,
          id: user.id,
          numQuestion: user.numQuestion,
          score: user.score,
          questionsAsked: user.questionsAsked,
        });
        setLoading(false);
        setQuestionsAsked(questionsAsked + 1);
        setPage(page + 1);
        setAnswerSelected(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const selectAnswer = (num: number) => {
    if (num === answerSelected) {
      setAnswerSelected(null);
    } else {
      setAnswerSelected(num);
    }
  };

  if (questionsAsked >= NUM_OF_QUESTIONS) {
    return (
      <Flex flexDirection="column" width="100wh" height="100%" flex="2" justifyContent="center" alignItems="center">
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Box borderRadius="lg">
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius="md"
              height="280px"
            >
              <Center height="100%">
                <VStack>
                  <Heading size="md" text-align="center">
                    You scored {user.score}/{NUM_OF_QUESTIONS}
                  </Heading>
                  <p>Thanks for participating!</p>
                </VStack>
              </Center>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100%"
      justifyContent="center"
      alignItems="center"
      color="gray.700"
      flex="2"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        w={['85%', '85%', 500]}
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
        borderRadius="md"
        pb={4}
      >
        <Box borderRadius="lg" width="100%">
          <Stack spacing={4} p="1rem" borderRadius="md">
            <Flex justifyContent="space-between" alignItems="center" borderBottom="2px" borderColor="brand.500">
              <Text fontWeight="bold" color="gray.600" py={2}>
                Question {questionsAsked + 1}/{NUM_OF_QUESTIONS}
              </Text>
            </Flex>
            <Center>
              <Heading size="md" textAlign="center">
                {props.data[page].question}
              </Heading>
            </Center>
          </Stack>
        </Box>

        <Box width="100%" borderRadius="lg">
          <Stack spacing={4} p="1rem" borderRadius="md">
            {props.data[page].answers.map((a, index) => (
              <Answer
                key={a._id}
                answer={a.answer}
                selectAnswer={selectAnswer}
                answerSelected={answerSelected}
                index={index}
              />
            ))}
          </Stack>
        </Box>
        <Button
          borderRadius="md"
          type="submit"
          variant="solid"
          colorScheme="blue"
          bg="brand.500"
          isLoading={isLoading}
          _hover={{ bg: 'blue.700' }}
          _active={{
            bg: 'blue.700',
          }}
          onClick={handleNext}
        >
          {page >= props.data.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Stack>
    </Flex>
  );
}

export default Register;
