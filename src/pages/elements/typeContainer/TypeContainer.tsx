import React from 'react';
import { ServiceType } from 'p@/common-types/common-types';

export function TypeContainer(props: { type: string }) {
	function renderType(type: string): JSX.Element {
		switch (type) {
			case ServiceType.Android: {
				return <i className='bi bi-android2' />;
			}
			case ServiceType.Apple: {
				return <i className='bi bi-apple' />;
			}
			case ServiceType.Windows: {
				return <i className='bi bi-windows' />;
			}
			case ServiceType.Repair: {
				return <i className='bi bi-screwdriver' />;
			}
			default: {
				return <i className='bi bi-screwdriver' />;
			}
		}
	}
	return (
		<div className='typeContainer'>
			<h3>{renderType(props.type)} </h3>
		</div>
	);
}

export default TypeContainer;
