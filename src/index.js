import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import EmployeesContextProvider from './Contexts/employeesContext';

ReactDOM.render(
	<EmployeesContextProvider>
		<App />
	</EmployeesContextProvider>,
	document.getElementById('root')
);