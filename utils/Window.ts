import { types } from "mobx-state-tree";
const WindowStore = types
  .model("WindowState", {
    width: types.number,
    height: types.number
  })
  .actions(ref => ({
    setSize: (width: number, height: number) => {
      ref.width = width;
      ref.height = height;
    }
  }));

export const Window = WindowStore.create({
  width: 0,
  height: 0
});
