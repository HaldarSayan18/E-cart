import React, { useReducer, useState } from 'react';
import "../styling/DashBoard.css";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from "react-icons/md";
import { HiOutlineFolderMinus } from "react-icons/hi2";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Button from 'react-bootstrap/esm/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

// Testing Data
const DashBoardData = [
    { name: "Larry the Bird", files: [] },
    { name: "Sayan Haldar", files: [] },
    { name: "Isika Maiti", files: [] },
    { name: "Md. Raja", files: [] }
];

// Reducer function to handle state updates
function reducer(state, action) {
    switch (action.type) {
        case "addNew":
            return [...state, action.payload];
        case "removeOld":
            return state.filter((_, index) => index !== action.payload);
        case "editFolder":
            const updatedFolders = [...state];
            updatedFolders[action.payload.index] = { ...updatedFolders[action.payload.index], name: action.payload.newName };
            return updatedFolders;
        case "addFile":
            const updatedState = [...state];
            updatedState[action.payload.index].files.push(action.payload.fileName);
            return updatedState;
        default:
            return state;
    }
}

//main function
const DashBoard = () => {
    const [key, setKey] = useState('All projects');
    const [state, dispatch] = useReducer(reducer, DashBoardData);
    const [inputVal, setInputVal] = useState('');
    const [newFolder, setNewFolder] = useState('');
    const [editFileIndex, setEditFileIndex] = useState(null);

    const regData = JSON.parse(localStorage.getItem("Registration_data"))

    // Add new folder
    const handleCreateFolder = () => {
        if (newFolder.trim() !== '') {
            dispatch({ type: "addNew", payload: { name: newFolder, files: [] } });
            setNewFolder('');
        }
    };

    // Remove folder
    const removeOld = (index) => {
        dispatch({ type: "removeOld", payload: index });
    };

    // Edit folder name
    const handleEditFolder = (index) => {
        const newName = prompt("Enter new folder name:", state[index].name);
        if (newName && newName.trim() !== '') {
            dispatch({ type: "editFolder", payload: { index, newName } });
        }
    };

    // Add file to a project
    const handleFileUpload = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            dispatch({ type: "addFile", payload: { index, fileName: file.name } });
            // setNewFile('');
        }
    };

    return (
        <>
            <h2 className='dash-head'> {regData.firstname.toUpperCase()}'s Dashboard </h2>
            <Container style={{ background: "transparent" }}>
                <Row style={{marginBottom:"20px"}}>
                    <Col>

                        <input type='search'
                            className='input-control'
                            placeholder='🔍 Search Project' onChange={(e) => setInputVal(e.target.value)} value={inputVal} />
                    </Col>
                    <Col>
                        <button type='button'
                            className='newFolder'
                            data-bs-toggle="modal" data-bs-target="#newFolderModal">
                            <HiOutlineFolderMinus style={{
                                marginRight: "10px",
                                fontSize: "20px",
                                color: "white",
                                height: "25px", width: "30px"
                            }} />
                            New Folder
                        </button>

                        {/* Modal for Creating New Folder */}
                        <div className="modal fade" id="newFolderModal" tabIndex="-1" aria-labelledby="newFolderModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content" style={{ borderRadius: "0px", border: "none" }}>
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="newFolderModalLabel">New Folder</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <input type='text' className="form-control" placeholder="Folder name"
                                            value={newFolder}
                                            onChange={(e) => setNewFolder(e.target.value)} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-submit" onClick={handleCreateFolder} data-bs-dismiss="modal">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <button type='button' className='addProject' data-bs-toggle="modal" data-bs-target="#addProjectModal">
                            <MdAddCircleOutline style={{
                                marginRight: "10px",
                                fontSize: "20px",
                                color: "#ff4d03"
                            }} />
                            Add project
                        </button>

                        {/* Modal for Adding Project File */}
                        <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content" style={{ borderRadius: "0px", border: "none" }}>
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="addProjectModalLabel">Add Project File</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <input type='file' className="form-control" placeholder="Upload File"
                                            onChange={(e) => handleFileUpload(editFileIndex, e)} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-submit" data-bs-dismiss="modal">Upload</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <br/>
                </Row>
                <Row>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-8 col-sub-heading"
                    >
                        <Tab eventKey="My projects" title="My projects" className='col-sub-heading tab-class'>
                            <Table className="table" >
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}></th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Project Name</th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Project Files</th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Date of creation</th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Date of Modified</th>
                                        <th scope="col" className='action-row'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.map((folder, index) => (
                                        <tr key={index}>
                                            <th scope="row"><HiOutlineFolderMinus className='folder-svg' /></th>
                                            <td>{folder.name}</td>
                                            <td>
                                                {folder.files.length > 0 ? folder.files.join(", ") : "No files"}
                                            </td>
                                            <td>25 - 06 - 2024</td>
                                            <td>26 - 06 - 2024</td>
                                            <td>
                                                <FiEdit3 type='button'
                                                    className='edit-button'
                                                    onClick={() => handleEditFolder(index)}
                                                />
                                                <MdOutlineDelete type='button' className='dlt-button'
                                                    onClick={() => removeOld(index)} />
                                                <MdAddCircleOutline type='button' className='reAdd-button'
                                                    data-bs-toggle="modal" data-bs-target="#addProjectModal" onClick={() => setEditFileIndex(index)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Link to='/'><Button className='btn btn-warning close-button'> Close </Button></Link>
                        </Tab>
                        <Tab eventKey="All projects" title="All projects" className='col-sub-heading tab-class'>
                            <Table className="table" >
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}></th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Project Name</th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Project Files</th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Date of creation</th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Date of Modified</th>
                                        <th scope="col" className='action-row'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.map((folder, index) => (
                                        <tr key={index}>
                                            <th scope="row"><HiOutlineFolderMinus className='folder-svg' /></th>
                                            <td>{folder.name}</td>
                                            <td>
                                                {folder.files.length > 0 ? folder.files.join(", ") : "No files"}
                                            </td>
                                            <td>25 - 06 - 2024</td>
                                            <td>26 - 06 - 2024</td>
                                            <td>
                                                <FiEdit3 type='button'
                                                    className='edit-button'
                                                    onClick={() => handleEditFolder(index)}
                                                />
                                                <MdOutlineDelete type='button' className='dlt-button'
                                                    onClick={() => removeOld(index)} />
                                                <MdAddCircleOutline type='button' className='reAdd-button'
                                                    data-bs-toggle="modal" data-bs-target="#addProjectModal" onClick={() => setEditFileIndex(index)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Link to='/'><Button className='btn btn-warning close-button'> Close </Button></Link>
                        </Tab>
                        <Tab eventKey="Archieve" title="Archieve" className='col-sub-heading tab-class'>
                        <Table className="table" >
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}></th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Project Name</th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Project Files</th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Date of creation</th>
                                        <th scope="col" style={{ backgroundColor: "#192be9", color: "white" }}>Date of Modified</th>
                                        <th scope="col" className='action-row'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.map((folder, index) => (
                                        <tr key={index}>
                                            <th scope="row"><HiOutlineFolderMinus className='folder-svg' /></th>
                                            <td>{folder.name}</td>
                                            <td>
                                                {folder.files.length > 0 ? folder.files.join(", ") : "No files"}
                                            </td>
                                            <td>25 - 06 - 2024</td>
                                            <td>26 - 06 - 2024</td>
                                            <td>
                                                <FiEdit3 type='button'
                                                    className='edit-button'
                                                    onClick={() => handleEditFolder(index)}
                                                />
                                                <MdOutlineDelete type='button' className='dlt-button'
                                                    onClick={() => removeOld(index)} />
                                                <MdAddCircleOutline type='button' className='reAdd-button'
                                                    data-bs-toggle="modal" data-bs-target="#addProjectModal" onClick={() => setEditFileIndex(index)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        <Link to='/'><Button className='btn btn-warning close-button'> Close </Button></Link>
                        </Tab>
                    </Tabs>
                </Row>
            </Container >
        </>
    )
}

export default DashBoard;
