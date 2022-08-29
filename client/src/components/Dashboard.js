import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom';
import CreateStudent from './CreateStudent';
import ListStudents from './ListStudents';
import { FaGithub} from 'react-icons/fa';

export default function Dashboard() {
  return (
    <>
    				<nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark" id='rightOnTop'>
					{/* <!-- Navbar Brand--> */ }
					<a className="navbar-brand ps-3" href='/' target="_top" >Start Bootstrap</a>
				</nav>
				<div id="layoutSidenav">
					<div id="layoutSidenav_nav">
						<nav className="sidenavm sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
							<div className="sb-sidenav-menu">
								<div className="nav">
									<div className="sb-sidenav-menu-heading">Actions</div>
									<NavLink className="nav-link" to="/list-student">
										<div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
										List Students
									</NavLink>
									<NavLink className="nav-link" to="/create-student">
										<div className="sb-nav-link-icon">
											<i className="fas fa-table"></i>
										</div>
										Create Students
									</NavLink>
								</div>
							</div>
						</nav>
					</div>
					<div id="layoutSidenav_content">
						<main>
							<Switch>
								<Route path="/list-student" component={ ListStudents } />
								<Route path="/create-student/:id" component={ CreateStudent } />
								<Route path="/create-student" component={ CreateStudent } />
							</Switch>
						</main>
						<footer className="py-4 bg-light mt-auto">
							<div className="container-fluid px-4">
								<div className="d-flex align-items-center justify-content-end small">
									<details>
										<summary className="text-muted">Copyright &copy; crud_page </summary>
										<p> &middot; by <FaGithub /> <a target='blank' rel="noreferrer" href='https://github.com/Sunny-unik/'>
											@Sunny-unik</a></p>
									</details>
								</div>
							</div>
						</footer>
					</div>
				</div>
        </>  )
}
