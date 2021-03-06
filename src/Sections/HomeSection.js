import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Section, Text, colors } from '../styles';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
const Backdrop = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	background: linear-gradient(black, transparent);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	z-index: 0;
`;
const Button = styled.div`
	transition: 0.3s;
	margin: 2rem;
	padding: 2rem 5rem;
	box-shadow: rgba(0, 0, 0, 0.9) 0px 10px 20px;
	border-radius: 15px;
	border: 2px solid ${colors.deeppink};
	color: ${colors.lightcyan};
	text-align: center;
	display: inline-block;
	&:hover {
		transform: scale(0.9);
		background-color: ${colors.lightcyan};
		color: ${colors.deeppink};
	}
	@media (max-width: 768px) {
		margin-bottom: 2rem;
	}
`;
const Title = styled.h1`
	color: ${colors.gold};
	text-align: center;
	text-shadow: ${colors.gold} 0px 0px 5px;
	/* background: radial-gradient(circle at 50% 200%, ${colors.gold} 25%, ${colors.deeppink}); */
	/* radial-gradient(circle at 65% 107%, rgba(255,255,68,0.5) 0%, rgba(208,0,108,0.5) 55%, black 70%), 
          linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0) 70.71%) */
	/* background: linear-gradient(to right, ${colors.gold} 20%, ${colors.deeppink} 40%, ${colors.deeppink} 60%, ${colors.gold} 80%); */
	/* -webkit-background-clip: text; */
	/* -webkit-text-fill-color: transparent; */
	font-size: calc(0.8rem + 10vw);
	font-family: 'Electro-Shackle', sans-serif;
	font-weight: 500;
	padding: 0;
	margin: 0;
`;
const Slogan = styled.p`
	color: ${colors.lightcyan};
	width: 100%;
	font-size: calc(0.4rem + 3vw);
	font-family: 'GreenScreen';
	text-shadow: black 0px 0px 10px;
	padding: 0;
	margin: 0;
`;
const StyledImg = styled.img`
	margin: 1rem 0rem 1rem -0.5rem;
	height: 100%;
	width: auto;
	@media (max-width: 768px) {
		height: 110%;
	}
`;

const TitleSection = styled(Section)`
	margin: 10% 1vw 0rem;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	height: 20vw;
`;

const SloganSection = styled(Section)`
	transition: 0.7s;
	width: 100%;

	opacity: ${({ state }) => (state === 'exiting' || state === 'exited' ? 0 : 1)};
`;

function HomeSection() {
	const [sloganNum, setSloganNum] = useState(0);
	const [changeSlogan, setChangeSlogan] = useState(false);
	useEffect(() => {
		if (!changeSlogan) {
			setTimeout(() => {
				setChangeSlogan(true);
			}, 3000);
		}
	}, [changeSlogan]);
	return (
		<Wrapper>
			<Backdrop />
			<TitleSection width={'100%'}>
				<Title>Sh</Title> <StyledImg src={require('../images/SHELogo_Final.png')} />
				<Title>nanIgan</Title>
			</TitleSection>
			<SloganSection margin={'1rem 0 1rem 15%'}>
				<Slogan>Go Beyond Immersion</Slogan>
			</SloganSection>

			<Transition
				in={sloganNum === 0 && !changeSlogan}
				timeout={700}
				unmountOnExit
				mountOnEnter
				onExited={() => {
					setSloganNum(1);
					setChangeSlogan(false);
				}}
			>
				{(state) => (
					<SloganSection state={state} margin={'0 0 0 33%'}>
						<Slogan> Faster Athletes </Slogan>
					</SloganSection>
				)}
			</Transition>
			<Transition
				in={sloganNum === 1 && !changeSlogan}
				timeout={700}
				unmountOnExit
				mountOnEnter
				onExited={() => {
					setSloganNum(2);
					setChangeSlogan(false);
				}}
			>
				{(state) => (
					<SloganSection state={state} margin={'0 0 0 33%'}>
						<Slogan>Louder Fans</Slogan>
					</SloganSection>
				)}
			</Transition>
			<Transition
				in={sloganNum === 2 && !changeSlogan}
				timeout={700}
				unmountOnExit
				mountOnEnter
				onExited={() => {
					setSloganNum(0);
					setChangeSlogan(false);
				}}
			>
				{(state) => (
					<SloganSection state={state} margin={'0 0 0 33%'}>
						<Slogan>More Than A Game</Slogan>
					</SloganSection>
				)}
			</Transition>
		</Wrapper>
	);
}

export default HomeSection;
