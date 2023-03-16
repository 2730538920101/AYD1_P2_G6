const ShowComments = (comments) => {
  const renderComments = () => {
    if (comments && comments.comments.length > 0) {
      return comments.comments.map((comment, index) => (
        <li key={index} className="flex flex-col divide-y space-y-4 p-2 ">
          <div className="bg-white rounded shadow-md p-2">
          <small className="flex flex-col ml-auto justify-end align-items-end decoration-4">{comment.nombre}</small>
          <p className="mt-3">{comment.comentario}</p>
          </div>
        </li>
      ));
    } else {
    }
  };

  return (
    <>
      <ul className="rounded bg-scroll bg-[#018C73]">{renderComments()}</ul>
    </>
  );
};

export default ShowComments;
