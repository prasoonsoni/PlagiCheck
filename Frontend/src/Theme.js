import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    styles: {
        global: (props) => ({
            '&::-webkit-scrollbar': { width: "0.5rem", bg: props.colorMode === "dark" ? "#1A202C" : "#f5f5f5" },
            '&::-webkit-scrollbar-track': {bg: "blue.50",borderRadius: "3rem" },
            '&::-webkit-scrollbar-thumb': { bg: props.colorMode === "dark" ? "#3f444e" : "blue.400",borderRadius: "3rem" },
        }),
    },

})

export default theme
