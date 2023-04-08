import React from "react";
import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    Button,
    Container,
    Heading,
    Link,
    VStack,
    FormControl,
    FormLabel,
    useToast,
    Input,
    InputGroup,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
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
import logo from "../../assets/logo.png";

const Links = ["Home"];
const LinkURLS = ["/", "/about", "/contact"];

const ExternalLinks = ["About", "Github"];
const ExternalLinkUrls = [
    "", //Devpost Link
    "", // Github link
];

const externalLink = ({ link, index }) => {
    return (
        <Link
            key={index}
            href={ExternalLinkUrls[index]}
            isExternal
            color="gray.500"
        >
            {link}
        </Link>
    );
};

const MyNavLink = ({ link, index }) => {
    return (
        <NavLink to={LinkURLS[index]}>
            {({ isActive }) => (
                <Link color={isActive ? "blue.500" : "gray.500"}>{link}</Link>
            )}
        </NavLink>
    );
};

const Navbar = () => {
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    let navigate = useNavigate();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [show, setShow] = React.useState(false);
    const [show1, setShow1] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [loginLoading, setLoginLoading] = React.useState(false);

    const handleClick = () => setShow(!show);
    const handleClick1 = () => setShow1(!show1);

    const signinClicked = async () => {
        if (password.length == 0 || email.length == 0) {
            toast({
                title: "Error!",
                description: "No value Entered",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            // console.log(password)
            setLoginLoading(true);
            let result = await fetch("http://localhost:5000/user/login", {
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
            let test = await result.json();
            console.log(test);
            if (test.success) {
                sessionStorage.setItem("secretKey", test.token);
                navigate("/dashboard")
                toast({
                    title: "Success!",
                    description: test.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error!",
                    description: test.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
            setLoginLoading(false);
        }
    };

    return (
        <Box px={4}>
            <Container maxW="container.xl" py={4}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <IconButton
                        size="md"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        display={{ md: "none" }}
                        aria-label={"Toggle menu"}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack
                        spacing={8}
                        justifyContent="space-between"
                        w={{ base: "none", md: "full" }}
                        mx={{ base: "auto", md: 0 }}
                    >
                        <HStack>
                            <img src={logo} width="60%" />
                        </HStack>
                        <HStack
                            spacing={8}
                            display={{ base: "none", md: "flex" }}
                        >
                            {Links.map((link, index) => (
                                <MyNavLink
                                    key={index + link}
                                    link={link}
                                    index={index}
                                />
                            ))}
                            {ExternalLinks.map((link, index) =>
                                externalLink({ link, index })
                            )}
                            <Button colorScheme="blue" p={4} onClick={onOpen}>
                                Sign In
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
                                        Enter your account details
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl mb={5}>
                                            <FormLabel>
                                                Enter E-Mail ID
                                            </FormLabel>
                                            <Input
                                                ref={initialRef}
                                                placeholder="Enter Here"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Password</FormLabel>
                                            <InputGroup size="md">
                                                <Input
                                                    placeholder="Enter Password Here"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(
                                                            e.target.value
                                                        );
                                                    }}
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
                                            onClick={signinClicked}
                                            isLoading={loginLoading}
                                            loadingText="Signing In"
                                        >
                                            Sign In
                                        </Button>
                                        <Button onClick={onClose}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </HStack>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;
