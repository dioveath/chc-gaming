import { NormalText, BoldText } from "../../../../../components/Text";
import { FlexContainer, WrapContainer } from "../../../../../components/base";

import { CardContainer, Badge, ActionsContainer, Bar } from "./Elements";

import { IconContext } from "react-icons";
import { SiSemanticrelease } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";

export default function StatusCard() {
  return (
    <CardContainer>
      <FlexContainer justify="space-between">
        <BoldText> FIFA 22 Tournament</BoldText>
        <Badge> Running </Badge>
        <ActionsContainer>
          <IconContext.Provider value={{ color: "white", size: "2rem" }}>
            <SiSemanticrelease />
            <IoMdSettings />
          </IconContext.Provider>
        </ActionsContainer>
      </FlexContainer>

      <FlexContainer justify="space-between" w="100%" gap="0.5rem">
        <FlexContainer direction="col" w="100%">
          <NormalText> Setup </NormalText>
          <Bar />
        </FlexContainer>
        <FlexContainer direction="col" w="100%">
          <NormalText> Pending </NormalText>
          <Bar />
        </FlexContainer>
        <FlexContainer direction="col" w="100%">
          <NormalText> Running </NormalText>
          <Bar />
        </FlexContainer>
        <FlexContainer direction="col" w="100%">
          <NormalText> Complete </NormalText>
          <Bar />
        </FlexContainer>
      </FlexContainer>
    </CardContainer>
  );
}
