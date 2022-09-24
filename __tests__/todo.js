const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

/* eslint-disable no-undef */

describe("Todo List Test Suite", () => {
  // checks creating a new todo
  test("Should add a new todo", () => {
    expect(all.length).toEqual(0);
    add({
      title: "A test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(1);
  });

  // checks marking a todo as completed
  test("Should mark a todo as complete", () => {
    expect(all.length).toEqual(1);
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  // checks retrieval of overdue items
  test("Should retrieve overdue items", () => {
    expect(all.length).toEqual(1);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "An overdue test item",
      completed: false,
      dueDate: new Date(today.getTime() - 2 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    expect(all.length).toEqual(2);
    overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
  });

  // checks retrieval of due today items
  test("Should retrieve due today items", () => {
    expect(all.length).toEqual(2);
    const today = new Date();
    add({
      title: "A due today test item",
      completed: false,
      dueDate: new Date(today.getTime()).toLocaleDateString("en-CA"),
    });
    expect(all.length).toEqual(3);
    dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(2);
  });

  // checks retrieval of due later items
  test("Should retrieve due later items", () => {
    expect(all.length).toEqual(3);
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "A due later test item",
      completed: false,
      dueDate: new Date(today.getTime() + 2 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    expect(all.length).toEqual(4);
    dueLaterItems = dueLater();
    expect(dueLaterItems.length).toEqual(1);
  });
});
