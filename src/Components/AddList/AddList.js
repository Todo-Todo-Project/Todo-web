import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";

// import "./addTodo.css"

function AddList(props) {
    const [newList, setNewList] = useState(new List());

    function savingList() {
        let user = JSON.parse(localStorage.authInfo).user;
        newList.ownerId = user._id;
        axios
            .post("http://localhost:3000/lists", newList)
            .then((res) => console.log(res));
    }

    return (
        <Popup
            className="add_new_list_popup"
            position="middle center"
            modal
            nested
            trigger={
                <button className="AiOutlinePlus">
                    <AiOutlinePlus onClick={() => console.log("clicked")}>
                        {" "}
                    </AiOutlinePlus>
                </button>
            }
        >
            {(close) => (
                <div className="add_new_list_todo_popup">
                    <div className="add_new_list_todo_popup_title modal-header">
                        <h2>Add new list</h2>
                    </div>
                    <div className="add_new_list_todo_popup_body modal-body">
                        <div>
                            <input
                                type="text"
                                className="border-2 border-bray-500"
                                value={newList.listName}
                                placeholder={newList.listName}
                                onChange={(input) => {
                                    let tempList = { ...newList };
                                    tempList.listName = input.target.value;
                                    setNewList(tempList);
                                }}
                            ></input>
                        </div>
                    </div>
                    <div className="add_new_list_todo_popup_footer modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary bg-blue-500"
                            onClick={() => {
                                savingList();
                                close();
                                props.addNewListCallBack();
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

export default AddList;

class List {
    ownerId = "";
    listName = "My list";
    todos = [];
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
