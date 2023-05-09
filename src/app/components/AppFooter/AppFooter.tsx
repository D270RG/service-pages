import React, { useEffect, useState } from 'react';
import './AppFooter.scss';
import contactInfo from 'p@/descriptions/contactInfo.json';
import translations from 'p@/descriptions/translations.json';
import { Languages } from 'p@/common-types/common-types';
import { Link, useLocation } from 'react-router-dom';

//Socials
import Facebook from 'p@/icons/socials/facebook.svg';
import Instagram from 'p@/icons/socials/instagram.svg';
import Telegram from 'p@/icons/socials/telegram.svg';
import Vk from 'p@/icons/socials/vk.svg';
import SocialLink from '@/app/elements/SocialLink/SocialLink';

function AppFooter(props: { tabLinks: string[] }) {
	//scroll to top
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const [links, setLinks] = useState<JSX.Element[]>([]);
	useEffect(() => {
		let renderedLinks: JSX.Element[] = props.tabLinks.map((tabLink) => (
			<Link to={'/' + tabLink}>
				<span>{translations[Languages.ru].tabs[tabLink].title}</span>
			</Link>
		));
		setLinks(renderedLinks);
	}, []);
	return (
		<div className='footer-container py-3 mt-5 padded-half'>
			<div className='main-section'>
				<div className='link-block'>{links}</div>
				<div className='social-block'>
					<div className='contacts mb-3'>
						<span>{contactInfo.contacts.phone}</span>
						<span>{contactInfo.contacts.email}</span>
						<span>{contactInfo.contacts.address}</span>
						<span>{contactInfo.contacts.postal}</span>
					</div>
					<div className='social-links'>
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
			<hr className='hr' />
			<div className='secondary-section text-muted'>
				<span>{contactInfo.legal}</span>
			</div>
		</div>
	);
}

export default AppFooter;
