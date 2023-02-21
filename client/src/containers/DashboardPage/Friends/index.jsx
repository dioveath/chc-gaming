import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';

import { Text } from '../../../components/Text';
import { FlexContainer, WrapContainer } from '../../../components/base';
import { Marginer } from '../../../components/Marginer';

import { useGetUserQuery, useGetUsersQuery } from '../../../redux/UserApi';

import ProfileCard from './components/ProfileCard';

const Container = styled.div`
${tw`
w-full
`}
`;

const CardsContainer = styled(WrapContainer)`
${tw`
w-full
items-center
justify-center
my-4
`}
`;


export default function FriendsPage(){
  const auth = useSelector(state => state.auth);
  const { data, error, isLoading, isFetching } = useGetUsersQuery();
  const { data: user } = useGetUserQuery(auth.userId);

  const [followings, setFollowings] = useState([]);
  const [notFollowings, setNotFollowings] = useState([]);

  useEffect(() => {
    if(data && user) {
      let newFollowings = data?.users?.filter((u) => {
        if(u.id === user.id) return false;
        for(let i = 0; i < user.following.length; i++){
          if(u.id === user.following[i]) {
            return true;
          }
        }
        return false;
    });
      setFollowings(newFollowings);
      setNotFollowings(data.users.filter(u => !(newFollowings.includes(u) || u.id === user.id )));
    }
  }, [ data, user]);


  return (
    <Container>
      <FlexContainer
        w='100%'
        justify='flex-start'>
        <Text fontSize='1.5rem'
              fontWeight='700'> Social Circle </Text>
      </FlexContainer>
      <Marginer vertical='1.2rem'/>
      <Text fontSize='1.4rem' fontWeight='600'> Following  </Text>
      <CardsContainer gap='1rem' >
	{followings.length === 0 && <Text fontSize='1.2rem' fontWeight='500'> You're lame. </Text>}
        { followings && followings.map((user) => <ProfileCard key={user.id} user={user}/> )}
      </CardsContainer>

      <Text fontSize='1.4rem' fontWeight='600'> Suggestions for you  </Text>      
      <CardsContainer gap='1rem' >
        { notFollowings.map((user) => <ProfileCard key={user.id} user={user}/> )}
      </CardsContainer>
      
    </Container>
  );
}
