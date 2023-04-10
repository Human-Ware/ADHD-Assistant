window.onload = function () {
    chrome.windows.getCurrent({}, w => {
      chrome.windows.update(w.id, { focused: true }, () => { });
    });
  }
  
document.getElementById("id_set").onclick = () => {
  document.getElementById("id_fileName").innerText = document.getElementById("id_url").value;;
  document.getElementById("id_audio").src = document.getElementById("id_url").value;
}

const pickerOpts = {
  types: [
    {
      description: "Audio file",
      accept: { "audio/mpeg": [".mp3"] }
    },
  ],
}

const fileTypes = [
  {
    description: "Audio file",
    accept: { "audio/mpeg": [".mp3"] }
  },
]

document.getElementById("id_open").onclick = async () => {
  try {
    const fhArray = await window.showOpenFilePicker({types: fileTypes});
    const fh = fhArray[0];
    document.getElementById("id_fileName").innerText = fh.name;
    const fd = await fh.getFile();
    document.getElementById("id_audio").src = window.URL.createObjectURL(new Blob([await fd.arrayBuffer()]));
  }
  catch (e) { }
}

