import React from "react";

import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { FaTrello } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { DiTrello } from "react-icons/di";
import { MdNotificationsNone } from "react-icons/md";
import {
  Container,
  HeaderBox,
  HeaderTitle,
  HeaderBtnWrapper,
  HeaderAvatar,
} from "./styles";

interface Props {}

const Header = (props: Props) => {
  return (
    <Container>
      <HeaderBtnWrapper>
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
      </HeaderBtnWrapper>
      <HeaderTitle>
        <DiTrello size={24} />
        Trello
      </HeaderTitle>
      <HeaderBtnWrapper right>
        <HeaderBox as="button">
          <AiOutlinePlus size={20} color="white" />
        </HeaderBox>
        <HeaderBox as="button">
          <FiAlertCircle size={20} color="white" />
        </HeaderBox>
        <HeaderBox as="button" color="red">
          <MdNotificationsNone size={20} color="white" />
        </HeaderBox>
        <HeaderAvatar />
      </HeaderBtnWrapper>
    </Container>
  );
};

export default Header;
