import React, { useState } from 'react';
import './ModalForm.scss';
import Form from 'react-bootstrap/Form';
import { Button, InputGroup } from 'react-bootstrap';
import store from 'pages/store/store';
import { formSlice } from 'pages/store/reducers';
import { ICheck, IError, IField, ITranslationEntry } from 'p@/common-types/common-types';
import { AuthHttpClient } from 'HttpClient';
import ErrorToast from '../errorToast/ErrorToast';

function ModalForm(props: {
	formTranslations: ITranslationEntry;
	errorTranslations: ITranslationEntry;
}) {
	const authClient = new AuthHttpClient();
	const [formMode, setFormMode] = useState<'login' | 'register'>('login');
	const [formStateLogin, setFormStateLogin] = useState<IField<string>>({
		value: '',
		valid: undefined,
	});
	const [formStatePassword, setFormStatePassword] = useState<IField<string>>({
		value: '',
		valid: undefined,
	});
	const [formStatePasswordRepeat, setFormStatePasswordRepeat] = useState<IField<string>>({
		value: '',
		valid: undefined,
	});
	const [error, setError] = useState<string | undefined>(undefined);

	function onSubmit() {
		setError(undefined);
		let emptyCheck = checkRequiredFields();
		if (formMode === 'login') {
			if (emptyCheck && formStateLogin.valid && formStatePassword.valid) {
				const clientLogin = authClient.login(formStateLogin.value, formStatePassword.value);

				clientLogin.then(
					() => {
						onCancel();
					},
					(Error: IError) => {
						console.log('error', Error);
						setError(props.errorTranslations[Error.error]);
					}
				);
			}
		} else {
			if (
				emptyCheck &&
				formStateLogin.valid &&
				formStatePassword.valid &&
				formStatePasswordRepeat.valid
			) {
				const clientRegister = authClient
					.register(formStateLogin.value, formStatePassword.value)
					.then();
				clientRegister.then(
					() => {
						onCancel();
					},
					(Error: IError) => {
						console.log('error', Error);
						setError(props.errorTranslations[Error.error]);
					}
				);
			}
		}
	}
	function onCancel() {
		setError(undefined);
		store.dispatch(formSlice.actions.setVisibility({ visible: false }));
	}
	function checkRequiredFields(): boolean {
		let check = false;
		if (formMode === 'login') {
			if (formStateLogin.value.length === 0) {
				setFormStateLogin({
					value: '',
					valid: false,
					message: props.formTranslations.required,
					finalCheck: true,
				});
				check = false;
			}
			if (formStatePassword.value.length === 0) {
				setFormStatePassword({
					value: '',
					valid: false,
					message: props.formTranslations.required,
					finalCheck: true,
				});
				check = false;
			}
			check = true;
		}
		if (formMode === 'register') {
			if (formStateLogin.value.length === 0) {
				setFormStateLogin({
					value: '',
					valid: false,
					message: props.formTranslations.required,
					finalCheck: true,
				});
				check = false;
			}
			if (formStatePassword.value.length === 0) {
				setFormStatePassword({
					value: '',
					valid: false,
					message: props.formTranslations.required,
					finalCheck: true,
				});
				check = false;
			}
			check = true;
			if (formStatePasswordRepeat.value.length === 0) {
				setFormStatePasswordRepeat({
					value: '',
					valid: false,
					message: props.formTranslations.required,
					finalCheck: true,
				});
				check = false;
			}
			check = true;
		}
		return check;
	}

	function validateLogin(login: string): ICheck {
		if (login.includes('@')) {
			return { valid: true };
		} else {
			return { valid: false, message: props.formTranslations.invalidLogin };
		}
	}
	function validatePassword(password: string): ICheck {
		if (password.length >= 6) {
			return { valid: true };
		} else {
			return { valid: false, message: props.formTranslations.invalidPassword };
		}
	}
	function validatePasswordRepeat(password: string, mode: 'password' | 'passwordRepeat'): ICheck {
		if (mode === 'passwordRepeat') {
			if (password === formStatePassword.value) {
				return { valid: true };
			} else {
				return { valid: false, message: props.formTranslations.invalidPasswordRepeat };
			}
		} else {
			if (password === formStatePasswordRepeat.value) {
				return { valid: true };
			} else {
				return { valid: false, message: props.formTranslations.invalidPasswordRepeat };
			}
		}
	}
	return (
		<div className='clickbox'>
			<div className='form-placeholder'>
				{formMode === 'login' && (
					<Form className='popup-form user-select-none'>
						<Form.Label className='mb-3'>
							<h5>{props.formTranslations.loginTitle}</h5>
						</Form.Label>
						{error && (
							<ErrorToast
								message={error}
								className='mb-2'
							/>
						)}
						<Form.Group className='mb-2'>
							<Form.Label>{props.formTranslations.email}</Form.Label>
							<Form.Control
								type='text'
								required
								isValid={formStateLogin.value.length > 0 && formStateLogin.valid}
								isInvalid={
									(formStateLogin.value.length > 0 || formStateLogin.finalCheck) &&
									!formStateLogin.valid
								}
								onChange={(e) => {
									let fieldValidation = validateLogin(e.target.value);
									setFormStateLogin({
										value: e.target.value,
										valid: fieldValidation.valid,
										message: fieldValidation.message,
										finalCheck: false,
									});
								}}
							/>
							{(formStateLogin.value.length > 0 || formStateLogin.finalCheck) &&
								!formStateLogin.valid && (
									<span className='text-danger'>
										{formStateLogin.message} <br />
									</span>
								)}
							<span className='text-muted'>
								{props.formTranslations.notRegistered}
								{'  '}
								<u
									role='button'
									onClick={() => {
										setFormMode('register');
										setError(undefined);
										setFormStateLogin({ value: '', valid: undefined, finalCheck: false });
										setFormStatePassword({ value: '', valid: undefined, finalCheck: false });
										setFormStatePasswordRepeat({ value: '', valid: undefined, finalCheck: false });
									}}>
									{props.formTranslations.createAccount}
								</u>
							</span>
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>{props.formTranslations.password}</Form.Label>
							<Form.Control
								type='text'
								required
								isValid={formStatePassword.value.length > 0 && formStatePassword.valid}
								isInvalid={
									(formStatePassword.value.length > 0 || formStatePassword.finalCheck) &&
									!formStatePassword.valid
								}
								onChange={(e) => {
									let fieldValidation = validatePassword(e.target.value);
									setFormStatePassword({
										value: e.target.value,
										valid: fieldValidation.valid,
										message: fieldValidation.message,
										finalCheck: false,
									});
								}}
							/>
							{(formStatePassword.value.length > 0 || formStatePassword.finalCheck) &&
								!formStatePassword.valid && (
									<span className='text-danger'>
										{formStatePassword.message} <br />
									</span>
								)}
						</Form.Group>

						<div className='form-button-container'>
							<Button
								variant='light'
								type='button'
								onClick={() => {
									onCancel();
								}}>
								{props.formTranslations.cancel}
							</Button>
							<Button
								variant='dark'
								type='button'
								onClick={() => {
									onSubmit();
								}}>
								{props.formTranslations.submitLogin}
							</Button>
						</div>
					</Form>
				)}
				{formMode === 'register' && (
					<Form className='popup-form user-select-none'>
						<Form.Label className='mb-3'>
							<h5>{props.formTranslations.registerTitle}</h5>
						</Form.Label>
						{error && (
							<ErrorToast
								message={error}
								className='mb-2'
							/>
						)}
						<Form.Group className='mb-2'>
							<Form.Label>{props.formTranslations.email}</Form.Label>
							<Form.Control
								required
								type='text'
								isValid={formStateLogin.value.length > 0 && formStateLogin.valid}
								isInvalid={
									(formStateLogin.value.length > 0 || formStateLogin.finalCheck) &&
									!formStateLogin.valid
								}
								onChange={(e) => {
									let fieldValidation = validateLogin(e.target.value);
									setFormStateLogin({
										value: e.target.value,
										valid: fieldValidation.valid,
										message: fieldValidation.message,
										finalCheck: false,
									});
								}}
							/>
							{(formStateLogin.value.length > 0 || formStateLogin.finalCheck) &&
								!formStateLogin.valid && (
									<span className='text-danger'>
										{formStateLogin.message} <br />
									</span>
								)}
							<span className='text-muted'>
								{props.formTranslations.alreadyHaveAccount}{' '}
								<u
									role='button'
									onClick={() => {
										setFormMode('login');
										setError(undefined);
										setFormStateLogin({ value: '', valid: undefined, finalCheck: false });
										setFormStatePassword({ value: '', valid: undefined, finalCheck: false });
										setFormStatePasswordRepeat({ value: '', valid: undefined, finalCheck: false });
									}}>
									{props.formTranslations.submitLogin}
								</u>
							</span>
						</Form.Group>
						<Form.Group className='mb-2'>
							<Form.Label>{props.formTranslations.password}</Form.Label>
							<Form.Control
								type='text'
								required
								isValid={formStatePassword.value.length > 0 && formStatePassword.valid}
								isInvalid={
									(formStatePassword.value.length > 0 || formStatePassword.finalCheck) &&
									!formStatePassword.valid
								}
								onChange={(e) => {
									let fieldValidation = validatePassword(e.target.value);
									let repeatFieldValidation = validatePasswordRepeat(e.target.value, 'password');
									setFormStatePassword({
										value: e.target.value,
										valid: fieldValidation.valid,
										message: fieldValidation.message,
										finalCheck: false,
									});
									setFormStatePasswordRepeat({
										value: formStatePasswordRepeat.value,
										valid: repeatFieldValidation.valid,
										message: repeatFieldValidation.message,
										finalCheck: false,
									});
								}}
							/>
							{(formStatePassword.value.length > 0 || formStatePassword.finalCheck) &&
								!formStatePassword.valid && (
									<span className='text-danger'>
										{formStatePassword.message} <br />
									</span>
								)}
						</Form.Group>
						<Form.Group className='mb-4'>
							<Form.Label>{props.formTranslations.passwordConfirm}</Form.Label>
							<Form.Control
								type='text'
								required
								isValid={formStatePasswordRepeat.value.length > 0 && formStatePasswordRepeat.valid}
								isInvalid={
									(formStatePasswordRepeat.value.length > 0 ||
										formStatePasswordRepeat.finalCheck) &&
									!formStatePasswordRepeat.valid
								}
								onChange={(e) => {
									let fieldValidation = validatePasswordRepeat(e.target.value, 'passwordRepeat');
									setFormStatePasswordRepeat({
										value: e.target.value,
										valid: fieldValidation.valid,
										message: fieldValidation.message,
										finalCheck: false,
									});
								}}
							/>
							{(formStatePasswordRepeat.value.length > 0 || formStatePasswordRepeat.finalCheck) &&
								!formStatePasswordRepeat.valid && (
									<span className='text-danger'>
										{formStatePasswordRepeat.message} <br />
									</span>
								)}
						</Form.Group>

						<div className='form-button-container'>
							<Button
								variant='light'
								type='button'
								onClick={() => {
									onCancel();
								}}>
								{props.formTranslations.cancel}
							</Button>
							<Button
								variant='dark'
								type='button'
								onClick={() => {
									onSubmit();
								}}>
								{props.formTranslations.submitRegister}
							</Button>
						</div>
					</Form>
				)}
				<button
					className='btn form-close'
					onClick={() => {
						onCancel();
					}}>
					<i className='bi bi-x-lg'></i>
				</button>
			</div>
		</div>
	);
}
export default ModalForm;
