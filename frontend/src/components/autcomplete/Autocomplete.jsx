import { Typeahead } from "react-bootstrap-typeahead";
export const AutoComplete = ({ options, setSelected }) => {
  // if(options === undefined || options === [] ) {
  //   return null;
  // }
  return (
    <Typeahead
      id="basic-example"
      className="p-3 w-auto"
      onChange={(selected) => setSelected(selected)}
      options={options}
      clearButton
      placeholder="Agregar Actores al reparto"
      filterBy={["", "NOMBRE"]}
      labelKey={(option) => `${option.NOMBRE}`}
      renderMenuItemChildren={(option) => <div>{option.NOMBRE}</div>}
    />
  );
};
