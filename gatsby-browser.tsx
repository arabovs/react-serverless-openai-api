import React from "react";
// import { ApolloProvider } from "@apollo/client";
// import client from "./src/apollo/client";
// import { BasketContextProvider } from "./src/contexts/BasketContext";
import { Navigation } from "./src/components/Navigation";

export const wrapRootElement = ({ element }) => {
  return (
    <div>
      <Navigation />
      {element}
    </div>
  );
};
