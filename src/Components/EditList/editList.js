import { AiOutlineEdit } from "react-icons/ai";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import axios from "axios";

function EditList(props) {
  const [list, setList] = useState(new List());

  function getList() {
    let user = JSON.parse(localStorage.authInfo).user;
    axios.get("http://localhost:3000/lists/list/" + props.id).then((res) => {
      setList(res.data[0]);
    });
  }

  function updateList() {
    let user = JSON.parse(localStorage.authInfo).user;
    let ownerId = user._id;
    list.ownerId = ownerId;
    axios
      .put("http://localhost:3000/lists/", list)
      .then((res) => console.log(res));
  }

  return (
    <Popup
      className="add_new_todo_popup"
      position="middle center"
      modal
      nested
      trigger={
        <button className="AiOutlinePlus">
          <AiOutlineEdit
            onClick={() => {
              getList();
            }}
          >
            {" "}
          </AiOutlineEdit>
        </button>
      }
    >
      {(close) => (
        <div className="edit_list_popup">
          <div className="edit_list_popup_title modal-header">
            <h2>Edit list</h2>
          </div>
          <div className="edit_list_name_popup_body modal-body">
            <div>
              <div className="edit_list_name">
                <h5>Name</h5>
                <input
                  type="text"
                  className="border-2 border-bray-500"
                  placeholder={list.listName}
                  value={list.listName}
                  onChange={(input) => {
                    let listTemp = { ...list };
                    listTemp.listName = input.target.value;
                    setList(listTemp);
                    console.log(list);
                  }}
                ></input>
              </div>

              <br></br>
              <br></br>
            </div>
          </div>
          <div className="add_new_todo_popup_footer modal-footer">
            <button
              type="button"
              className="btn btn-primary bg-blue-500"
              onClick={() => {
                updateList();
                close();
                props.editListCallBack();
              }}
            >
              SUBMIT
            </button>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => {
                close();
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default EditList;

class List {
  ownerId = "";
  listName = "my todo";
}

function ConvertDateToDisplayDate(inputDate) {
  let tempDate = new Date(inputDate);
  let outputDate = tempDate.getFullYear() + "-";
  if (tempDate.getMonth() + 1 < 10) {
    outputDate += "0" + (tempDate.getMonth() + 1) + "-";
  } else {
    outputDate += tempDate.getMonth() + 1 + "-";
  }

  if (tempDate.getDate() < 10) {
    outputDate += "0" + tempDate.getDate();
  } else outputDate += tempDate.getDate();
  return outputDate;
}
