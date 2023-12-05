import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Input, Image, AspectRatio, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { PerformanceService } from '@/api/services/PerformanceService';
import { PerformanceSummary } from '@/api/services/PerformanceService.types';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchList, setSearchList] = useState<PerformanceSummary[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());

    // 검색어가 비어 있으면 모든 항목을 보여줍니다.
    if (!searchTerm) {
      setSearchList([]);
      return;
    }
  };

  const onClickSearchInput = async (searchTerm: string) => {
    const res = await PerformanceService.getList({
      stdate: '20230101',
      eddate: '2030630',
      cpage: '1',
      rows: '5',
      shprfnm: searchTerm,
    });
    setSearchList(res);
    console.log(searchList);
  };

  return (
    <Box p="10px 10%" bg="purple.50">
      <Box bgColor="white" fontSize="xl" minH="800px">
        <Flex p="20px">
          <Input
            placeholder="검색어를 입력해주세요."
            size="lg"
            borderColor="transparent"
            borderBottomWidth="2px"
            borderBottomColor="gray.600"
            // _hover={{ borderColor: 'gray.600' }}
            value={searchTerm}
            onChange={handleSearch}
            w="100%"
          />
          <Flex p="10px" m="0 auto">
            <Button onClick={() => onClickSearchInput(searchTerm)} colorScheme="brand">
              검색
            </Button>
          </Flex>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} p={{ base: 2, md: 4 }}>
          {searchList.map((performance, index) => (
            <Box key={index} m="20px" maxW="500px" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Link to={`/detail/${performance.mt20id}`}>
                <AspectRatio ratio={3 / 4}>
                  <Image src={performance.poster} alt={performance.prfnm} objectFit="cover" />
                </AspectRatio>
              </Link>

              <Box p="4">
                <Text fontSize="sm" color="gray.500" mb="1">
                  {performance.prfpdfrom} ~ {performance.prfpdto}
                </Text>

                <Link to={`/detail/${performance.mt20id}`}>
                  <Heading size="md" mb="1" fontSize="xl">
                    {performance.prfnm}
                  </Heading>
                </Link>

                <Text
                  noOfLines={1}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  fontWeight="bold"
                  color="brand.200"
                  pt={4}
                >
                  {performance.genrenm}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default SearchPage;
