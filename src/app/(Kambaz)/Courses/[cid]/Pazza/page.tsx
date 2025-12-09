"use client"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ListOfPostsSidebar from "./ListOfPostsSidebar/listOfPostsSidebar";
import PazzaNavigation from "./PNB/PazzaNavigation";
import ManageFoldersScreen from "./ManageFolders";
import * as foldersClient from "./client/folders";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export default function Pazza() {
    const params = useParams();
    const courseId = params?.cid as string;
    
    const [activeTab, setActiveTab] = useState<'Q&A' | 'Manage Class'>('Q&A');
    const [selectedFolder, setSelectedFolder] = useState('');
    const [currentUser, setCurrentUser] = useState<string>('Loading...');
    const [userRole, setUserRole] = useState<string>('');
    const [folders, setFolders] = useState<string[]>([]);
    const [loadingFolders, setLoadingFolders] = useState(true);

    // Fetch folders from database
    useEffect(() => {
        const loadFolders = async () => {
            try {
                setLoadingFolders(true);
                const folderData = await foldersClient.getFoldersForCourse(courseId);
                const folderNames = folderData.map(f => f.name);
                setFolders(folderNames);
                
                // Set first folder as selected if available
                if (folderNames.length > 0 && !selectedFolder) {
                    setSelectedFolder(folderNames[0]);
                }
            } catch (error) {
                console.error('Error loading folders:', error);
                // Fallback to empty array if error
                setFolders([]);
            } finally {
                setLoadingFolders(false);
            }
        };

        if (courseId) {
            loadFolders();
        }
    }, [courseId]);

    // Fetch the current user on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_BASE}/users/profile`, {
                    withCredentials: true
                });
                const user = response.data;
                
                let displayName = 'User';
                if (user.firstName && user.lastName) {
                    displayName = `${user.firstName} ${user.lastName}`;
                } else if (user.firstName) {
                    displayName = user.firstName;
                } else if (user.username) {
                    displayName = user.username;
                }
                
                setCurrentUser(displayName);
                setUserRole(user.role);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error('Error fetching user:', err);
                if (err.response?.status === 401) {
                    setCurrentUser('Guest');
                } else {
                    setCurrentUser('User');
                }
            }
        };
        fetchUser();
    }, []);

    // Redirect non-faculty users away from Manage Class tab
    useEffect(() => {
        if (activeTab === 'Manage Class' && userRole !== 'FACULTY') {
            setActiveTab('Q&A');
        }
    }, [activeTab, userRole]);

    // Reload folders when returning from Manage Class tab
    useEffect(() => {
        if (activeTab === 'Q&A' && courseId) {
            const reloadFolders = async () => {
                try {
                    const folderData = await foldersClient.getFoldersForCourse(courseId);
                    const folderNames = folderData.map(f => f.name);
                    setFolders(folderNames);
                } catch (error) {
                    console.error('Error reloading folders:', error);
                }
            };
            reloadFolders();
        }
    }, [activeTab, courseId]);

    if (loadingFolders) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column vh-100">
            <PazzaNavigation
                courseName={courseId}
                currentUser={currentUser}
                folders={folders}
                activeTab={activeTab}
                selectedFolder={selectedFolder}
                onTabChange={setActiveTab}
                onFolderChange={setSelectedFolder}
                userRole={userRole}
            />
            
            <div className="d-flex flex-grow-1 overflow-hidden">
                {activeTab === 'Q&A' ? (
                    <ListOfPostsSidebar courseId={courseId} />
                ) : userRole === 'FACULTY' ? (
                    <div className="flex-grow-1 overflow-auto p-4">
                        <ManageFoldersScreen courseId={courseId} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}