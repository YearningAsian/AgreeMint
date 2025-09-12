// File upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const filePreview = document.getElementById('filePreview');
    const analysisContent = document.getElementById('analysisContent');

    // Click to upload
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    // Handle file upload
    function handleFileUpload(file) {
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                            'text/plain'];
        
        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
            alert('Please upload a PDF, DOC, DOCX, or TXT file.');
            return;
        }

        // Update file preview
        displayFileInfo(file);
        
        // Show analysis placeholder
        showAnalysisPlaceholder();
        
        // Simulate file processing
        setTimeout(() => {
            showAnalysisResults(file);
        }, 2000);
    }

    // Display file information
    function displayFileInfo(file) {
        const fileSize = formatFileSize(file.size);
        const fileName = file.name;
        const fileType = file.type || 'Unknown';
        
        filePreview.innerHTML = `
            <div class="file-info">
                <div class="file-icon">
                    ${getFileIcon(file.name)}
                </div>
                <div class="file-details">
                    <h4>${fileName}</h4>
                    <p class="file-meta">
                        <span class="file-size">${fileSize}</span>
                        <span class="file-type">${getFileTypeDisplay(file.name)}</span>
                    </p>
                    <div class="file-status">
                        <span class="status-indicator processing">Processing...</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Show analysis placeholder
    function showAnalysisPlaceholder() {
        analysisContent.innerHTML = `
            <div class="analysis-processing">
                <div class="processing-icon">🤖</div>
                <h4>Analyzing Contract...</h4>
                <p>AI is reviewing your document</p>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        `;
    }

    // Show analysis results
    function showAnalysisResults(file) {
        // Update file status
        const statusIndicator = document.querySelector('.status-indicator');
        if (statusIndicator) {
            statusIndicator.textContent = 'Analysis Complete';
            statusIndicator.className = 'status-indicator complete';
        }

        // Show analysis results
        analysisContent.innerHTML = `
            <div class="analysis-sections">
                <div class="analysis-item">
                    <h4>📋 Key Terms</h4>
                    <div class="analysis-result">
                        <ul class="key-terms">
                            <li><strong>Contract Duration:</strong> 12 months</li>
                            <li><strong>Payment Terms:</strong> Net 30 days</li>
                            <li><strong>Termination Clause:</strong> 30-day notice</li>
                            <li><strong>Liability Cap:</strong> $50,000</li>
                        </ul>
                    </div>
                </div>
                <div class="analysis-item">
                    <h4>⚠️ Risk Assessment</h4>
                    <div class="analysis-result">
                        <div class="risk-level moderate">
                            <span class="risk-indicator">Moderate Risk</span>
                        </div>
                        <ul class="risk-points">
                            <li>No force majeure clause detected</li>
                            <li>Intellectual property rights unclear</li>
                            <li>Dispute resolution process undefined</li>
                        </ul>
                    </div>
                </div>
                <div class="analysis-item">
                    <h4>💡 Recommendations</h4>
                    <div class="analysis-result">
                        <ul class="recommendations">
                            <li>Add force majeure protection clause</li>
                            <li>Clarify intellectual property ownership</li>
                            <li>Include arbitration clause for disputes</li>
                            <li>Consider adding confidentiality terms</li>
                        </ul>
                    </div>
                </div>
                <div class="analysis-summary">
                    <h4>📊 Summary Score</h4>
                    <div class="score-display">
                        <div class="score-circle">
                            <span class="score-number">7.2</span>
                            <span class="score-label">/10</span>
                        </div>
                        <p>Good contract with room for improvement</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Utility functions
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function getFileIcon(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        switch(extension) {
            case 'pdf': return '📄';
            case 'doc':
            case 'docx': return '📝';
            case 'txt': return '📃';
            default: return '📋';
        }
    }

    function getFileTypeDisplay(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        switch(extension) {
            case 'pdf': return 'PDF Document';
            case 'doc': return 'Word Document';
            case 'docx': return 'Word Document';
            case 'txt': return 'Text File';
            default: return 'Document';
        }
    }

    // Contact form interactions
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'Get Help') {
                alert('Help system would open here. This is a wireframe demonstration.');
            } else if (this.textContent === 'Schedule Demo') {
                alert('Demo scheduling would open here. This is a wireframe demonstration.');
            }
        });
    });

    // Help links
    const helpLinks = document.querySelectorAll('.help-link');
    helpLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`${this.textContent} page would open here. This is a wireframe demonstration.`);
        });
    });
});

// Add CSS for dynamic elements
const style = document.createElement('style');
style.textContent = `
    .file-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        text-align: left;
    }

    .file-icon {
        font-size: 3rem;
    }

    .file-details h4 {
        margin-bottom: 0.5rem;
        color: #333;
    }

    .file-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #666;
    }

    .status-indicator {
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    .status-indicator.processing {
        background: #ffeaa7;
        color: #e17055;
    }

    .status-indicator.complete {
        background: #d4edda;
        color: #155724;
    }

    .analysis-processing {
        text-align: center;
        padding: 2rem;
    }

    .processing-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    .loading-bar {
        width: 100%;
        height: 4px;
        background: #e0e0e0;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 1rem;
    }

    .loading-progress {
        width: 0%;
        height: 100%;
        background: #667eea;
        animation: loading 2s ease-in-out;
    }

    @keyframes loading {
        0% { width: 0%; }
        100% { width: 100%; }
    }

    .analysis-result ul {
        list-style: none;
        padding: 0;
    }

    .analysis-result li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .analysis-result li:last-child {
        border-bottom: none;
    }

    .risk-level {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        text-align: center;
        margin-bottom: 1rem;
    }

    .risk-level.moderate {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
    }

    .risk-indicator {
        font-weight: bold;
        color: #856404;
    }

    .score-display {
        text-align: center;
    }

    .score-circle {
        display: inline-block;
        width: 80px;
        height: 80px;
        border: 4px solid #667eea;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .score-number {
        font-size: 1.5rem;
        font-weight: bold;
        color: #667eea;
    }

    .score-label {
        font-size: 0.8rem;
        color: #666;
    }
`;
document.head.appendChild(style);