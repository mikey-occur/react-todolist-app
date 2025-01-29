import { use, useEffect, useRef, useState } from "react";
import "./todo.css";
import { addTodosAPI, delTodosAPI, editTodosAPI, getTodosAPI } from "../../api/todoApi";
// Ở đây nó sẽ gọi css ở tại đây vì react nó sẽ đóng gói, dễ quản lý tài nguyên hơn

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [textBtn, setTextBtn] = useState("Thêm mới");
  const todoRef = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTodos(await getTodosAPI());
  };

  const delTodo = async (id) => {
    if (
      window.confirm("Nhiệm vụ không thể khôi phục, bạn có muốn xóa không?")
    ) {
      await delTodosAPI(id);
      window.location.reload();
    }
  };

  const addOrEditTodo = async(event) => {
    event.preventDefault();
    const val = event.target[0].value;
    const id = event.target[1].value;
    console.log({
      val,
      id
    });
    if (id){
      // Nếu có id cập nhập
      await editTodosAPI({
        name: val,
        id: id
      });
      todoRef.current[id].className = "fas fa-edit";
    } else{
      // Nếu ko có thì thêm mới 
      await addTodosAPI({
        name: val
      });
    }
    fetchData();
    event.target[0].value = ""; 
    event.target[1].value = null;
    setTextBtn("Thêm mới")
  }

  const editTodo = (id) => {

    todoRef?.current.forEach((item) => {
      if (item.getAttribute("data-id") && item.getAttribute("data-id") !== String(id)){
          item.className = "fas fa-edit";
      }
    })

    const inputName = document.getElementById("name");
    const inputId = document.getElementById("id");
    if (todoRef?.current[id].className === "fas fa-edit"){
        todoRef.current[id].className = "fas fa-user-edit";
        setTextBtn("Cập nhật");
        inputName.value = todoRef.current[id].getAttribute("data-name");
        inputId.value = id;
    } else if (todoRef?.current[id].className === "fas fa-user-edit"){
        todoRef.current[id].className = "fas fa-edit";
        setTextBtn("Thêm mới")
        inputName.value = "";
        inputId.value = null;
    }
  }

  const onCompleted = async (todo) => {
    await editTodosAPI({
      ...todo,
      isComplete: true
    });
    fetchData();
  }


  return (
    <main id="todolist">
      <h1>
        Danh sách
        <span>Việc hôm nay không để ngày mai.</span>
      </h1>

      {todos ? (
        todos?.map((item, key) => (
          <li className={item.isComplete ? "done" : ""} key={key} onDoubleClick={() => onCompleted(item)}>
            <span className="label">{item.name}</span>
            <div className="actions">
              <button 
              className="btn-picto" 
              type="button"
              onClick={() => editTodo(item.id)}
              >
                <i 
                  className="fas fa-edit" 
                  ref={el => todoRef.current[item.id] = el}
                  data-name = {item.name}
                  data-id = {item.id}
                />
              </button>
              <button
                className="btn-picto"
                type="button"
                aria-label="Delete"
                title="Delete"
                onClick={() => delTodo(item.id)}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p>Danh sách nhiệm vụ trống.</p>
      )}
      <form onSubmit={addOrEditTodo} >
        <label>Thêm nhiệm vụ mới</label>
        <input type="text" name="name" id="name" />
        <input type="text" name="id" id="id" style={{display: "none"}} />
        <button type="submit">
          {textBtn}
        </button>
      </form>
    </main>
  );
};

export default Todos;
// export để mở public cho phép gọi vào
