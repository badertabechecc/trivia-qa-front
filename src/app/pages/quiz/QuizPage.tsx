import { useState } from 'react';

import { Flex, Heading, Stack, Box, Center, VStack, Text, Button } from '@chakra-ui/react';

import { checkAnswer } from 'app/api';
import { IQuestions } from 'app/api/types';
import Answer from 'app/components/answer';

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

function Quiz(props: IProps) {
  const [answerSelected, setAnswerSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
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
      } catch (err) {
        console.error(err);
      }
    }

    setAnswerSelected(null);
    setPage(page + 1);
  };

  const selectAnswer = (num: number) => {
    setAnswerSelected(num);
  };

  if (page >= props.data.length) {
    return (
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.700"
        justifyContent="center"
        alignItems="center"
      >
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
                    You scored {props.user.score}/{props.data.length}
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
      height="100vh"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems="center"
      color="gray.700"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center" spacing={3} w={['85%', '85%', 500]}>
        <Box borderRadius="lg" width="100%">
          <Stack spacing={4} p="1rem" borderRadius="md">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold" color="gray.600">
                Question {page + 1}/{props.data.length}
              </Text>
              <Box
                fontWeight="bold"
                color="white"
                paddingX="8px"
                paddingY="2px"
                borderRadius="full"
                backgroundColor="blue.500"
                width="fit-content"
              >
                01:30
              </Box>
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
        {page >= props.data.length - 1 ? (
          <Button isLoading={isLoading} colorScheme="blue" onClick={handleNext}>
            Submit
          </Button>
        ) : (
          <Button isLoading={isLoading} colorScheme="blue" onClick={handleNext}>
            Next
          </Button>
        )}
      </Stack>
    </Flex>
  );
}

export default Quiz;
