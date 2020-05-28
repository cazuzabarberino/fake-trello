import React from "react";
import { DiTrello } from "react-icons/di";
import { Container, HeaderTitle } from "./styles";


interface Props {}

const Header = (props: Props) => {
  return (
    <Container>
      {/* <HeaderBtnWrapper>
        <HeaderBox as="button">
          <BsFillGrid3X3GapFill size={16} color="white" />
        </HeaderBox>
        <HeaderBox as="button">
          <AiOutlineHome size={18} color="white" />
        </HeaderBox>
        <HeaderBox as="button">
          <FaTrello size={16} />
          <p>Quadros</p>
        </HeaderBox>
        <HeaderBox as="input" />
      </HeaderBtnWrapper> */}
      <HeaderTitle>
        <DiTrello size={24} />
        Fake Trello
      </HeaderTitle>
      {/* <HeaderBtnWrapper right>
        <HeaderBox as="button">
          <FiPlus size={20} color="white" />
        </HeaderBox>
        <HeaderBox as="button">
          <FiAlertCircle size={20} color="white" />
        </HeaderBox>
        <HeaderBox as="button" color="#eb5a46">
          <MdNotificationsNone size={20} color="white" />
        </HeaderBox>
        <HeaderAvatar />
      </HeaderBtnWrapper> */}
    </Container>
  );
};

export default Header;
