import React, { Component } from 'react';
import '../App.css';

// Style
import 'bootstrap/dist/css/bootstrap.css';

// Components
import NavBar from '../Components/navbar-project';
import SideBar from '../Components/sideBar';
import ProjectForm from '../Components/project-form';
import ProjectAddCont from '../Components/project-add-cont';
import ProjectAddMem from '../Components/project-add-mem';

export default class Project extends Component
{
    constructor(props)
    {
        super(props);

        this.state = { user_ID: "", project_ID: "", money: 0, projData: [], projMember: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // * Get all project
    componentDidMount()
    {
        // const username = window.localStorage.getItem('userID');

        // TODO Change to username, uncomment the above line
        fetch('http://localhost:3005/all-projects/example')
        .then((response) => response.json())
        .then((json) =>
        {
            json = json.map(o => ({...o, members: []}))
            this.setState({
                projData: json
            });
            console.log(json);
            for (let project of json) {
                fetch('http://localhost:3005/all-members/' + project._id)
                .then((response) => response.json())
                .then((members) => {
                    project.members = members
                    this.setState({
                        projData: json
                    })
                })
            }
        })
    }

    // * Add contribution
    handleSubmit(e)
    {
        e.preventDefault();

        const { project_ID, money } = this.state;
        const user_ID = "63b039df07258122b58d3b2a";
    }

    openFormTrans = (event) =>
    {
        document.querySelector('#form-add-trans').style.display = 'block';
        document.querySelector('.overlay').classList.toggle('blur');
    };

    openFormCont = (event) =>
    {
        document.querySelector('#form-add-cont').style.display = 'block';
        document.querySelector('.overlay').classList.toggle('blur');

        let current_date = new Date().toJSON().slice(0, 10);
        document.querySelector('#form-input-date').innerHTML = current_date;
    };

    openFormMem = (event) =>
    {
        document.querySelector('#form-add-mem').style.display = 'block';
        document.querySelector('.overlay').classList.toggle('blur');
    };
    
    closeFormTrans = (event) =>
    {
        document.querySelector('#form-add-trans').style.display = 'none';
        document.querySelector('.overlay').classList.toggle('blur');
    };

    closeFormCont = (event) =>
    {
        document.querySelector('#form-add-cont').style.display = 'none';
        document.querySelector('.overlay').classList.toggle('blur');
    };

    closeFormMem = (event) =>
    {
        document.querySelector('#form-add-mem').style.display = 'none';
        document.querySelector('.overlay').classList.toggle('blur');
    };
    
    clickLastMonthTab = (event) =>
    {
        document.querySelector('.tab-last-month').classList.toggle('hidden');
        document.querySelector('.tab-this-month').classList.add('hidden');
        document.querySelector('.tab-future').classList.add('hidden');
        console.log('Click last month tab');
    };

    clickThisMonthTab = (event) =>
    {
        document.querySelector('.tab-this-month').classList.toggle('hidden');
        document.querySelector('.tab-last-month').classList.add('hidden');
        document.querySelector('.tab-future').classList.add('hidden');
        console.log('Click this month tab');
    };

    clickFutureTab = (event) =>
    {
        document.querySelector('.tab-future').classList.toggle('hidden');
        document.querySelector('.tab-last-month').classList.add('hidden');
        document.querySelector('.tab-this-month').classList.add('hidden');
        console.log('Click future tab');
    };
    
    render()
    {
        const { projData } = this.state;

        return (
            <>
                <div className="page-container">
                    <SideBar />
                    <NavBar />
                    <div className="box-project">
                    {
                            projData.map((proj, index) => (
                                <div className="project" key={"project-" + index}>
                                    <div className="project-title">
                                        <div className="project-name">
                                            <p className='text-uppercase'>{proj.project_name}</p>
                                        </div>

                                        <div className="project-target">
                                            <p>
                                                Target: <span className="project-target-amount">{proj.target.toLocaleString('en-US')} ₫</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="project-detail">
                                        <div className="header">
                                            <div className="current">
                                                <p className='text-start pt-3'>
                                                    Current total amount: <span className={"current-amount " + (proj.reality_money < proj.target ? "text-danger" : "text-success")}>{proj.reality_money.toLocaleString('en-US')} ₫</span>
                                                </p>
                                            </div>

                                            {/* TODO get project ID */}
                                            <div 
                                                value={proj._id}
                                                className="icon icon-add-cont mt-2" 
                                                onClick={this.openFormCont}
                                            >
                                                <img src="https://cdn-icons-png.flaticon.com/512/3634/3634526.png" alt='icon' />
                                            </div>

                                            <div className="btn" onClick={this.openFormMem}>
                                                <button className="add-mem">+ MEMBER</button>
                                            </div>
                                        </div>

                                        {/* * Members */}
                                        <div className="member-contribution">
                                            {
                                                proj.members.map((mem, idx) => (
                                                    <div className="contribution-details">
                                                        <p className="username">{mem.username}</p> {/* data */}
                                                        <p className="privilege">{mem.privilege}</p> {/* data */}
                                                        <p className="amount">{mem.money?.toLocaleString('en-US')} ₫</p> {/* data */}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="overlay" />
                
                <ProjectForm />
                <ProjectAddCont />
                <ProjectAddMem />
            </>
        )
    }
}