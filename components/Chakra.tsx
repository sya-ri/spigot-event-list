import {
  ChakraProvider,
  ChakraProviderProps,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";

interface Props extends ChakraProviderProps {
  cookies?: string;
}

const Chakra = ({ cookies, children }: Props) => {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => ({
  props: {
    cookies: req.headers.cookie ?? "",
  },
});

export default Chakra;
