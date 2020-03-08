import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';

import { PageHeader, List } from 'antd';

function App() {
	const [ values, setValues ] = useState([ { id: 1, name: 'Value 101' }, { id: 2, name: 'Value 102' } ]);

	useEffect(() => {
		axios.get('https://localhost:5001/api/values').then((res) => {
			setValues(res.data);
		});
	}, []);

	return (
		<div className="App">
			<PageHeader title="Reactivity" avatar={{ src: logo }}>
				<List bordered dataSource={values} renderItem={(v) => <List.Item>{v.name}</List.Item>} />
			</PageHeader>
		</div>
	);
}

export default App;
