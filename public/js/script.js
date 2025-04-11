const socket = io();

const uploadFile = async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch(`/api/v1/upload`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            alert(data.message);
            fileInput.value = ""; // Clear input
        } catch (error) {
            alert("Upload failed: " + error.message);
        }
    } else {
        alert("Please upload a file.");
    }
};

const downloadFile = async (filename) => {
    try {
        const res = await fetch(`/api/v1/download/${filename}`);
        const blob = await res.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error(error);
        alert("Error downloading file.");
    }
};

const updateFileList = (files) => {
    const fileListElement = document.getElementById('fileList');
    fileListElement.innerHTML = "";

    files.forEach(file => {
        const divElem = document.createElement('div');
        divElem.className = "d-flex justify-content-between align-items-center border rounded p-2 mb-2 shadow-sm";

        const spanElem = document.createElement('span');
        spanElem.textContent = file.filename;
        spanElem.className = "text-break";

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn btn-success btn-sm';
        downloadBtn.textContent = "Download";
        downloadBtn.onclick = () => downloadFile(file.filename);

        divElem.appendChild(spanElem);
        divElem.appendChild(downloadBtn);

        fileListElement.appendChild(divElem);
    });
};

socket.on('updateFileList', (files) => {
    updateFileList(files);
});
