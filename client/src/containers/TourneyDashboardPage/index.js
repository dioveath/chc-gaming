import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import styled from "styled-components";
import tw from "twin.macro";
import config from "../../config/config";
import {
  error,
  pending,
  setActiveMenu,
  setSelectedTourney,
} from "../../redux/TourneySlice";
import LeftSideBar from "./LeftSideBar";
import { MenuItems } from "./MenuItems.js";
import { FlexContainer } from "../../components/base";
import { Text } from "../../components/Text";
import { MdOutlineError } from "react-icons/md";

const Container = styled.div`
  background: radial-gradient(#1d0207, #0d0000);
  ${tw`
flex
w-screen
h-screen
pl-[60px]
`}
`;

const ContentContainer = styled.div`
  ${tw`
w-full
h-full
p-2
`}
`;

const ListContainer = styled.ul``;

const List = styled.li``;

export default function TourneyDashboardPage() {
  const { tourneyId } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { dashboard, selectedTourney, isPending, isError, errorMessages } =
    useSelector((state) => state.tourney);

  useEffect(() => {
    dispatch(pending());
    (async () => {
      try {
        const options = {
          method: "GET",
          url: `${config.serverUrl}/api/v1/tourneys/${tourneyId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        };

        const response = await axios.request(options);
        dispatch(setSelectedTourney(response.data.tourney));
      } catch (e) {
        if (e.response) dispatch(error(e.response.data.errorList));
      }
    })();
  }, [auth.accessToken, dispatch, tourneyId]);

  const renderContent = MenuItems.find(
    (menu) => menu.name === dashboard.activeMenu
  ).content;

  return (
    <Container>
      <LeftSideBar
        menuItems={MenuItems}
        activeMenu={dashboard.activeMenu}
        onChangeMenu={(menuName) => dispatch(setActiveMenu(menuName))}
      />
      <ContentContainer>
        {isError && (
          <FlexContainer
            justify="center"
            align="center"
            w="100%"
            h="100%"
            direction="col"
          >
            <MdOutlineError size="30" color="white" />
            <Text fontSize="2rem" fontWeight="600">
              {" "}
              ERROR{" "}
            </Text>
            <ListContainer>
              {errorMessages.map((err) => {
                return (
                  <List>
                    <Text> {err} </Text>
                  </List>
                );
              })}
            </ListContainer>
          </FlexContainer>
        )}

        {(isPending || !selectedTourney) ? (
          <FlexContainer justify="center" align="center" w="100%" h="100%">
            <BounceLoader color="red" />
          </FlexContainer>
        ) : (
          !isError && renderContent
        )}
      </ContentContainer>
    </Container>
  );
}
