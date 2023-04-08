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
} from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
const DraftCard = ({ paper }) => {
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

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const {
        isOpen: editIsOpen,
        onOpen: editOnOpen,
        onClose: editOnClose,
    } = useDisclosure();
    const {
        isOpen: viewIsOpen,
        onOpen: viewOnOpen,
        onClose: viewOnClose,
    } = useDisclosure();

    const toast = useToast();

    const updatePaper = async () => {
        setUpdateLoading(true);
        const result = await fetch(
            `http://localhost:5000/researchpaper/edit/${paper._id}`,
            {
                method: "PUT",
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
        setUpdateLoading(false);
    };

    const deletePaper = async () => {
        setDeleteLoading(true);
        const result = await fetch(
            `http://localhost:5000/researchpaper/delete/${paper._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "auth-token": sessionStorage.getItem("secretKey"),
                },
            }
        );
        const tes = await result.json();

        if (tes.success) {
            toast({
                title: "Success!",
                description: tes.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error!",
                description: tes.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setDeleteLoading(false);
    };

    return (
        <Card>
            {/* View Paper Modal */}
            <Modal
                isOpen={viewIsOpen}
                onClose={viewOnClose}
                size="full"
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Your Complete Paper</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack align="left">
                            <Text fontWeight="bold" fontSize="3xl">
                                Title
                            </Text>
                            <Text fontSize="2xl">{paper.title}</Text>
                            <Text fontWeight="bold" fontSize="3xl">
                                Authors
                            </Text>
                            <Text fontSize="2xl">{paper.authors}</Text>
                            <Text fontWeight="bold" fontSize="3xl">
                                Keywords
                            </Text>
                            <Text fontSize="2xl">{paper.keywords}</Text>
                            <Text fontWeight="bold" fontSize="3xl">
                                Introduction
                            </Text>
                            <Text fontSize="2xl">{paper.introduction}</Text>

                            <Text fontWeight="bold" fontSize="3xl">
                                Problem Statement & Objectives
                            </Text>
                            <Text fontSize="2xl">
                                {paper.problem_statement_and_objectives}
                            </Text>
                            <Text fontWeight="bold" fontSize="3xl">
                                Literature Review
                            </Text>
                            <Text fontSize="2xl">
                                {paper.literature_review}
                            </Text>

                            <Text fontWeight="bold" fontSize="3xl">
                                Methodology
                            </Text>
                            <Text fontSize="2xl">{paper.methodology}</Text>

                            <Text fontWeight="bold" fontSize="3xl">
                                Bibliography
                            </Text>
                            <Text fontSize="2xl">{paper.bibliography}</Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Edit Paper Modal */}
            <Modal
                isOpen={editIsOpen}
                onClose={editOnClose}
                size="full"
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editing Paper</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack align="left">
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
                        </VStack>

                        {/* <Text fontSize="2xl">{paper.bibliography}</Text> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={updatePaper}
                            colorScheme="green"
                            leftIcon={<FiSave />}
                            isLoading={updateLoading}
                            loadingText="Saving..."
                        >
                            Save Changes
                        </Button>
                    </ModalFooter>
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
                    leftIcon={<MdOutlineEdit />}
                    onClick={editOnOpen}
                    colorScheme="teal"
                >
                    Edit
                </Button>
                <Button
                    onClick={deletePaper}
                    isLoading={deleteLoading}
                    loadingText="Deleting..."
                    leftIcon={<MdDeleteOutline />}
                    colorScheme="red"
                >
                    Delete
                </Button>
                <Button
                    leftIcon={<MdOutlineRemoveRedEye />}
                    colorScheme="green"
                    onClick={viewOnOpen}
                >
                    View
                </Button>
            </HStack>
        </Card>
    );
};

export default DraftCard;
