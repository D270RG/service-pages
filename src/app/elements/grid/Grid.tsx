import React from 'react';
import './Grid.scss';

function Grid(props: React.PropsWithChildren) {
	return <div className='grid'>{props.children}</div>;
}

export default Grid;
