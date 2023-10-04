"use client"; // This is a client component 👈🏽
import Home from "@/screens/home";
import { ChakraProvider } from "@chakra-ui/react";


export default function Page() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}


