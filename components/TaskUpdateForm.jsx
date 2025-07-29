function TaskUpdateForm({ setUpdateId, data, onUpdateData }) {
  const handleUpdateData = async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {
      id: data.id,
      owner: formData.get("owner"),
      description: formData.get("desc"),
    };

    let response = await fetch(
      "http://localhost:3000/tasks/" + data.id,

      {
        method: "PATCH",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await fetch("http://localhost:3000/tasks");
    const listData = await response.json();
    onUpdateData(listData);
    event.target.reset();
  };

  return (
    <form onSubmit={handleUpdateData}>
      <label htmlFor="owner">Owner</label>
      <input id="owner" name="owner"></input>
      <label htmlFor="desc">Description</label>
      <input id="desc" name="desc" text={data.description}></input>
      <button type="submit">Submit</button>
      <button onClick={() => setUpdateId(-1)}>Close</button>
    </form>
  );
}

export default TaskUpdateForm;
