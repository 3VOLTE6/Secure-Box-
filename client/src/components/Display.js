import { useState } from "react";
import axios from "axios";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState({ files: [] });
  const [sortConfig, setSortConfig] = useState({ key: 'fileName', direction: 'ascending' });

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }

    if (dataArray && dataArray.length > 0) {
      const files = await Promise.all(
        dataArray.map(async (item, index) => {
          const fileType = await getFileType(item);
          const url = new URL(item);
          const fileName = url.searchParams.get("filename") || item.split("/").pop();
          const metadata = await getFileMetadata(item.split("?")[0]);
          return { url: item, fileType, fileName, index, owner: Otheraddress || account, ...metadata };
        })
      );
      setData({ files });
    } else {
      alert("No files to display");
    }
  };

  const getFileType = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      const contentType = response.headers.get("content-type");
      if (contentType.startsWith("image/")) {
        return "image";
      } else if (contentType === "application/pdf") {
        return "pdf";
      } else if (contentType.startsWith("audio/")) {
        return "mp3";
      } else if (contentType.startsWith("video/")) {
        return "video";
      } else {
        return "file";
      }
    } catch (error) {
      console.error("Error checking file type:", error);
      return "file";
    }
  };

  const getFileMetadata = async (url) => {
    const hash = url.split('/').pop();
    try {
      const response = await axios.get(`https://api.pinata.cloud/data/pinList?hashContains=${hash}`, {
        headers: {
          pinata_api_key: `801718cb199e1cda156d`,
          pinata_secret_api_key: `c3cb8feb3c8ea1fa301240571152ad9e00d5465646d793f56748ce4dc0e53747`
        }
      });
      const metadata = response.data.rows[0];
      const sizeInMB = (metadata.size / (1024 * 1024)).toFixed(2);
      return {
        size: `${sizeInMB} MB`,
        date: new Date(metadata.date_pinned).toLocaleDateString()
      };
    } catch (error) {
      console.error("Error getting file metadata:", error);
      return { size: "N/A", date: "N/A" };
    }
  };

  const sortedFiles = [...data.files].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleRemove = async (fileOwner, index) => {
    try {
      await contract.remove(fileOwner, index);
      getdata();
    } catch (error) {
      console.error("Error removing file:", error);
      alert("Failed to remove file. You might not have the necessary permissions.");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <div className="center">
        <button className="button" onClick={getdata}>
          Get Data
        </button>
      </div>
      {data.files.length > 0 && (
        <div className="file-table-container">
          <table className="file-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort('fileName')}
                    className={sortConfig.key === 'fileName' ? sortConfig.direction : ''}
                  >
                    File Name
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort('size')}
                    className={sortConfig.key === 'size' ? sortConfig.direction : ''}
                  >
                    Size
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort('date')}
                    className={sortConfig.key === 'date' ? sortConfig.direction : ''}
                  >
                    Date
                  </button>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedFiles.map((file, index) => (
                <tr key={index}>
                  <td>
                    {file.fileType === 'image' ? (
                      <img src={file.url} alt={file.fileName} className="file-preview" />
                    ) : (
                      <img src={`/images/generic-${file.fileType}-icon.png`} alt={`${file.fileType} icon`} className="file-preview" />
                    )}
                  </td>
                  <td>{file.fileName}</td>
                  <td>{file.size}</td>
                  <td>{file.date}</td>
                  <td>
                    <a href={file.url} className="download-button" download>
                      Download
                    </a>
                    {account === file.owner && (
                      <button
                        onClick={() => handleRemove(file.owner, file.index)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Display;
