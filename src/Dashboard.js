// frontend/src/Dashboard.js

import React, { useState, useEffect } from 'react';
import { fetchFiles, getFileUrl } from './services/api';

function Dashboard() {
    const [entityId] = useState('121'); // Sample entity ID
    const [files, setFiles] = useState(null);

    useEffect(() => {
        const loadFiles = async () => {
            try {
                const data = await fetchFiles(entityId);
                setFiles(data);
            } catch (error) {
                console.error("Error loading files:", error);
            }
        };
        loadFiles();
    }, [entityId]);

    if (!files) return <p>Loading...</p>; // Render loading state while data is fetched

    const renderPreview = (file, entityId, category) => {
        if (!file) return null;

        const fileUrl = getFileUrl(entityId, category, file.name);
        const isDocx = file.name.endsWith('.docx');
        const isPdf = file.name.endsWith('.pdf');

        if (isDocx) {
            // Use Google Docs Viewer for DOCX files
            return (
                <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                    width="100%"
                    height="600px"
                    title={file.name}
                    style={{ marginTop: '10px', border: '1px solid #ddd' }}
                />
            );
        } else if (isPdf) {
            // Directly embed PDF files
            return (
                <iframe
                    src={fileUrl}
                    width="100%"
                    height="600px"
                    title={file.name}
                    style={{ marginTop: '10px', border: '1px solid #ddd' }}
                />
            );
        } else {
            return <p>Unsupported file format.</p>;
        }
    };

    return (
        <div className="dashboard">
            <div className="section">
                <h2>Complaint Docs</h2>
                {files.complaintFiles?.complaint && (
                    <div>
                        <a href={getFileUrl(entityId, 'Complaint_Docs', files.complaintFiles.complaint.name)} download>
                            Download {files.complaintFiles.complaint.name}
                        </a>
                        {renderPreview(files.complaintFiles.complaint, entityId, 'Complaint_Docs')}
                    </div>
                )}
                {files.complaintFiles?.exhibit && (
                    <div>
                        <a href={getFileUrl(entityId, 'Complaint_Docs', files.complaintFiles.exhibit.name)} download>
                            Download {files.complaintFiles.exhibit.name}
                        </a>
                        {renderPreview(files.complaintFiles.exhibit, entityId, 'Complaint_Docs')}
                    </div>
                )}
            </div>

            <div className="section">
                <h2>Track Changes</h2>
                {files.trackChangesFile && (
                    <div>
                        <a href={getFileUrl(entityId, 'Track_Changes', files.trackChangesFile.name)} download>
                            Download {files.trackChangesFile.name}
                        </a>
                        {renderPreview(files.trackChangesFile, entityId, 'Track_Changes')}
                    </div>
                )}
            </div>

            <div className="section">
                <h2>Email Generation</h2>
                {files.emailFolders?.map((folder) => (
                    <div key={folder.folderName}>
                        <h3>{folder.folderName}</h3>
                        {folder.files.map((file) => (
                            <div key={file.name}>
                                <a href={getFileUrl(entityId, `Email_Generation/${folder.folderName}`, file.name)} download>
                                    Download {file.name}
                                </a>
                                {renderPreview(file, entityId, `Email_Generation/${folder.folderName}`)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
