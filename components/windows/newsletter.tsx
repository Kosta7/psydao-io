import { Box, Button, Flex, Input, Link, Text } from "@chakra-ui/react";

import { Window } from "components/window";

export const Newsletter = () => {
  return (
    <Window
      id="newsletter"
      height={{ base: "380px", md: "410px" }}
      width="90%"
      maxWidth="300px"
      top="12%"
      left={{ base: "50%", md: "auto" }}
      right={{ base: "auto", md: "10%" }}
      transform={{ base: "translateX(-50%)", md: "none" }}
      resizable={false}
    >
      <Window.TitleBar />
      <Window.Content
        px={{ base: "2", sm: "3", md: "4" }}
        background="no-repeat bottom url(colorized-forest.jpg)"
      >
        <Text fontSize="32px" lineHeight="32px" fontStyle="italic" mt="9">
          Stay in the loop
        </Text>
        <Text fontSize="16px">Subscribe to the PsyDAO newsletter.</Text>
        <Flex
          as="form"
          action="https://www.getrevue.co/profile/psydao/add_subscriber"
          method="post"
          name="revue-form"
          target="_blank"
          direction="column"
          gap="3"
          my="10"
        >
          <Input
            placeholder="Your email address..."
            type="email"
            name="member[email]"
            id="email"
            borderRadius="0px"
            borderBottom="1px solid #f2bebe"
            fontSize="18px"
            fontWeight="700"
            variant="unstyled"
            _placeholder={{ color: "#9835BA", opacity: 1 }}
          />
          <Button
            type="submit"
            value="Subscribe"
            name="member[subscribe]"
            borderRadius="0px"
            fontSize="18px"
            variant="outline"
            colorScheme="#9835BA"
          >
            Subscribe
          </Button>
        </Flex>
        <Box fontSize="sm" textAlign="center" mt="10">
          {"By subscribing, you agree with Revue's "}
          <Link
            target="_blank"
            href="https://www.getrevue.co/terms"
            rel="noreferrer"
            textDecoration="underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            target="_blank"
            href="https://www.getrevue.co/privacy"
            rel="noreferrer"
            textDecoration="underline"
          >
            Privacy Policy
          </Link>
          .
        </Box>
      </Window.Content>
    </Window>
  );
};
