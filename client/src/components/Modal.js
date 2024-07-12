import { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [address, setAddress] = useState("");

  const sharing = async () => {
    try {
      await contract.allow(address);
      console.log(`Access granted to ${address}`);
      setModalOpen(false);
    } catch (error) {
      console.error("Error sharing access:", error);
    }
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt.user;
        e1.value = opt.user;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Share with</h1>
        </div>
        <div className="body">
          <input
            type="text"
            placeholder="Enter Address"
            className="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <form id="myForm">
          <select id="selectNumber">
            <option className="address">People With Access</option>
          </select>
        </form>
        <div className="footer">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={sharing}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
