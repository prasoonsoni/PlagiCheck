/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import {
    Stack,
    Wrap,
    Text,
    Heading,
    useDisclosure,
    useToast,
    Skeleton,
} from "@chakra-ui/react";
import Sidebar from "../../components/User/Sidebar";
import Breadcrumbs from "../../components/Utility/Breadcrumbs";
import Card from "../../components/Utility/Card";

import DraftCard from "./ResearchPaperCard";
import CheckPlagiarismCard from "./CheckPlagiarismCard";
const CheckPlagiarism = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [papers, setPapers] = useState([]);
    useEffect(() => {
        getAllPapers();
    }, [papers]);
    const getAllPapers = async () => {
        setLoading(true);
        const result = await fetch("http://localhost:5000/researchpaper/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "auth-token": sessionStorage.getItem("secretKey"),
            },
        });
        const tes = await result.json();

        if (tes.success) {
            setPapers(tes.data);
            // toast({
            //     title: "Success!",
            //     description: tes.message,
            //     status: "success",
            //     duration: 3000,
            //     isClosable: true,
            // });
        } else {
            toast({
                title: "Error!",
                description: tes.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setLoading(false);
    };

    return (
        <Sidebar>
            <Breadcrumbs links={["Home", "Dashboard", "Check Plagiarism"]} />
            <Heading mt={8} ml={4}>
                Research Papers
            </Heading>
            <Stack p={4} gap={3}>
                {papers.map((paper) => {
                    return <CheckPlagiarismCard paper={paper} />;
                })}
            </Stack>
        </Sidebar>
    );
};

export default CheckPlagiarism;
