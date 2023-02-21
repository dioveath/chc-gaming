import styled from 'styled-components';
import tw from 'twin.macro';
import ClanCard from './ClanCard';

const Container = styled.div`
${tw`

`}
`;

export default function DashboardHome(){
  return (
    <Container>
      <ClanCard/>
    </Container>
  );
}
