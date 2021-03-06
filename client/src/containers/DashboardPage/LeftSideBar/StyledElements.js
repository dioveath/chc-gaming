import styled from "styled-components";
import tw from "twin.macro";

const SidebarState = {
  DESKTOP: 0,
  TABLET: 1,
  MOBILE: 2,
};
Object.freeze(SidebarState);

export { SidebarState };

export const LeftBarContainer = styled.div`
  width: ${(props) =>
    props.state === SidebarState.DESKTOP
      ? "372px"
      : props.state === SidebarState.TABLET
      ? "60px"
      : "0px"};
  position: fixed;
  left: 0;
  top: 0;
  ${tw`
z-20
bg-black
shadow-md
transition-all
h-screen
overflow-x-hidden
overflow-y-scroll
`}
`;

export const ProfileContainer = styled.img`
  width: ${(props) => (props.active ? "80px" : "50px")};
  height: ${(props) => (props.active ? "80px" : "50px")};
  ${tw`
rounded-full
overflow-hidden
object-cover
shadow-md
border-2 border-purple-800
transition-all
`}
`;

export const ProfileStatsContainer = styled.div`
  ${tw`
flex
bg-[#BE2222]
py-4
px-6
justify-around
transition-all
`}
`;

export const MenuContainer = styled.div`
  ${tw`
px-2
py-4
flex
flex-col
`}
`;

export const MenuButtonContainer = styled.div`
  ${tw`
w-full
px-6
py-4
flex
items-center
rounded-md
shadow-sm
bg-transparent
cursor-pointer

hover:bg-gray-600
transition-all
`}
`;


export const Navbar = styled.nav.attrs((props) => ({
  className: props.className
}))`
background-color: rgba(148, 27, 0, 0.6);
${tw`
sticky
top-0
left-0
right-0
z-20
w-full
h-14
shadow-2xl
`}
`;
