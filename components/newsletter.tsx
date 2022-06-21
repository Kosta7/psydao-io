import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import { Item } from "components/item";

export const Newsletter = () => {
  return (
    <Item id="newsletter">
      <Item.Icon>
        <Text as="span" _hover={{ color: "#f00" }}>
          Newsletter
        </Text>
      </Item.Icon>
      <Item.Window
        layerStyle="window"
        initial={{ height: 350, width: 300 }}
        constraints={{
          maxHeight: 350,
          maxWidth: 300,
          minHeight: 350,
          minWidth: 300,
        }}
      >
        <Text
          color="#269200"
          fontSize="24px"
          mt="5"
          as="span"
          display="inline-block"
        >
          Stay in the loop
        </Text>
        <Text>Subscribe to our newsletter</Text>
        <Flex
          as="form"
          action="https://www.getrevue.co/profile/psydao/add_subscriber"
          method="post"
          name="revue-form"
          target="_blank"
          direction="column"
          gap="3"
          my="5"
        >
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              placeholder="Your email address..."
              type="email"
              name="member[email]"
              id="email"
              borderRadius="0px"
            />
          </FormControl>
          <Button
            type="submit"
            value="Subscribe"
            name="member[subscribe]"
            borderRadius="0px"
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
      </Item.Window>
    </Item>
  );
};
