import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Divider,
  Flex,
  AbsoluteCenter,
  Text,
} from '@chakra-ui/react';
import supabase from '@/api/supabase';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClick = () => setShowPassword(!showPassword);

  async function signInWithKakao() {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <Box p="10px 5%" bg="purple.50">
      <Box bgColor="white" p={5} minHeight="1000px" w="90%" maxW="700px" m="0 auto">
        <Box p="50px">
          <Flex m="auto 0" flexDirection="column" justifyContent="center">
            <Flex m="0 auto">
              <Image src="/public/name_logo.png" w="500px" />
            </Flex>

            <Flex m="0 auto" w="80%" flexDirection="column" gap="30px">
              <Flex flexDirection="column" gap="15px">
                <Input placeholder="아이디(휴대폰 또는 이메일)" />
                <InputGroup size="md">
                  <Input pr="4.5rem" type={showPassword ? 'text' : 'password'} placeholder="비밀번호" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>

              <Button colorScheme="brand">로그인</Button>
              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  또는
                </AbsoluteCenter>
              </Box>

              <Flex m="0 auto" onClick={signInWithKakao}>
                <Image src="public/kakaoLogin.png" role="button" />
              </Flex>
              <Flex m="0 auto" w="60%" justifyContent="space-between">
                <Link to="/detail">
                  <Text>아이디 찾기</Text>
                </Link>
                <Link to="/detail">
                  <Text>비밀번호 찾기</Text>
                </Link>
                <Link to="/detail">
                  <Text> 회원가입</Text>
                </Link>
                <Link to="/">
                  <Text onClick={signOut}> 로그아웃</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
