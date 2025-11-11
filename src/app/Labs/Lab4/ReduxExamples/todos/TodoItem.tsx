import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroupItem, Stack } from "react-bootstrap";

type TodoItemProps = {
  todo: { id: string; title: string } | null | undefined;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();

  if (!todo) return null; // Safeguard

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <span>{todo.title}</span>
      <Stack direction="horizontal" gap={2}>
        <Button
          variant="primary"
          size="sm"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          Delete
        </Button>
        <Button
          variant="warning"
          size="sm"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
        >
          Edit
        </Button>
      </Stack>
    </ListGroupItem>
  );
}
