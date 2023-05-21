import React, { useEffect } from 'react';
import './AppFooter.scss';
import contactInfo from 'p@/descriptions/contactInfo.json';
import { useLocation } from 'react-router-dom';

//Socials
import Facebook from 'p@/icons/socials/facebook.svg';
import Instagram from 'p@/icons/socials/instagram.svg';
import Telegram from 'p@/icons/socials/telegram.svg';
import Vk from 'p@/icons/socials/vk.svg';
import SocialLink from 'pages/elements/SocialLink/SocialLink';

function AppFooter(props: { tabLinks: string[] }) {
	//scroll to top
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div className='footer-container py-3 mt-5 padded-page'>
			<div className='main-section'>
				<div className='contacts'>
					<span>{contactInfo.contacts.phone}</span>
					<span>{contactInfo.contacts.email}</span>
					<span>{contactInfo.contacts.address}</span>
					<span>{contactInfo.contacts.postal}</span>
				</div>
				<div className='social-links mb-1'>
					<SocialLink
						iconSize={30}
						iconColor='white'
						link={contactInfo.social.vk}
						icon={<Vk />}></SocialLink>
					<SocialLink
						iconSize={30}
						iconColor='white'
						link={contactInfo.social.telegram}
						icon={<Telegram />}></SocialLink>
					<SocialLink
						iconSize={30}
						iconColor='white'
						link={contactInfo.social.instagram}
						icon={<Instagram />}></SocialLink>
					<SocialLink
						iconSize={30}
						iconColor='white'
						link={contactInfo.social.facebook}
						icon={<Facebook />}></SocialLink>
				</div>
			</div>
		</div>
	);
}

export default AppFooter;
