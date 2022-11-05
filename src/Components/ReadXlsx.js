import { nanoid } from "nanoid";
import React, { useContext } from "react";
import * as XLSX from "xlsx";
import { SET_ACTIVE_QUIZ } from "../actions/appAction.type";
import { userContext } from "../store/store";

const ReadXlsx = () => {
  const { state, dispatch } = useContext(userContext);

  /* Fetch and update the state once */
  const readAndConvertXlsx = async (e) => {
    e.preventDefault();
    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];
      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const finalData = {};
      dataParse.map((value, index) => {
        finalData[nanoid()] = value;
      });
      dispatch({ type: SET_ACTIVE_QUIZ, payload: finalData });
    };
    reader.readAsBinaryString(f);
  };

  return (
    <div>
      <h3>Choose File to upload </h3>
      <input type="file" onChange={readAndConvertXlsx}></input>
    </div>
  );
};

export default ReadXlsx;
