import React from 'react';
import './ProfilePicture.scss';
import { Button, Dropdown } from 'react-bootstrap';
import { AuthHttpClient } from 'HttpClient';

function ProfilePicture(props: { login: string; className: string }) {
	const authHttpClient = new AuthHttpClient();
	return (
		<Dropdown className={props.className}>
			<Dropdown.Toggle variant='light'>
				<i className='bi bi-person-circle'></i>
			</Dropdown.Toggle>
			<Dropdown.Menu variant='dark'>
				<Dropdown.Item
					disabled
					className='text-center'>
					<span className='text-muted'>Логин:</span> {props.login}
				</Dropdown.Item>
				<Dropdown.Item
					className='text-center'
					onClick={() => {
						authHttpClient.unlogin();
					}}>
					<span className='text-danger'>Выход</span>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default ProfilePicture;
