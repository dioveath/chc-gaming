import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import { Text } from "../../../../components/Text";
import { FlexContainer } from "../../../../components/base";
import Post from "../../../../components/Post";
import OpeningCard from './OpeningCard';

import { Marginer } from '../../../../components/Marginer';

import { useGetClipsQuery } from "../../../../redux/ClipApi";
import { useGetUserQuery } from "../../../../redux/UserApi";

import Skeleton from "react-loading-skeleton";
import { MdError } from "react-icons/md";

const Container = styled.div`
  ${tw`
w-full
flex
flex-col
gap-6
my-4
`}
`;

const AllBadgesContainer = styled.div`
  ${tw`
flex
flex-wrap
gap-2
`}
`;

const BadgeContainer = styled.div`
  ${tw`
px-12
py-1
rounded-3xl
text-sm
text-white
font-medium
bg-[#BE2222]
border border-transparent
transition-all
`}
  ${(props) => props.outlined && tw`bg-transparent border-white`}
`;

const CenterContainer = styled.div`
  ${tw`
grid
place-items-center
`}
`;

export default function HomePanel() {
  const auth = useSelector((state) => state.auth);
  const { data: user } = useGetUserQuery(auth.userId);
  const [page, setPage] = useState(1);
  const [clips, setClips] = useState([]);

  const followings = useMemo(() => {
    return user?.following.map((f) => ({ author: f }));
  }, [user?.following]);

  // NOTE: Don't make query empty. It would fetch all clips.
  if(followings && followings.length ===  0)
    followings.push({ author: auth.userId });

  const { data, error, isLoading, isFetching } = useGetClipsQuery({
    $or: followings || [],
    privacy: "public",
    pageQuery: { limit: 3, sort: "-createdAt", page: page },
  });

  const observer = useRef();
  const lastClipElementRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting)
          if (data?.clips?.pagination?.hasNextPage) {
            setPage(data?.clips?.pagination?.nextPage);
          }
      });

      if (node) observer.current.observe(node);
    },
    [
      isFetching,
      isLoading,
      data?.clips?.pagination?.hasNextPage,
      data?.clips?.pagination?.nextPage,
    ]
  );

  useEffect(() => {
    const filteredClips = data?.clips?.clips?.filter(
      (c) => c.author !== auth.userId
    );

    const allClips = [
      ...new Set(clips.concat(filteredClips ? filteredClips : [])),
    ];
    setClips(allClips);

  }, [data?.clips?.pagination?.page]);

  return (
    <Container>
      <Text fontSize="1.4rem" fontWeight="700">
        Highlights
      </Text>

      {isFetching && (
        <>
          <Skeleton count={10} />
          <br />
          <Skeleton count={10} />
        </>
      )}

      {isLoading || !clips ? (
        <Skeleton count={10} />
      ) : (
        clips.map((clip, index) => {
          if (clips.length === index + 1) {
            return (
              <Post innerRef={lastClipElementRef} key={clip.id} clip={clip} />
            );
          }
          return <Post key={clip.id} clip={clip} />;
        })
      )}

      {clips && clips.length === 0 && (
        <>
          <OpeningCard/>
        </>
      )}      

      {error && (
        <CenterContainer>
          <FlexContainer direction="col" align="center" justify="center">
            <MdError size={40} color="white" />
            <Text className="text-xl fomt-semibold">
              Something went wrong!
            </Text>
          </FlexContainer>
        </CenterContainer>
      )}
      <Marginer vertical='20rem'/>      
    </Container>
  );
}
