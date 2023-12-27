import React, { FC, useRef } from 'react';

interface TableElementsProps {
  id: string;
  isbn: string;
  title: string;
  director: {
    firstName: string;
    secondName: string;
  };
}

const TableElements: FC<TableElementsProps> = ({
  id,
  isbn,
  title,
  director: { firstName, secondName },
}) => {
  const singleMovieRow = useRef<HTMLButtonElement>(null);

  const deleteSingleMovie = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const singleMovieRow = event.currentTarget.parentElement?.parentElement;
    const singleMovieRowID = event.currentTarget.id;
    try {
      await fetch(`/movies/${singleMovieRowID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      singleMovieRow?.remove();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <tr className="table_element_row">
        <td>{id}</td>
        <td>{isbn}</td>
        <td>{title}</td>
        <td>{firstName}</td>
        <td>{secondName}</td>
        <td>
          <button
            className="delete_button"
            id={id}
            ref={singleMovieRow}
            onClick={(e) => deleteSingleMovie(e)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableElements;