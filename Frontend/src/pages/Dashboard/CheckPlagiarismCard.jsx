import React, { useState } from "react";
import Card from "../../components/Utility/Card";
import {
    Button,
    HStack,
    Heading,
    Spacer,
    Text,
    useToast,
    Textarea,
    VStack,
    Box,
    Tag,
} from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import {
    MdDeleteOutline,
    MdOutlineEdit,
    MdOutlineRemoveRedEye,
} from "react-icons/md";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Link,
} from "@chakra-ui/react";
import { MdOutlineManageSearch } from "react-icons/md";
const CheckPlagiarismCard = ({ paper }) => {
    // Paper Attributes
    const [title, setTitle] = useState(paper.title);
    const [authors, setAuthors] = useState(paper.authors);
    const [keywords, setKeywords] = useState(paper.keywords);
    const [introduction, setIntroduction] = useState(paper.introduction);
    const [problemStatement, setProblemStatement] = useState(
        paper.problem_statement_and_objectives
    );
    const [literatureReview, setLiteratureReview] = useState(
        paper.literature_review
    );
    const [methodology, setMethodology] = useState(paper.methodology);
    const [bibliography, setBibliography] = useState(paper.bibliography);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    const [zeroLoading, setZeroLoading] = useState(false);
    const [oneLoading, setOneLoading] = useState(false);
    const [twoLoading, setTwoLoading] = useState(false);

    const [showOne, setShowOne] = useState(false);
    const [showTwo, setShowTwo] = useState(false);

    const [data, setData] = useState(null);
    const [levelOneData, setLevelOneData] = useState(null)
    const [levelTwoData, setLevelTwoData] = useState(null)

const checkTwo = async () => {
    setTwoLoading(true);
    const response = await fetch(
        `http://localhost:5000/plagiarism/leveltwo/${paper._id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "auth-token": sessionStorage.getItem("secretKey"),
            },
        }
    );
    const data = await response.json();
    setLevelTwoData(data);
    console.log(levelTwoData);
    setTwoLoading(false);
    if (data.mean > 15) {
        toast({
            title: "Error!",
            description: "Plagiarism Found, Please Reduce and Check Again",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    } else {
        toast({
            title: "Success!",
            description: "Proceed Level 2 Check",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        // setShowTwo(true);
    }
};

    const checkOne = async()=>{
        setOneLoading(true);
        const response = await fetch(
            `http://localhost:5000/plagiarism/levelone/${paper._id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "auth-token":sessionStorage.getItem("secretKey")
                },
            }
        );
        const data = await response.json()
        setLevelOneData(data)
        console.log(levelOneData);
        setOneLoading(false);
        if (data.mean > 20) {
            toast({
                title: "Error!",
                description: "Plagiarism Found, Please Reduce and Check Again",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success!",
                description: "Proceed Level 2 Check",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setShowTwo(true);
        }

    }


    const checkZero = async () => {
        setZeroLoading(true);
        const response = await fetch(
            "http://127.0.0.1:8000/level0GooglePlagiarism",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    sus: {
                        sus_title: title,
                        sus_ps_obj: problemStatement,
                        sus_introduction: introduction,
                        sus_keywords: keywords,
                        sus_proposed_method: methodology,
                    },
                    type: 0,
                    apikey: "AIzaSyBzLQiTsvKVY_HlF7qDn0o7OO-_HD-iyDc",
                }),
            }
        );
        const data = await response.json();
        setData(data);
        console.log(data);
        setZeroLoading(false);
        for(let i=0;i<data.urlresponse_list.length;i++){
            if(data.urlresponse_list[i].similarity*100>15){
                toast({
                    title: "Error!",
                    description:
                        "Plagiarism Found in one of the sources, Please Reduce and Check Again",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
        }
        if(data.google_similarity_score>0.2){
            toast({
                title: "Error!",
                description: "Plagiarism Found, Please Reduce and Check Again",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success!",
                description: "Proceed Level 1 Check",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setShowOne(true)
        }
    };

    return (
        <Card>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size="xl"
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Check Plagiarism</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Button
                                w="full"
                                onClick={checkZero}
                                isLoading={zeroLoading}
                                loadingText="Checking Level 0 Plagiarism..."
                            >
                                Check For Level 0 Plagiarism
                            </Button>
                            {data !== null && (
                                <Accordion allowToggle w="full">
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box
                                                    as="span"
                                                    flex="1"
                                                    textAlign="left"
                                                >
                                                    Level Zero Plagiarism Report{" "}
                                                    {"( " +
                                                        data.google_similarity_score *
                                                            100 +
                                                        "% )"}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <VStack align="left">
                                                {data != null &&
                                                    data.urlresponse_list.map(
                                                        (url) => {
                                                            return (
                                                                <HStack>
                                                                    <Link
                                                                        href={
                                                                            url.url
                                                                        }
                                                                    >
                                                                        {url.url
                                                                            .length >
                                                                        40
                                                                            ? url.url.substring(
                                                                                  0,
                                                                                  40
                                                                              ) +
                                                                              "..."
                                                                            : url.url}
                                                                    </Link>
                                                                    <Spacer />
                                                                    <Tag
                                                                        colorScheme={
                                                                            url.similarity *
                                                                                100 >
                                                                            15
                                                                                ? "red"
                                                                                : "orange"
                                                                        }
                                                                    >
                                                                        <Text>
                                                                            {url.similarity *
                                                                                100 +
                                                                                "%"}
                                                                        </Text>
                                                                    </Tag>
                                                                </HStack>
                                                            );
                                                        }
                                                    )}
                                            </VStack>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            )}
                            {showOne && (
                                <Button
                                    w="full"
                                    onClick={checkOne}
                                    isLoading={oneLoading}
                                    loadingText="Checking Level 1 Plagiarism..."
                                >
                                    Check For Level 1 Plagiarism
                                </Button>
                            )}
                            {levelOneData !== null && showOne && (
                                <Accordion allowToggle w="full">
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box
                                                    as="span"
                                                    flex="1"
                                                    textAlign="left"
                                                >
                                                    Level One Plagiarism Report
                                                    {" ( "}
                                                    {(levelOneData.mean != null
                                                        ? levelOneData.mean.toFixed(
                                                              2
                                                          )
                                                        : "0") + "%" + " )"}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <VStack align="left">
                                                {levelOneData.data !== null &&
                                                    levelOneData.data.map(
                                                        (u) => {
                                                            return (
                                                                <HStack>
                                                                    <Link
                                                                        href={
                                                                            "http://localhost:3000/paper/" +
                                                                            u.id
                                                                        }
                                                                        target="_blank"
                                                                    >
                                                                        {"http://localhost:3000/paper/" +
                                                                            u.id}
                                                                    </Link>
                                                                    <Spacer />
                                                                    <Tag
                                                                        colorScheme={
                                                                            u.plagiarism >
                                                                            15
                                                                                ? "red"
                                                                                : "orange"
                                                                        }
                                                                    >
                                                                        <Text>
                                                                            {u.plagiarism.toFixed(
                                                                                2
                                                                            ) +
                                                                                "%"}
                                                                        </Text>
                                                                    </Tag>
                                                                </HStack>
                                                            );
                                                        }
                                                    )}
                                            </VStack>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            )}

                            {/* Level Two */}
                            {showTwo && (
                                <Button
                                    w="full"
                                    onClick={checkTwo}
                                    isLoading={twoLoading}
                                    loadingText="Checking Level 2 Plagiarism..."
                                >
                                    Check For Level 2 Plagiarism
                                </Button>
                            )}
                            {levelTwoData !== null && showTwo && (
                                <Accordion allowToggle w="full">
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box
                                                    as="span"
                                                    flex="1"
                                                    textAlign="left"
                                                >
                                                    Level Two Plagiarism Report{" ( "}
                                                    {(levelTwoData.mean != null? levelTwoData.mean.toFixed(2): "0") + "%" + " )"}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <VStack align="left">
                                                {levelTwoData != null &&
                                                    levelTwoData.data.map(
                                                        (u) => {
                                                            return (
                                                                <HStack>
                                                                    <Text>
                                                                        {u.id}
                                                                    </Text>
                                                                    <Spacer />
                                                                    <Tag
                                                                        colorScheme={
                                                                            u.plagiarism >
                                                                            15
                                                                                ? "red"
                                                                                : "orange"
                                                                        }
                                                                    >
                                                                        <Text>
                                                                            {u.plagiarism.toFixed(
                                                                                2
                                                                            ) +
                                                                                "%"}
                                                                        </Text>
                                                                    </Tag>
                                                                </HStack>
                                                            );
                                                        }
                                                    )}
                                            </VStack>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <HStack>
                <Text fontWeight="medium">
                    {paper.title.length === 0 && "(No Title)"}
                    {paper.title.length > 100
                        ? paper.title.substring(0, 100) + "..."
                        : paper.title}
                </Text>
                <Spacer />
                <Button
                    leftIcon={<MdOutlineManageSearch />}
                    onClick={onOpen}
                    colorScheme="yellow"
                >
                    Check Plagiarism
                </Button>
            </HStack>
        </Card>
    );
};

export default CheckPlagiarismCard;
