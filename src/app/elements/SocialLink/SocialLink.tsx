import React from 'react';
import './SocialLink.scss';

function SocialLink(props: {
	iconColor: string;
	iconSize: number;
	link: string;
	icon: JSX.Element;
}) {
	return (
		<a
			style={{ height: props.iconSize, width: props.iconSize, color: props.iconColor }}
			className='socialLink ms-1'
			target='_blank'
			href={'https://' + props.link}>
			{props.icon}
		</a>
	);
}

export default SocialLink;
