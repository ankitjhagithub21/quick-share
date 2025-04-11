const socket = io();

const uploadFile = async() => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if(file){
        
        const formData = new FormData();
        formData.append('file',file);
       
        try{
            const res = await fetch(`api/v1/upload`,{
                method:"POST",
                body:formData
            });
            const data = await res.json();
            alert(data.message)
        }catch(error){
            alert(error.message)
        }

    }else{
        alert("Please upload a file.")
    }
}

const downloadFile = async(filename) => {
    try{
        const res = await fetch(`api/v1/download/${filename}`);
        const data = await res.blob();

        const url = window.URL.createObjectURL(data);

        const a = document.createElement('a');
        a.href =url;
        a.download = filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a)

        window.URL.revokeObjectURL(url)

        console.log(url) 
    }catch(error){
        console.log(error);
        alert("Error downloading file")
    }
}


const updateFileList = (files) => {
    const fileListElement = document.getElementById('fileList');
    fileListElement.innerHTML = "";

    files.forEach(file => {
        const divElem = document.createElement('div')

        const spanElem = document.createElement('span')

        spanElem.textContent = file.filename

        const downloadBtn = document.createElement('button');

        downloadBtn.classList.add('btn','btn-success');

        downloadBtn.textContent = "Download";

        downloadBtn.onclick = () => {
            downloadFile(file.filename)
        }

        divElem.appendChild(spanElem)
        divElem.appendChild(downloadBtn)

        fileListElement.appendChild(divElem)

    });
}

socket.on('updateFileList',(files)=>{
    updateFileList(files)
})