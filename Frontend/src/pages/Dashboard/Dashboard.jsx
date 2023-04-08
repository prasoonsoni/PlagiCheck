import React, { useEffect, useState } from "react";
import {
    Stack,
    Input,
    Heading,
    FormControl,
    FormLabel,
    Text,
    Button,
    useToast,
    InputRightElement,
    InputGroup,
    toast,
    Skeleton,
    Textarea,
    VStack,
    HStack,
} from "@chakra-ui/react";
import Sidebar from "../../components/User/Sidebar";
import Card from "../../components/Utility/Card";
import Breadcrumbs from "../../components/Utility/Breadcrumbs";
import { useNavigate } from "react-router-dom";

import { BsPlusCircle } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

const Dashboard = () => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [keywords, setKeywords] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [problemStatement, setProblemStatement] = useState("");
    const [literatureReview, setLiteratureReview] = useState("");
    const [methodology, setMethodology] = useState("");
    const [bibliography, setBibliography] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const clearFields = () => {
        setTitle("");
        setAuthors("");
        setKeywords("");
        setIntroduction("");
        setProblemStatement("");
        setLiteratureReview("");
        setMethodology("");
        setBibliography("");
    };
    const createResearchPaper = async () => {
        setLoading(true);
        const result = await fetch(
            `http://localhost:5000/researchpaper/create`,
            {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    authors: authors,
                    keywords: keywords,
                    introduction: introduction,
                    problem_statement_and_objectives: problemStatement,
                    literature_review: literatureReview,
                    methodology: methodology,
                    bibliography: bibliography,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "auth-token": sessionStorage.getItem("secretKey"),
                },
            }
        );
        const data = await result.json();
        if (data.success) {
            toast({
                title: "Success!",
                description: data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error!",
                description: data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setLoading(false);
        clearFields()
    };
    return (
        <>
            <Sidebar>
                <Breadcrumbs links={["Home", "Dashboard"]} />
                <Stack p={4} gap={3}>
                    <Card>
                        <Stack gap={3}>
                            <Heading>Add New Research Paper.</Heading>
                        </Stack>
                    </Card>
                    <Card>
                        {/* <Text fontWeight="bold" fontSize="2xl">Add New Research Paper</Text> */}
                        <VStack alignItems="left">
                            <Text fontWeight="bold" fontSize="xl">
                                Title
                            </Text>
                            <Textarea
                                fontSize="md"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <Text fontWeight="bold" fontSize="xl">
                                Authors
                            </Text>
                            <Textarea
                                fontSize="md"
                                value={authors}
                                onChange={(e) => setAuthors(e.target.value)}
                            />

                            <Text fontWeight="bold" fontSize="xl">
                                Keywords
                            </Text>
                            <Textarea
                                fontSize="md"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />

                            <Text fontWeight="bold" fontSize="xl">
                                Introduction
                            </Text>
                            <Textarea
                                fontSize="md"
                                value={introduction}
                                onChange={(e) =>
                                    setIntroduction(e.target.value)
                                }
                            />

                            <Text fontWeight="bold" fontSize="xl">
                                Problem Statement & Objectives
                            </Text>
                            <Textarea
                                fontSize="md"
                                value={problemStatement}
                                onChange={(e) =>
                                    setProblemStatement(e.target.value)
                                }
                            />

                            <Text fontWeight="bold" fontSize="xl">
                                Literature Review
                            </Text>
                            <Textarea
                                fontSize="md"
                                value={literatureReview}
                                onChange={(e) =>
                                    setLiteratureReview(e.target.value)
                                }
                            />

                            <Text fontWeight="bold" fontSize="xl">
                                Methodology
                            </Text>
                            <Textarea
                                fontSize="md"
                                value={methodology}
                                onChange={(e) => setMethodology(e.target.value)}
                            />

                            <Text fontWeight="bold" fontSize="xl">
                                Bibliography
                            </Text>
                            <Textarea
                                fontSize="md"
                                value={bibliography}
                                onChange={(e) =>
                                    setBibliography(e.target.value)
                                }
                            />
                            <HStack pt={2}>
                                <Button
                                    onClick={createResearchPaper}
                                    isLoading={loading}
                                    loadingText="Creating..."
                                    colorScheme="green"
                                    leftIcon={<BsPlusCircle />}
                                >
                                    Create
                                </Button>
                                <Button
                                    colorScheme="red"
                                    leftIcon={<MdOutlineCancel />}
                                    onClick={clearFields}
                                >
                                    Clear
                                </Button>
                            </HStack>
                        </VStack>
                    </Card>
                </Stack>
            </Sidebar>
        </>
    );
};

export default Dashboard;
