"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
import { Button, FormControl, ListGroupItem, Stack } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="p-3">
      <Stack gap={2}>
        <FormControl
          type="text"
          value={todo.title}
          placeholder="Enter todo..."
          onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        />
        <div className="d-flex gap-2">
          <Button
            variant="success"
            onClick={() => dispatch(addTodo(todo))}
            id="wd-add-todo-click"
          >
            Add
          </Button>
          <Button
            variant="warning"
            onClick={() => dispatch(updateTodo(todo))}
            id="wd-update-todo-click"
          >
            Update
          </Button>
        </div>
      </Stack>
    </ListGroupItem>
  );
}
