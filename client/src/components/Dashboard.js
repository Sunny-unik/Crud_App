import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import CreateStudent from './CreateStudent';
import  ListStundents from './ListStudents';
import Footer from './Footer';

export default function Dashboard() {
		return <>
			<nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark" id='rightOnTop'>
				{/* <!-- Navbar Brand--> */ }
				<NavLink className="navbar-brand ps-3" to='/' id="brand_top" >Students Database</NavLink>
				<div className='d-flex grow-1'></div>
				<NavLink className="nav-link" to="/list-student">
					<i className="fas fa-chart-area"></i> List Students
				</NavLink>
				<NavLink className="nav-link" to="/create-student">
					<i className="fas fa-table"></i> Create Students
				</NavLink>
			</nav>
			<main>
				<Switch>
					<Route path="/list-student" component={ ListStundents } />
					<Route path="/create-student/:id" component={ CreateStudent } />
					<Route path="/create-student" component={ CreateStudent } />
				</Switch>
			</main>
			<Footer/>
		</>
}
