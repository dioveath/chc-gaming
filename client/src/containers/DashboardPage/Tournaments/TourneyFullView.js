import { useState } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { Carousel } from "react-responsive-carousel";
import { Player, BigPlayButton } from "video-react";
import ReactPlayer from "react-player";
import "video-react/dist/video-react.css";
import config from '../../../config/config';
import KhaltiCheckout from 'khalti-checkout-web';

import { Text } from "../../../components/Text";
import { FlexContainer, WrapContainer } from "../../../components/base";
import Button from '../../../components/Button';

import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { BsCashCoin } from 'react-icons/bs';

import { toast } from "react-toastify";
import {
  useRegisterTourneyMutation,
  useDeregisterTourneyMutation,
  useRegisterVerifyTourneyMutation,
} from "../../../redux/TourneyApi";

import {
  useGetUserQuery
} from '../../../redux/UserApi';


const Container = styled.div`
  ${tw`
relative
`}
`;


const YoutubeSlide = ({ url, isSelected }) => {
  return <ReactPlayer width={"auto"} url={url} playing={isSelected} />;
};

const PaymentMethods = [
  {
    name: "Khalti",
    logo: "assets/images/khalti_log.png"
  }
];

export default function TourneyFullView({ tourney }) {
  const customRenderItem = (item, props) => (
    <item.type {...item.props} {...props} />
  );

  // const getVideoThumb = (videoId) => `https://img.youtube.com/vi/${videoId}/default.jpg`;
  // const getVideoId = (url) => url.substr('https://www.youtube.com/embed/'.length, url.length);
  // console.log(tourney);

  const startDate = new Date(tourney.start_date);
  const prizePool = tourney.prizes.reduce(
    (prevValue, el) => (prevValue += el.value),
    0
  );
  const totalRegisteredPlayers = tourney.registrations.length;

  const auth = useSelector((state) => state.auth);
  const [registerTourney, { isLoading: isRegisterPending }] =
    useRegisterTourneyMutation();
  const [deregisterTourney, { isLoading: isDeregisterPending }] =
        useDeregisterTourneyMutation();
  const [paymentMethod, setPaymentMethod] = useState({});
  const [registerVerifyTourney ] = useRegisterVerifyTourneyMutation();
  const { data: user } = useGetUserQuery(auth.userId);

  const isRegistered =
        tourney.registrations.filter((m) => m.registrant_id === auth.userId).length > 0;
  const isRegFeePaid = tourney.registrations.filter((m) => m.registrant_id === auth.userId && m.fee_paid).length > 0;

  const khaltiConfig = {
    "publicKey": config.khaltiPublicKey,
    "productIdentity": tourney.id,
    "productName": tourney.title,
    "productUrl": "https://www.youtube.com/watch?v=hKIGnR4LKdM",
    "eventHandler": {
      async onSuccess(payload) {
        toast.promise(registerVerifyTourney({ tourneyId: tourney.id, payload }).unwrap(),
                      {
                        pending: "Verifying payment...",
                        success: "Payment Verified",
                        error: "Couldn't verify the payment"
                      });
      },
      onError(error) {
        toast.error(error.message);
      },
      onClose(){
        console.log("widget is closing!");
      }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],    
  };

  let checkout = new KhaltiCheckout(khaltiConfig);

  const onRegisterHandler = async (e) => {
    e.preventDefault();

    if (isRegistered)
      checkout.show({amount: tourney.registration_fee});
    else if(!isRegFeePaid)
      toast.promise(
        registerTourney({
          tourneyId: tourney.id,
          userId: auth.userId,
        }).unwrap(),
        {
          pending: `Registering to ${tourney.title}`,
          success: `Registered succesfully in ${tourney.title}`,
          error: `Registration error in ${tourney.title}`,          
        }
      );
  };

  const onDeregisterHandler = async (e) => {
    e.preventDefault();
    if (!isRegistered)
      toast.promise(
        deregisterTourney({
          tourneyId: tourney.id,
          userId: auth.userId,
        }).unwrap(),
        {
          pending: `DeRegistering to ${tourney.title}`,
          success: `DeRegistered succesfully in ${tourney.title}`,
          error: `DeRegistration error in ${tourney.title}`,          
        }
      );
  };

  return (
    <Container>
      <Carousel renderItem={customRenderItem} showThumbs={false} className=''>
        <img alt="" src="assets/images/celebration.jpg" />
      </Carousel>

      <FlexContainer direction="col" gap="0.4rem" className='relative bottom-40'>
        <Text className="text-2xl font-bold">{tourney.title}</Text>
        <Text className="text-sm bg-yellow-600 px-2 py-1 rounded-md">
          {tourney.status}
        </Text>

        <FlexContainer className="w-full flex-col gap-2  p-4 bg-black rounded-md shadow:2xl">
          <FlexContainer w="100%" justify="space-between">
            <FlexContainer align="center" gap="0.2rem">
              <IoGameController className="text-lg text-indigo-600" />
              <Text className="text-sm font-semibold"> {tourney.game} </Text>
            </FlexContainer>            
            <FlexContainer align="center" gap="0.2rem">
              <GiTrophyCup className="text-lg text-yellow-400" />
              <Text className="text-sm font-semibold"> {prizePool} </Text>
            </FlexContainer>
          </FlexContainer>

          <FlexContainer w="100%" justify="space-between">
          <FlexContainer align="center" gap="0.2rem">
            <FaCalendarAlt className="text-lg text-blue-600" />
            <Text className="text-sm font-semibold">
              {startDate.toLocaleDateString()}
            </Text>
          </FlexContainer>
            <FlexContainer align="center" gap="0.2rem">
              <FaMapMarkerAlt className="text-lg text-red-600" />
              <Text className="text-sm font-semibold">{tourney.location}</Text>
            </FlexContainer>
          </FlexContainer>

	  <FlexContainer align='center' gap='0.3rem'>
            <BsCashCoin className='text-xl text-green-600'/>
	    <Text className='text-sm font-bold'> Rs. { tourney.registration_fee } </Text>
          </FlexContainer>          

          <Text className="text-base">{tourney.description}</Text>

          <Text className="text-base font-semibold"> Sponsered By </Text>
          <Text className="text-base font-semibold"> Organized By </Text>
	<FlexContainer w="100%" justify='center'>
	  <Text className='text-xl font-bold'> {totalRegisteredPlayers}/{tourney.max_players} Players </Text>
        </FlexContainer>
	  {!user.phone_verified &&
           <FlexContainer className="w-full text-lg bg-red-600 justify-center px-4 py-2 rounded-md">
	     <Text className="font-bold text-xs"> To Register, Please verify your phone number from settings! </Text>
           </FlexContainer>}

          { !isRegistered && user.phone_verified && <Button w="100%" onClick={onRegisterHandler}> Register now </Button>}
	  { isRegistered && !isRegFeePaid && 
            <>
              <img alt="" width={150}
                   className={`border-2 border-gray-600 rounded-md` }
                   src="assets/images/khalti_logo.png"/>
	      <Button w="100%" onClick={onRegisterHandler} disabled={!user.phone_verified}> Pay Registration Fee </Button>
              <Button w="100%" type='outlined' onClick={onDeregisterHandler} disabled={!user.phone_verified}> Cancel Registration </Button>              
            </>
          }
          { isRegistered && isRegFeePaid &&
            <>
	      <FlexContainer className="w-full text-xl bg-green-500 justify-center px-4 py-2 rounded-md">
		<Text className="font-bold text-xs"> Registration Successful. Start grinding! </Text>
              </FlexContainer>
            </>}
        </FlexContainer>

      </FlexContainer>
    </Container>
  );
}
