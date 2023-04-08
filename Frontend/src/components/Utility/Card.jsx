import React from "react";
import { Box } from "@chakra-ui/react";

const Card = ({ children }) => {
  return (
    <Box bg="white" w="full" p={8} borderRadius="md">
      {children}
    </Box>
  );
};

export default Card;
