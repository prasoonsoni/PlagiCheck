import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function BreadCrumbLinkDeterminer({ link }) {
  switch (link) {
    case "Dashboard":
      return "/dashboard";
    case "Pending Requests":
      return "/dashboard/pending";
    case "History":
      return "/dashboard/history";
    default:
      return "/";
  }
}

function Breadcrumbs({ links }) {
  return (
    <Box pl={4}>
      <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
        {links.map((link) => (
          <BreadcrumbItem key={link}>
            <BreadcrumbLink as={Link} to={BreadCrumbLinkDeterminer({ link })}>
              {link}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Box>
  );
}

export default Breadcrumbs;
