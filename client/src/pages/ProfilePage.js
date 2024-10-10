import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/ProfilePage.css'
import { useAuth } from '../context/Auth';
import Header from '../components/Layout/Header';
import { Button } from 'primereact/button';
import { API_URL } from '../constant';

const ProfilePage = () => {
    const [auth]=useAuth();
    const [userData,setUserData]=useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state
    const userId = auth?.user?._id;

    useEffect(()=>{
        fetchUserData();
    },[userId])
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/get-profile?userId=${userId}`);
            const resp = response.data;

            if (resp?.code === 200) {
                // toast.success(resp?.message);
                setUserData(resp.data[0]);
            } else {
                toast.error(resp?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };


    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value // Update the specific field being edited
        }));
    };
    

    const handleEditProfile=async()=>{
        setLoading(true);
        const updatedData = {
            userId: auth.user._id,
            email: userData.email // Only include the email
        };
        try {
            const response = await axios.put(`${API_URL}/api/admin/update-profile`,updatedData);
            const resp = response.data;
            if (resp?.code === 200) {
                setIsEditing(false)
                toast.success(resp?.message);
                setUserData((prevData) => ({
                    ...prevData,
                    email: userData.email
                }));
            } else {
                toast.error(resp?.message );
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        
    }

    if (!userData) return <p>Loading...</p>; // Loading state
    return (
        <>
            <Header/>
            <div className='profile-container-fluid m-3 p-1'>
                <div className='row'>
                    <div className='col-md-3'>
                    </div>
                    <div className='col-md-9'>
                        <div className="profile-container">
                            <h3 className='mt-2'>Account Details</h3>
                            <div className="profile-image-container">
                                <img
                                    src={"https://avatar.iran.liara.run/public"}
                                    width={"120px"}
                                    alt="Profile"
                                    className="profile-image"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="profile-image-input"
                                />
                            </div>
                            <div className="mb-3 mt-4">
                                <label><strong>Id:</strong> User_{userData._id}</label>
                            </div>
                            <div className="mb-3" style={{marginTop:'12px'}}>
                                <label><strong>Username:</strong> {isEditing ? (
                                    <input
                                        type="text"
                                        name="username"
                                        className="input-text"
                                        style={{marginLeft:'20px'}}
                                        placeholder='username'
                                        readOnly
                                    />
                                ) : userData.username||"admin@gmail.com"}</label>
                            </div>
                            <div className="mb-3" style={{marginTop:'12px'}}>
                                <label><strong>Email:</strong> {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        className="input-text"
                                        style={{marginLeft:'54px'}}
                                    />
                                ) : userData.email}</label>
                            </div>
                            <div className="mb-3" style={{marginTop:'12px'}}>
                                <label><strong>Mobile:</strong> {isEditing ? (
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={userData.mobile?userData.mobile:'+123 456 789'}
                                        className="input-text"
                                        style={{marginLeft:'40px'}}
                                        placeholder='+123 456 789'
                                        readOnly
                                    />
                                ) : userData.mobile?userData.mobile:'+123 456 789'}</label>
                            </div>
                            <div className="mt-3">
                                <Button
                                    label={isEditing ? "Save" : "Edit"}
                                    onClick={isEditing ? handleEditProfile : handleEditClick}
                                    className="profile-img p-button-primary"
                                />
                                {isEditing && (
                                    <Button
                                        label="Cancel"
                                        onClick={handleEditClick}
                                        className="profile-img p-button-secondary"
                                        style={{marginLeft:'50px'}}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
