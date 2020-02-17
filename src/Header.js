import React, { useState, useEffect } from "react";
import { useScrollPosition } from "./hooks/useScrollPosition";
import styled, { css } from "styled-components";
import { HeaderToggle, LogoFrame } from "./styles";
import { HashLink as Link } from "react-router-hash-link";
import { Transition, TransitionGroup } from "react-transition-group";
import { HeaderTab } from "./components";

const Wrapper = styled.div`
  display: flex;
  height: 5vw;
  min-height: 3rem;
  max-height: 4rem;
  position: sticky;
  z-index: 100;
  top: 0;
  justify-content: ${props =>
    props.collapsed ? "space-between" : " flex-start"};
`;

const Logo = styled.img`
  width: auto;
  height: 90%;
`;
const Nav = styled.div`
  transition: backdrop-filter 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0s,
    background 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0s, opacity 0.75s;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  margin: 0 0 0 -1rem;
  border-bottom-left-radius: 15px;
  width: 100%;
  opacity: ${({ state }) =>
    state === "entering" || state === "entered" ? 1 : 0};
  ${props =>
    props.scrolled &&
    css`
      backdrop-filter: blur(20px);
      background: rgba(0, 0, 0, 0.8);
    `}
`;
// const CollapsedNav = styled.div`
//   display: flex;
//   height: 100%;
//   margin-left: auto;
//   width: auto;
// `;

const HomeLink = styled(Link)`
  z-index: 100;
  margin-left: 2%;
`;

const Hamburger = styled.img`
  width: auto;
  height: 80%;
  max-width: 80%;
`;

function Header(props) {
  const [headerOn, setHeader] = useState();
  const [collapsedStart, setCollapsedStart] = useState(false);
  const [collapsedEnd, setCollapsedEnd] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerLock, setHeaderToggle] = useState(false);
  const isPhone = window.innerWidth <= 768;
  const pagePositionTop = window.pageYOffset < 150;
  useEffect(() => {
    if (isPhone && pagePositionTop) {
      setCollapsedStart(true);
      setHeader(0);
    }
  }, [isPhone, pagePositionTop]);

  const handleHeaderChange = selection => {
    setHeader(selection);
    if (!collapsedEnd && selection !== 0) {
      setCollapsedStart(true);
    }
    setHeaderToggle(false);
  };

  const handleHeaderToggle = () => {
    setCollapsedStart(false);
    setCollapsedEnd(false);
    setHeaderToggle(true);
  };

  const headerCollapsed = () => {
    const Home = (
      <HeaderTab
        scrolled={scrolled}
        selected
        num={0}
        handleHeaderChange={handleHeaderChange}
        to=""
        text={"ShenanIgan"}
      />
    );
    const Energy = (
      <HeaderTab
        scrolled={scrolled}
        selected
        handleHeaderChange={handleHeaderChange}
        to="/#energy"
        num={1}
        text={"Energy"}
      />
    );
    const Milestone = (
      <HeaderTab
        scrolled={scrolled}
        selected
        num={2}
        handleHeaderChange={handleHeaderChange}
        to="/#roadmap"
        text={"Road Map"}
      />
    );
    const Team = (
      <HeaderTab
        scrolled={scrolled}
        selected
        num={3}
        handleHeaderChange={handleHeaderChange}
        to="/#team"
        text={"Team"}
      />
    );
    const Contact = (
      <HeaderTab
        scrolled={scrolled}
        selected
        num={4}
        handleHeaderChange={handleHeaderChange}
        to="/#contact"
        text={"Contact"}
      />
    );

    const headers = [Home, Energy, Milestone, Team, Contact];
    if (collapsedEnd) {
      return headers[headerOn];
    } else {
      return null;
    }
  };

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < -150) {
      setScrolled(true);
    } else if (isPhone) {
      if (!headerLock) {
        setCollapsedStart(true);
        setHeader(0);
      }
    } else {
      if (headerOn !== 0) {
        setScrolled(false);
        setHeader(0);
        setCollapsedStart(false);
        setCollapsedEnd(false);
      }
    }
    if (!headerLock) {
      if (
        currPos.y <= props.heights.energy + 100 &&
        currPos.y > props.heights.milestone + 100
      ) {
        setCollapsedStart(true);
        setHeader(1);
      } else if (
        currPos.y <= props.heights.milestone + 100 &&
        currPos.y > props.heights.team + 100
      ) {
        setCollapsedStart(true);
        setHeader(2);
      } else if (
        currPos.y <= props.heights.team + 100 &&
        currPos.y > props.heights.contact + 100
      ) {
        setCollapsedStart(true);
        setHeader(3);
      } else if (currPos.y <= props.heights.contact + 100) {
        setCollapsedStart(true);
        setHeader(4);
      }
    }
  });

  return (
    <Wrapper scrolled={scrolled} collapsed={collapsedStart}>
      <HomeLink onClick={() => handleHeaderChange(0)} to="/#top">
        <LogoFrame>
          <Logo src={require("./images/logo_Filled.png")} />
        </LogoFrame>
      </HomeLink>
      {headerCollapsed()}

      <Transition
        in={!collapsedStart}
        timeout={700}
        onExited={() => {
          setCollapsedEnd(true);
        }}
        unmountOnExit
        mountOnEnter
      >
        {state => (
          <Nav state={state} scrolled={scrolled}>
            <HeaderTab
              state={state}
              collapsed={collapsedStart}
              scrolled={scrolled}
              handleHeaderChange={handleHeaderChange}
              to="/#energy"
              num={1}
              text={"Energy"}
            />
            <HeaderTab
              state={state}
              collapsed={collapsedStart}
              scrolled={scrolled}
              handleHeaderChange={handleHeaderChange}
              to="/#roadmap"
              num={2}
              text={"Road Map"}
            />
            <HeaderTab
              state={state}
              collapsed={collapsedStart}
              scrolled={scrolled}
              handleHeaderChange={handleHeaderChange}
              to="/#team"
              num={3}
              text={"Team"}
            />
            <HeaderTab
              state={state}
              collapsed={collapsedStart}
              scrolled={scrolled}
              handleHeaderChange={handleHeaderChange}
              to="/#contact"
              num={4}
              text={"Contact"}
            />
          </Nav>
        )}
      </Transition>
      <Transition in={collapsedEnd} timeout={500}>
        {state => (
          <HeaderToggle
            state={state}
            collapsed={collapsedEnd}
            onClick={() => handleHeaderToggle()}
          >
            <Hamburger src={require("./svg/hamburger.svg")} />
          </HeaderToggle>
        )}
      </Transition>
    </Wrapper>
  );
}

export default Header;
