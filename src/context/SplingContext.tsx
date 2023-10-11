import { SocialProtocol } from "@spling/social-protocol";
import { createContext } from "react";

const SplingContext = createContext({
  socialProtocol: null,
  updateSocialProtocol: (socialProtocol: SocialProtocol) => {},

  selfInfo: null,
  updateSelfInfo: () => {},
});

export default SplingContext;
