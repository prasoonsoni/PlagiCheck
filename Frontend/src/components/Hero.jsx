import React, { useState } from "react";

import {
    Stack,
    Heading,
    Button,
    Container,
    Image,
    Flex,
    Box,
    Link,
    useDisclosure,
    useToast,
    toast,
    Textarea,
    useClipboard,
    Select,
    Text,
} from "@chakra-ui/react";

import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    InputRightElement,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import research from "../assets/research.svg";

const Hero = () => {
    const toast = useToast();

    const [show, setShow] = React.useState(false);
    const [show1, setShow1] = React.useState(false);
    const [token, setToken] = React.useState(false);

    // SIGN UP DETAILS
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let [value, setValue] = React.useState("");
    const { onCopy, hasCopied } = useClipboard(value);
    const [registerLoading, setRegisterLoading] = React.useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const handleClick = () => setShow(!show);

    let handleInputChange = (e) => {
        let inputValue = e.target.value;
        setValue(inputValue);
    };

    const signupUser = async () => {
        if (email.length===0 || password.length===0) {
            toast({
                title: "Error!",
                description: "Missing Fields",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } else {
            setRegisterLoading(true);
            let result = await fetch("http://localhost:5000/user/create", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
            setRegisterLoading(false);
            let test = await result.json();
            console.log(test);
            if (test.success) {
                console.log("result", test);
                toast({
                    title: "Success!",
                    description: test.message,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error!",
                    description: test.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Container maxW="container.xl" bg="blue.50" h="75vh">
            <Stack direction={{ base: "column", md: "row" }} py={8} h="full">
                <Flex flex="1">
                    <Stack justifyContent="center" gap={8}>
                        <Box maxW="50ch">
                            <Heading
                                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                            >
                                One Stop Solution for Multi Level Plagiarism Detection
                            </Heading>
                        </Box>
                        <Stack direction="row" gap={8}>
                            <Button colorScheme="blue" p={4} onClick={onOpen}>
                                Sign Up
                            </Button>
                            <Modal
                                initialFocusRef={initialRef}
                                finalFocusRef={finalRef}
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>
                                        Create your account
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl mb={5}>
                                            <FormLabel>
                                                Enter E-Mail ID
                                            </FormLabel>
                                            <Input
                                                placeholder="Enter Here"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />

                                            <FormLabel>Password</FormLabel>
                                            <InputGroup size="md">
                                                <Input
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(
                                                            e.target.value
                                                        );
                                                    }}
                                                    pr="4.5rem"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Enter password"
                                                />
                                                <InputRightElement width="4.5rem">
                                                    <Button
                                                        h="1.75rem"
                                                        size="sm"
                                                        onClick={handleClick}
                                                    >
                                                        {show ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button
                                            colorScheme="blue"
                                            mr={3}
                                            onClick={signupUser}
                                            isLoading={registerLoading}
                                            loadingText="Submitting"
                                        >
                                            Submit
                                        </Button>
                                        <Button onClick={onClose}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Stack>
                    </Stack>
                </Flex>
                <Flex flex="0.75" pt={{ base: 4, md: 0 }}>
                    <Image src={research} alt="Security" />
                </Flex>
            </Stack>
        </Container>
    );
};

export default Hero;
