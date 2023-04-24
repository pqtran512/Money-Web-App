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

export default class Project extends Component {
    constructor(props)
    {
        super(props);

        this.state = { user_ID: "", project_ID: "", money: 0, projData: [], projMember: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // * Get all project
    componentDidMount() {
        const userID = window.localStorage.getItem('userID');
        //console.log(username)
        // TODO Change to username, uncomment the above line

        fetch('http://localhost:3005/all-projects/' + userID)
        .then((response) => response.json())
        .then((json) =>
        {
            json = [json].map(o => ({...o, members: []}))
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
        const username = window.localStorage.getItem('username');
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
    
    render() {
        const { projData } = this.state;
        console.log(projData)
        var i = 0;
        return (
            <>
                <div className="page-container">
                    <SideBar />
                    <NavBar />
                    <div className="box-project"> {
                            projData.map((proj, index) => (
                                <div className="project" key={"project-" + index}>
                                    <div className="project-title">
                                        <div className="project-name">
                                            <p className='text-uppercase'>{proj[0].project_name}</p>
                                        </div>

                                        <div className="project-target">
                                            <p>
                                                Target: <span className="project-target-amount">{proj[0].target} ₫</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="project-detail">
                                        <div className="header">
                                            <div className="current">
                                                <p className='text-start pt-3'>
                                                    Current total amount: <span className={"current-amount " + (proj[0].reality_money < proj[0].target ? "text-danger" : "text-success")}>{proj[0].reality_money} ₫</span>
                                                </p>
                                            </div>

                                            {/* TODO get project ID */}
                                            <div 
                                                value={proj[0]._id}
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
                                                [proj.members].map((mem, idx) => (
                                                    console.log(mem),
                                                    <div className="contribution-details">
                                                        <p className="username">{mem.username}</p> {/* data */}
                                                        <p className="privilege">{mem.privilege}</p> {/* data */}
                                                        <p className="amount">{mem.money?.toLocaleString('en-US')} ₫</p> {/* data */}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                <div className="project" key={"project-" + index}>
                                    <div className="project-title">
                                        <div className="project-name">
                                            <p className='text-uppercase'>{proj[1].project_name}</p>
                                        </div>

                                        <div className="project-target">
                                            <p>
                                                Target: <span className="project-target-amount">{proj[1].target} ₫</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="project-detail">
                                        <div className="header">
                                            <div className="current">
                                                <p className='text-start pt-3'>
                                                    Current total amount: <span className={"current-amount " + (proj[1].reality_money < proj[1].target ? "text-danger" : "text-success")}>{proj[1].reality_money} ₫</span>
                                                </p>
                                            </div>

                                            {/* TODO get project ID */}
                                            <div 
                                                value={proj[1]._id}
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
                                                [proj.members].map((mem, idx) => (
                                                    console.log(mem),
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