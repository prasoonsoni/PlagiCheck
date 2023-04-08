import React, { useState, useEffect } from "react";
import Card from "../components/Utility/Card";
import { useParams } from "react-router-dom";
import { VStack, Text, useToast } from "@chakra-ui/react";

const CompletePaper = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [keywords, setKeywords] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [problemStatement, setProblemStatement] = useState("");
    const [literatureReview, setLiteratureReview] = useState("");
    const [methodology, setMethodology] = useState("");
    const [bibliography, setBibliography] = useState("");
    const toast = useToast();
    const getData = async () => {
        const response = await fetch(
            `http://localhost:5000/researchpaper/get/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        const data = await response.json();
        console.log(data);
        if (data.success) {
            setTitle(data.data.title);
            setAuthors(data.data.authors);
            setKeywords(data.data.keywords);
            setIntroduction(data.data.introduction);
            setProblemStatement(data.data.problem_statement_and_objectives);
            setLiteratureReview(data.data.literature_review);
            setMethodology(data.data.methodology);
            setBibliography(data.data.bibliography);
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
    };
    useState(() => {
        getData();
    });

    return (
        <Card>
            <VStack align="left">
                <Text fontWeight="bold" fontSize="3xl">
                    Title
                </Text>
                <Text fontSize="2xl">{title}</Text>
                <Text fontWeight="bold" fontSize="3xl">
                    Authors
                </Text>
                <Text fontSize="2xl">{authors}</Text>
                <Text fontWeight="bold" fontSize="3xl">
                    Keywords
                </Text>
                <Text fontSize="2xl">{keywords}</Text>
                <Text fontWeight="bold" fontSize="3xl">
                    Introduction
                </Text>
                <Text fontSize="2xl">{introduction}</Text>

                <Text fontWeight="bold" fontSize="3xl">
                    Problem Statement & Objectives
                </Text>
                <Text fontSize="2xl">{problemStatement}</Text>
                <Text fontWeight="bold" fontSize="3xl">
                    Literature Review
                </Text>
                <Text fontSize="2xl">{literatureReview}</Text>

                <Text fontWeight="bold" fontSize="3xl">
                    Methodology
                </Text>
                <Text fontSize="2xl">{methodology}</Text>

                <Text fontWeight="bold" fontSize="3xl">
                    Bibliography
                </Text>
                <Text fontSize="2xl">{bibliography}</Text>
            </VStack>
        </Card>
    );
};

export default CompletePaper;
