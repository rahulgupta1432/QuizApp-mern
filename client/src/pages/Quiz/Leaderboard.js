import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import '../../styles/Leaderboard.css'; // Import custom styles
import {API_URL} from '../../constant';
import Header from '../../components/Layout/Header';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/leaderboard`);
            const res = response.data;
            if (res?.code === 200) {
                setScores(res.data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                label="View Profile"
                className="p-button-secondary"
                onClick={() => navigate(`/profile/${rowData.email}`)}
            />
        );
    };

    return (
        <>
            <Header />
            <div className="leaderboard-container">
                <h2 className="leaderboard-title">Leaderboard</h2>
                <DataTable
                    value={scores}
                    tableStyle={{ minWidth: '50rem', overflow: 'visible' }} // Remove horizontal scroll
                    paginator
                    rows={10}
                >
                    <Column header="Sr. No." body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: '5%' }} />
                    <Column field="email" header="Email" style={{ width: '35%' }} />
                    <Column field="totalScore" header="Score" style={{ width: '25%' }} />
                    <Column header="Actions" body={actionBodyTemplate} style={{ width: '35%' }} />
                </DataTable>
            </div>
        </>
    );
};

export default Leaderboard;
