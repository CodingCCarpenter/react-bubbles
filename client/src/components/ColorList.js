import React, { useState } from "react";

import axiosWithAuth from "../auth/axiosWithAuth";

import AddNewColor from '/AddNewColor';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(
    'src/components/ColorList: ColorList: COLORS: ',
    colors
  );
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      // Make a put request to save your updated color
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        setEditing(false);
      })
      .catch((err) => {
        console.log(
          'src/components/ColorList.js: ColorList: saveEdit: axiosWithAuth: .catch: ERR: ',
          err 
        )
      })
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors${color.id}`, color)
      .then((res) => {
        console.log(
          'src/components/ColorList.js: ColorList: deleteColor: axiosWithAuth: .then: RES: ',
          res
        )
      })
      .catch((err) => {
        console.log(
          'src/components/ColorList.js: ColorList: deleteColor: axiosWithAuth: .catch: ERR: ',
          err 
        )
      });
     
  };

  return (
    <div className="colors-wrap">
      <p>Colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
              }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <AddNewColor />
    </div>
  );
};

export default ColorList;
